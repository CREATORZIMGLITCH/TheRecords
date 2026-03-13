// api/comment.js — Serverless function for posting GitHub comments
//
// This file is for Vercel deployment. If you're on GitHub Pages only,
// you need a separate backend. Options:
//   1. Deploy this to Vercel (free tier) and point your GH Pages site at it
//   2. Use Netlify Functions (same idea, different platform)
//   3. Use a GitHub App + GitHub Actions workflow_dispatch
//
// SETUP:
//   1. Create a GitHub Personal Access Token with `public_repo` scope
//   2. Add it as a secret in Vercel: GITHUB_TOKEN
//   3. Set GITHUB_REPO_OWNER and GITHUB_REPO_NAME in Vercel env vars
//
// SECURITY BUILT IN:
//   - Token is never exposed to the browser (server-side only)
//   - Input sanitisation (length cap, no HTML)
//   - Rate limiting via IP (3 requests per 15 minutes)
//   - CORS locked to your domain only

const RATE_MAP = new Map(); // In-memory rate limiting (resets on cold start)
const RATE_LIMIT = 3;
const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getRateKey(req) {
  return req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || "unknown";
}

function sanitize(str) {
  return String(str)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .slice(0, 2000);
}

export default async function handler(req, res) {
  // ── CORS: only allow requests from your GitHub Pages domain ──
  const allowedOrigin = process.env.ALLOWED_ORIGIN || "https://YOUR_USERNAME.github.io";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  // ── Rate limiting ──
  const ip = getRateKey(req);
  const now = Date.now();
  const entry = RATE_MAP.get(ip) || { count: 0, resetAt: now + RATE_WINDOW_MS };

  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + RATE_WINDOW_MS;
  }

  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({
      error: `Rate limit: max ${RATE_LIMIT} comments per 15 minutes.`,
    });
  }

  entry.count++;
  RATE_MAP.set(ip, entry);

  // ── Input validation ──
  const { body } = req.body || {};
  if (!body || typeof body !== "string") {
    return res.status(400).json({ error: "Missing or invalid body" });
  }

  const safeBody = sanitize(body);
  if (safeBody.length < 3) {
    return res.status(400).json({ error: "Comment too short" });
  }

  // ── Post to GitHub Issues API ──
  const owner = process.env.GITHUB_REPO_OWNER;
  const repo = process.env.GITHUB_REPO_NAME;
  const issue = process.env.GITHUB_COMMENTS_ISSUE || "1";
  const token = process.env.GITHUB_TOKEN;

  if (!owner || !repo || !token) {
    return res.status(500).json({ error: "Server misconfigured — missing env vars" });
  }

  try {
    const ghRes = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/issues/${issue}/comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
          "User-Agent": "EpsteinRecord-CommentProxy/1.0",
        },
        body: JSON.stringify({ body: safeBody }),
      }
    );

    if (!ghRes.ok) {
      const err = await ghRes.text();
      console.error("GitHub API error:", ghRes.status, err);
      return res.status(502).json({ error: "Failed to post to GitHub" });
    }

    const created = await ghRes.json();
    return res.status(201).json({ id: created.id, created_at: created.created_at });
  } catch (err) {
    console.error("Proxy error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
