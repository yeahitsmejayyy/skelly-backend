// src/trpc.ts
import { initTRPC } from "@trpc/server";
import type { inferAsyncReturnType } from "@trpc/server";
import { db } from "./db/client";

/**
 * Context
 * Keep this boring. Add things only when needed.
 */
export const createContext = () => {
    return { db };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
