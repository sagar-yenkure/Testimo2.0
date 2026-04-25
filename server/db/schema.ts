import { integer, pgTable, varchar, text, timestamp, boolean, index, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";

// Define the Enum for activity types
export const activityTypeEnum = pgEnum("activity_type", ["TEXT_SUBMISSION", "VIDEO_SUBMISSION"]);

export const spacesTable = pgTable("spaces", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    userId: varchar("userId", { length: 255 }).notNull(),

    // Core Info & Identity
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull(),
    logo: text("logo"),

    // Collection Page Content
    formTitle: varchar("formTitle", { length: 255 }).notNull(),
    description: text("description").notNull(),

    // Collection Toggles
    collectStarRatings: boolean("collectStarRatings").default(true).notNull(),
    collectCompany: boolean("collectCompany").default(false).notNull(),
    collectEmail: boolean("collectEmail").default(false).notNull(),
    collectUserRole: boolean("collectUserRole").default(false).notNull(),
    collectSocialLink: boolean("collectSocialLink").default(false).notNull(),

    // Design & Localization
    language: varchar("language", { length: 10 }).default("en").notNull(),
    theme: varchar("theme", { length: 20 }).default("light").notNull(),
    bgPattern: varchar("bgPattern", { length: 50 }).default("none").notNull(),
    fontFamily: varchar("fontFamily", { length: 50 }).default("inter").notNull(),
    accentColor: varchar("accentColor", { length: 7 }).default("#6C85FF").notNull(),

    // Consent
    consent: text("consent"),
    showConsent: boolean("showConsent").default(true).notNull(),

    // Thank You Page Configuration
    thankYouTitle: varchar("thankYouTitle", { length: 255 }).default("Thank you!").notNull(),
    thankYouMessage: text("thankYouMessage").notNull(),
    allowSocialShare: boolean("allowSocialShare").default(true).notNull(),
    redirectEnabled: boolean("redirectEnabled").default(false).notNull(),
    redirectUrl: text("redirectUrl"),

    // Metadata
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => [
    index("userId_idx").on(table.userId),
    uniqueIndex("slug_idx").on(table.slug),
]);

export const testimonialsTable = pgTable("testimonials", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    spaceId: integer("spaceId").references(() => spacesTable.id, { onDelete: "cascade" }).notNull(),

    // Submission Data
    content: text("content").notNull(),
    rating: integer("rating"),
    isVideo: boolean("isVideo").default(false).notNull(),
    videoUrl: text("videoUrl"),

    // Submitter Info
    userName: varchar("userName", { length: 255 }).notNull(),
    userEmail: varchar("userEmail", { length: 255 }),
    userCompany: varchar("userCompany", { length: 255 }),
    userRole: varchar("userRole", { length: 255 }),
    userAvatar: text("userAvatar"),
    socialLink: text("socialLink"),

    // Status
    isApproved: boolean("isApproved").default(false).notNull(),
    isArchived: boolean("isArchived").default(false).notNull(),

    // Metadata
    createdAt: timestamp("createdAt").defaultNow().notNull(),
}, (table) => [
    index("testimonials_spaceId_idx").on(table.spaceId),
    index("approved_idx").on(table.isApproved),
]);

export const activityTable = pgTable("activity", {
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    spaceId: integer("spaceId").references(() => spacesTable.id, { onDelete: "cascade" }).notNull(),
    type: activityTypeEnum("type").notNull(), // Corrected use of Enum
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(), // Renamed 'desc' to 'description' for consistency
    createdAt: timestamp("createdAt").defaultNow().notNull(),
});