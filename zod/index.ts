import { z } from "zod";
import { THEMES, FONT_STYLES, BG_STYLES, LANGUAGES } from "@/constants";

export const sendMessageSchema = z.object({
    msg: z.string()
        .min(100, { message: "Message must be at least 100 characters." })
        .max(500, { message: "Message cannot exceed 500 characters." })
});

export const createSpaceSchema = z.object({
    // Step 1: Basic Info
    spaceName: z.string().min(1, "Space name is required"),
    brandName: z.string().min(1, "Brand name is required"),
    formTitle: z.string().min(1, "Form title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    logo: z.string().nullable(),

    // Step 2: Settings & Appearance
    language: z.enum(LANGUAGES),
    theme: z.enum(THEMES),
    bgPattern: z.enum(BG_STYLES),
    fontFamily: z.enum(FONT_STYLES),
    accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/, "Invalid color code"),

    // Data Collection Toggles
    collectStarRatings: z.boolean(),
    collectCompany: z.boolean(),
    collectEmail: z.boolean(),
    collectUserRole: z.boolean(),
    collectSocialLink: z.boolean(),

    // Consent
    showConsent: z.boolean(),
    consent: z.string(),

    // Step 3: Thank You Page
    thankYou: z.object({
        title: z.string().min(1, "Thank you title is required"),
        message: z.string().min(1, "Thank you message is required"),
        allowSocialShare: z.boolean(),
        redirectEnabled: z.boolean(),
        redirectUrl: z.string().url("Invalid URL").or(z.literal("")),
    })
});

export type CreateSpaceInput = z.infer<typeof createSpaceSchema>;
