// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// Fully static output — every page is HTML on disk. Vercel auto-detects Astro
// and serves `dist/`, so no adapter is needed.
export default defineConfig({
  output: "static",
  // Next still owns port 9999 during the port, so the two can run side by side.
  server: { port: 4321 },
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
    css: {
      // Tailwind runs through the Vite plugin above. Without this, Vite also
      // picks up the root postcss.config.mjs that still serves the Next build,
      // which would run Tailwind twice and can't resolve `@import "tailwindcss"`.
      postcss: {},
    },
  },
});
