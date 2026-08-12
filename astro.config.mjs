import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  checkOrigin: true,
  allowedDomains: [
    { hostname: "5.royall-ssd.de" },
    { hostname: "www.5.royall-ssd.de" },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
