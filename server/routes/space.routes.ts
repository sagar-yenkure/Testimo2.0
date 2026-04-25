import { Elysia } from "elysia";
import { spaceController } from "../controllers/space.controller";
import { clerkGuard } from "../middlewares/clerkGuard";
import { createSpaceSchema } from "@/zod";

export const spaceRoutes = new Elysia({ prefix: "/spaces" })
    .use(clerkGuard)
    .get("/", (ctx) => spaceController.getSpaces(ctx))

    .post("/", (ctx) => spaceController.createSpace(ctx), {
        body: createSpaceSchema
    });
