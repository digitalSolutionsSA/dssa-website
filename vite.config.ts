import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Dev only: serve /api/contact from the Netlify function so the contact form
 * works with plain `npm run dev`. On Netlify the function handles this route itself.
 */
const contactApiDev = (mode: string): Plugin => ({
  name: "contact-api-dev",
  apply: "serve",
  configureServer(server) {
    // Expose .env vars (e.g. RESEND_API_KEY) to the function, server-side only
    Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

    server.middlewares.use("/api/contact", async (req, res) => {
      try {
        const chunks: Buffer[] = [];
        for await (const chunk of req) chunks.push(chunk as Buffer);

        const mod = await server.ssrLoadModule("/netlify/functions/send-contact.mts");
        const response: Response = await mod.default(
          new Request("http://localhost/api/contact", {
            method: req.method,
            headers: { "Content-Type": "application/json" },
            body: req.method === "POST" ? Buffer.concat(chunks).toString() : undefined,
          }),
        );

        res.statusCode = response.status;
        res.setHeader("Content-Type", "application/json");
        res.end(await response.text());
      } catch (err) {
        console.error("[contact-api-dev]", err);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ error: "Local contact API failed — see terminal." }));
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // The project lives on a network share, where native file watching crashes — poll instead
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ["**/node_modules/**", "**/dist/**", "**/_backup-before-gsap/**", "**/public/**/*.mp4"],
    },
  },
  plugins: [
    react(),
    contactApiDev(mode),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Split vendor code so browsers can cache libs independently
    rollupOptions: {
      output: {
        manualChunks: {
          "react-core": ["react", "react-dom"],
          "router": ["react-router-dom"],
        },
      },
    },
    // Inline tiny assets directly into CSS to save round-trips
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    // Raise warning threshold — our vendor chunks are intentionally larger
    chunkSizeWarningLimit: 600,
  },
}));
