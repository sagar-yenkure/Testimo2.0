import { spaceRoutes } from '@/server/routes/space.routes';
import { Elysia } from 'elysia'

export const app = new Elysia({ prefix: '/api' }).onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
        set.status = 404;
        return { error: "Resource not found" };
    }
}).use(spaceRoutes)

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch

export type App = typeof app
