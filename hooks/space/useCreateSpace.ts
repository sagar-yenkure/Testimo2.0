"use client"

import { useState } from "react";
import { api } from "@/lib/api";
import { CreateSpaceInput } from "@/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useCreateSpace = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createSpace = async (values: CreateSpaceInput) => {
        setIsLoading(true);
        setError(null);

        try {
            // Call your Eden Treaty API
            const { data, error: apiError } = await api.spaces.post(values);

            if (apiError) {
                const msg = (apiError.value as any)?.message || "Failed to create space";
                setError(msg);
                toast.error(msg);
                return null;
            }

            toast.success("Space created successfully! 🎉");

            // Redirect to dashboard on success
            router.push("/dashboard");

            return data;
        } catch (err) {
            const msg = "An unexpected error occurred";
            setError(msg);
            toast.error(msg);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    return { createSpace, isLoading, error };
};
