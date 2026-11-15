import type { IFeature } from "@types";

export const features: IFeature[] = [
  { icon: "🪐", title: "Astro 7", text: "Статика и SSR на Node-адаптере" },
  {
    icon: "🛡️",
    title: "TypeScript strict",
    text: "astro check перед коммитом",
  },
  {
    icon: "🔍",
    title: "ESLint + Prettier",
    text: "Единый стиль кода из коробки",
  },
  { icon: "🔎", title: "SEO", text: "Canonical, Open Graph, Twitter Card" },
  { icon: "🐳", title: "Docker", text: "Один compose для локалки и сервера" },
  { icon: "🚢", title: "CI/CD", text: "Релизы по коммитам и деплой на VPS" },
];
