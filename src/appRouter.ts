// src/appRouter.ts
import { router } from "./trpc";
import { healthRouter } from "./routes/healthCheck";

export const appRouter = router({
    health: healthRouter,
});

export type AppRouter = typeof appRouter;
