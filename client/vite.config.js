import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows external access to the dev server
    port: 3000, // Default port
    strictPort: true, // Prevent auto-changing to another port
    hmr: {
      port: 3000, // Ensure HMR uses the same port
    },
  },
}) 