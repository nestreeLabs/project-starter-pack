import { fontProviders } from "astro/config";

import type { AstroUserConfig } from "astro";

// as const satisfies сохраняет литерал cssVariable, его ждёт тип <Font> из astro:assets
export const fonts = [
  {
    provider: fontProviders.google(),
    name: "Inter",
    cssVariable: "--font-primary",
    weights: [400, 700],
    subsets: ["latin", "cyrillic"],
  },
] as const satisfies NonNullable<AstroUserConfig["fonts"]>;
