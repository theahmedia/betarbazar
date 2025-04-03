import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@tawk.to/tawk-messenger-react"],
  },
  server: {
    port: 5173, // ✅ Ensure frontend runs on this port
    proxy: {
      "/api": {
        target: "http://localhost:5000", // ✅ Backend is running on port 5000
        changeOrigin: true,
        secure: false,
      },
      '/invoices': {
        target: 'http://localhost:5000', // Backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "src"),
    },
  },
});