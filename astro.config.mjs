// @ts-check
import { defineConfig } from "astro/config";

import node from "@astrojs/node";

import { fonts } from "@core/fonts";

// https://astro.build/config
export default defineConfig({
  // Нужен для canonical и og:url, заменить на домен проекта
  site: "https://example.com",
  adapter: node({
    mode: "standalone",
  }),
  fonts,
});
