// console.log("🧠 SERVER BOOT — PID:", process.pid);

import "./db/client";
import { createContext } from "./trpc";
import { appRouter } from "./appRouter";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

const PORT = 3001;
const FRONTEND_ORIGIN = "http://localhost:5173";

function withCors(res: Response) {
  const headers = new Headers(res.headers);

  headers.set("Access-Control-Allow-Origin", FRONTEND_ORIGIN);
  headers.set("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers,
  });
}

Bun.serve({
  port: PORT,
  async fetch(req) {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": FRONTEND_ORIGIN,
          "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    // tRPC endpoint
    if (new URL(req.url).pathname.startsWith("/trpc")) {
      const res = await fetchRequestHandler({
        endpoint: "/trpc",
        req,
        router: appRouter,
        createContext,
      });

      return withCors(res);
    }

    // fallback
    return withCors(new Response("OK"));
  },
});

console.log(`🚀 Server listening on: http://localhost:${PORT}`);
console.log(`🔌 tRPC endpoint ready at: http://localhost:${PORT}/trpc`);
console.log("🌍 CORS enabled for:http://localhost:5173");
