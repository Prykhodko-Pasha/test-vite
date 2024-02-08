import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/": {
        target: "https://singaporemath.online:3001/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\//, ""),
      },
    },
  },
});
