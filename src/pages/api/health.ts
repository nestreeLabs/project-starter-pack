import type { APIRoute } from "astro";

// Рендерится на сервере, чтобы healthcheck проверял живой Node-процесс, а не статику
export const prerender = false;

export const GET: APIRoute = () => new Response("ok");
