import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Single-page marketing site for chip.boltz-ai.com.
// Zero-config Vercel deploy: framework preset "Vite" auto-detects this.
export default defineConfig({
  plugins: [react()],
});
