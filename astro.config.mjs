import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  output: "server",
  site: "https://5.royall-ssd.de",
  adapter: node({ mode: "standalone" }),
  security: {
    checkOrigin: true,
    allowedDomains: [
      { hostname: "5.royall-ssd.de" },
      { hostname: "www.5.royall-ssd.de" },
      { hostname: "www.royall-ssd.de" },
      { hostname: "royall-ssd.de" },
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});