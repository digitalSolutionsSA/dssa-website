import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
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
          "query": ["@tanstack/react-query"],
          "radix-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
            "@radix-ui/react-scroll-area",
            "@radix-ui/react-slot",
          ],
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
