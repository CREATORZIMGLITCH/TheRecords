# The Epstein Record — Deployment Guide

A non-partisan public archive. Deployed securely to GitHub Pages with persistent community comments.

---

## Quick Start

```bash
# 1. Clone or download this repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env
# Edit .env with your values (see Configuration section)

# 4. Run locally
npm run dev

# 5. Build for production
npm run build
```

---

## Deployment to GitHub Pages

### Step 1 — Create Your Repository

1. Go to [github.com/new](https://github.com/new)
2. Name it anything (e.g. `epstein-record`)
3. Set it to **Public** (required for free GitHub Pages + comment API)
4. Don't initialise with a README (you'll push your own files)

### Step 2 — Update `vite.config.js`

Open `vite.config.js` and change the `base` field to match your repo name:

```js
base: "/your-repo-name/",   // ← replace this
```

If you're deploying to `username.github.io` (user/org site), use:
```js
base: "/",
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` handles the rest automatically

### Step 4 — Set Repository Secrets

Go to your repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**:

| Secret Name | Value |
|---|---|
| `VITE_GITHUB_REPO_OWNER` | Your GitHub username |
| `VITE_GITHUB_REPO_NAME` | Your repo name |
| `VITE_GITHUB_COMMENTS_ISSUE` | `1` (see Step 5) |

### Step 5 — Create the Comments Issue

Comments are stored as replies on a single pinned GitHub Issue (free, no database needed).

1. Go to your repo → **Issues** → **New Issue**
2. Title: `Community Comments Thread — The Epstein Record`
3. Body: `This issue is the comment thread for the archive. Do not close.`
4. Submit → note the issue number (usually `#1`)
5. Pin it: click the `...` menu on the issue → **Pin issue**

### Step 6 — Push and Deploy

```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

GitHub Actions will automatically build and deploy. Visit your site at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

---

## Enabling Direct Comment Posting (Optional)

By default, when a user posts a comment, the app tries `/api/comment` — a serverless proxy that posts to GitHub on their behalf. Without this, users see a fallback that opens GitHub directly.

To enable direct posting, deploy the proxy to **Vercel** (free tier):

### Option A — Vercel Proxy (Recommended)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` from the project root and follow the prompts
3. In Vercel dashboard → your project → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `GITHUB_TOKEN` | A token with `public_repo` scope ([create one](https://github.com/settings/tokens/new)) |
| `GITHUB_REPO_OWNER` | Your GitHub username |
| `GITHUB_REPO_NAME` | Your repo name |
| `GITHUB_COMMENTS_ISSUE` | `1` |
| `ALLOWED_ORIGIN` | `https://YOUR_USERNAME.github.io` |

4. Update `vite.config.js` to point comment posts at your Vercel domain:
   - Search for `window.location.origin` in `EpsteinRecord.jsx`
   - Change the `proxyUrl` to your Vercel URL: `https://your-project.vercel.app/api/comment`

### Option B — GitHub-Only (No Direct Posting)

If you skip the proxy, comment posting still works — it just opens GitHub.com in a new tab with the user's text pre-copied to clipboard. Not as seamless, but zero infrastructure.

---

## Security Architecture

### What's Implemented

| Layer | Mechanism | What it Prevents |
|---|---|---|
| **HTTPS** | GitHub Pages enforces it | Man-in-the-middle, eavesdropping |
| **Content Security Policy** | `index.html` + `_headers` | XSS, code injection, unauthorised scripts |
| **X-Frame-Options: DENY** | `_headers` | Clickjacking (your page in someone else's iframe) |
| **X-Content-Type-Options** | `_headers` | MIME-type sniffing attacks |
| **Referrer-Policy** | `_headers` | Leaking full URLs to third parties |
| **Permissions-Policy** | `_headers` | Prevents camera/mic/location access |
| **CORS (proxy)** | `api/comment.js` | Cross-origin comment spam from other sites |
| **Server-side rate limiting** | `api/comment.js` | Comment flooding (3/15min per IP) |
| **Client-side rate limiting** | `sessionStorage` | UI-level posting throttle |
| **Input sanitisation** | `sanitize()` function | HTML injection in comments |
| **Token isolation** | `GITHUB_TOKEN` server-only | Token never reaches the browser |
| **No eval(), no CDN scripts** | CSP `script-src 'self'` | Supply chain attacks |
| **2FA on GitHub account** | You enable this | Account takeover |

### What GitHub Pages Cannot Do

GitHub Pages **cannot** set custom HTTP headers directly — the `_headers` file works on Netlify and Cloudflare Pages but **not** on GitHub Pages's CDN. The security headers from `_headers` will be ignored on vanilla GitHub Pages.

**Your options:**
1. **Use Cloudflare as a proxy** (free): point your custom domain through Cloudflare, add security headers there
2. **Deploy to Netlify instead** (free tier): `_headers` file is natively supported
3. **Use Vercel** (free tier): add headers in `vercel.json`
4. **Accept the limitation**: the `<meta>` CSP tags in `index.html` still provide meaningful browser-level protection even without server-enforced headers

The meta tag CSP is real protection — browsers honour it. Server-sent headers are just harder to bypass.

### Enabling Two-Factor Authentication (Do This Now)

1. GitHub → Settings → Password and authentication → Enable 2FA
2. Use an authenticator app (not SMS) — Authy or Google Authenticator
3. Save your recovery codes somewhere safe (password manager)

This is the single highest-impact security action available to you. Account takeover → attacker can modify your site.

---

## Adding a Custom Domain

1. Buy a domain (Namecheap, Cloudflare Registrar, etc.)
2. Go to your repo → Settings → Pages → Custom domain → enter your domain
3. Add a `CNAME` DNS record pointing to `YOUR_USERNAME.github.io`
4. Check "Enforce HTTPS" once it propagates (usually <1hr)
5. **Bonus**: route through Cloudflare for free security headers + DDoS protection

---

## Local Development

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Build production bundle to /dist
npm run preview    # Preview production build locally
```

For local comment testing, the GitHub API fetch will still work (read-only). Post attempts will open GitHub in a new tab (proxy only runs in production).

---

## File Structure

```
epstein-record/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions: build + deploy to Pages
├── api/
│   └── comment.js              # Serverless proxy for comment posting (Vercel)
├── public/
│   └── _headers                # Security headers (Netlify/Cloudflare/Vercel)
├── src/
│   ├── main.jsx                # React entry point
│   └── EpsteinRecord.jsx       # Main application component
├── .env.example                # Environment variable template
├── .gitignore                  # Keeps secrets out of git
├── index.html                  # HTML entry point with CSP meta tags
├── package.json
├── README.md
└── vite.config.js              # Build config with GitHub Pages base path
```

---

## License

Public domain. This archive belongs to everyone.
