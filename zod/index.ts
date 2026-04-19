import { z } from "zod";

export const sendMessageSchema = z.object({
    msg: z.string()
        .min(100, { message: "Message must be at least 100 characters." })
        .max(500, { message: "Message cannot exceed 500 characters." })
});