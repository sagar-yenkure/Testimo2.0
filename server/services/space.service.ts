import db from "../db";
import { spacesTable, testimonialsTable } from "../db/schema";
import { eq, count, sql } from "drizzle-orm";

export const spaceService = {
    createSpace: async (space: typeof spacesTable.$inferInsert) => {
        const [newSpace] = await db.insert(spacesTable).values(space).returning();
        return newSpace;
    },

    getSpaces: async (userId: string) => {
        const results = await db
            .select({
                id: spacesTable.id,
                name: spacesTable.name,
                slug: spacesTable.slug,
                logo: spacesTable.logo,
                createdAt: spacesTable.createdAt,
                description: spacesTable.description,
                textCount: count(sql`CASE WHEN ${testimonialsTable.isVideo} = false THEN 1 END`),
                videoCount: count(sql`CASE WHEN ${testimonialsTable.isVideo} = true THEN 1 END`),
            })
            .from(spacesTable)
            .leftJoin(testimonialsTable, eq(spacesTable.id, testimonialsTable.spaceId))
            .where(eq(spacesTable.userId, userId))
            .groupBy(spacesTable.id);

        return results.map(space => ({
            ...space,
            avatar: space.logo,
            textCount: Number(space.textCount),
            videoCount: Number(space.videoCount),
            members: "1.2k"
        }));
    }
}