// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // Нужен для canonical и og:url, заменить на домен проекта
  site: "https://example.com",
  adapter: node({
    mode: "standalone",
  }),
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Inter",
      cssVariable: "--font-primary",
      weights: [400, 700],
      subsets: ["latin", "cyrillic"],
    },
  ],
});
