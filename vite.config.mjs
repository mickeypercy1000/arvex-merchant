import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist", // ✅ Needed by Vercel
    chunkSizeWarningLimit: 3000, // ✅ Avoid chunk size warnings
    brotliSize: true, // 🧪 Optional: show brotli sizes in logs (doesn't generate files)
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          ui: ["@radix-ui/themes", "framer-motion"],
          router: ["react-router-dom"],
          validation: ["zod", "@hookform/resolvers"],
        },
      },
    },
  },
  plugins: [
    tsconfigPaths(),
    react(),
    tagger()
  ],
  server: {
    port: "4028",
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  }
});
