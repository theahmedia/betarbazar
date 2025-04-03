import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Use environment variables
const API_URL = import.meta.env.VITE_API_URL;

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@tawk.to/tawk-messenger-react"],
  },
  server: {
    port: 5173, // ✅ Ensure frontend runs on this port
    proxy: {
      "/api": {
        target: API_URL, // ✅ Backend is running on port 5000
        changeOrigin: true,
        secure: false,
      },
      '/invoices': {
        target: API_URL, // Backend URL
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