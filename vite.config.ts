import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "./config/config.json";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: `http://${config.httpHost}:${config.httpPort}`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
  },
});
