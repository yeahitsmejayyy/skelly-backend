import { router, publicProcedure } from "../trpc";

export const healthRouter = router({
    check: publicProcedure.query(() => {
        const now = new Date();

        const formattedTimestamp = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZoneName: "short",
        }).format(now);

        return {
            app: "skelly-backend",
            status: "ok",
            timestamp: formattedTimestamp,
            message: "This means your this app is connected to your backend via tRPC"
        };
    }),
});