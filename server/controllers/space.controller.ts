import { CreateSpaceInput } from "@/zod";
import { spaceService } from "../services/space.service";

export const spaceController = {
    getSpaces: async ({ userId }: { userId: string }) => {
        try {
            const spaces = await spaceService.getSpaces(userId);
            return { status: 200, message: "Spaces fetched successfully", spaces };
        } catch (error) {
            console.error("Controller Error (getSpaces):", error);
            return { status: 500, message: "Internal server error", space: null };
        }
    },

    createSpace: async ({ body, userId }: { body: CreateSpaceInput, userId: string }) => {
        try {
            const spaceData = {
                name: body.spaceName,
                slug: body.brandName,
                logo: body.logo,
                formTitle: body.formTitle,
                description: body.description,
                userId: userId,
                collectStarRatings: body.collectStarRatings,
                language: body.language,
                theme: body.theme,
                thankYouTitle: body.thankYou.title,
                thankYouMessage: body.thankYou.message,
                accentColor: body.accentColor,
                bgPattern: body.bgPattern,
                fontFamily: body.fontFamily,
                collectCompany: body.collectCompany,
                collectEmail: body.collectEmail,
                collectUserRole: body.collectUserRole,
                collectSocialLink: body.collectSocialLink,
                showConsent: body.showConsent,
                consent: body.consent,
                allowSocialShare: body.thankYou.allowSocialShare,
                redirectEnabled: body.thankYou.redirectEnabled,
                redirectUrl: body.thankYou.redirectUrl
            }
            const newSpace = await spaceService.createSpace({ ...spaceData, userId });
            return { status: 201, message: "Space created successfully", space: newSpace };
        } catch (error) {
            console.error("Controller Error (createSpace):", error);
            return { status: 500, message: "Internal server error", space: null };
        }
    }
};
