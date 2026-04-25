import { Elysia } from "elysia";
import { auth } from "@clerk/nextjs/server";

export const clerkGuard = (app: Elysia) =>
    app.derive(async ({ set, }) => {
        const { userId } = await auth();

        if (!userId) {
            set.status = 401;
            throw new Error("Unauthorized");
        }

        return {
            userId
        };
    });