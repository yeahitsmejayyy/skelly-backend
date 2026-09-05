// src/trpc.ts
import { initTRPC } from "@trpc/server";

/**
 * Context
 * Keep this boring, and keep server-only types out of it. The context is part of the
 * AppRouter type that skelly-admin imports, so anything you put here (a bun:sqlite
 * Database, a Node stream) leaks into a browser app's typecheck. Routes that need the
 * database import `db` from "./db/client" directly. Add request-scoped data here
 * (a session, a user id) when you actually have some.
 */
export const createContext = () => ({});

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
