import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/se_final_colormuller_frontend/",
  plugins: [react()],
  server: {
    port: 3000,
  },
});
