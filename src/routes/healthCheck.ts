import { router, publicProcedure } from "../trpc";

export const healthRouter = router({
    check: publicProcedure.query(() => {
        return {
            app: "pushbttn",
            status: "ok",
            timestamp: Date.now()
        };
    }),
});