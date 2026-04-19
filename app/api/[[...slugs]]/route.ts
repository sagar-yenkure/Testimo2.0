import { Elysia } from 'elysia'

export const app = new Elysia({ prefix: '/api' })

export const GET = app.fetch
export const POST = app.fetch
export const PATCH = app.fetch
export const DELETE = app.fetch
