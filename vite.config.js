import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // ── GitHub Pages serves from /repo-name/ so we set the base path ──
  // Replace YOUR_REPO_NAME with your actual repository name.
  // If you're using a custom domain or user/org site (username.github.io),
  // change this to base: "/"
  base: "/YOUR_REPO_NAME/",

  build: {
    outDir: "dist",
    // Generate source maps for easier debugging (won't expose secrets)
    sourcemap: false,
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
        },
      },
    },
  },

  server: {
    // Security headers for local development server
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});
