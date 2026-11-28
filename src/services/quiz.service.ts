import { apiRequest } from "@/lib/api-client";
import type { QuizListResponse } from "@/types/quiz";

export type GetQuizzesParams = {
    limit?: number;
    cursor?: string;
};

export const quizService = {
    getQuizzes: (
        token: string,
        params?: GetQuizzesParams
    ) => {
        const query = new URLSearchParams();

        if (params?.limit) query.set("limit", String(params.limit));
        if (params?.cursor) query.set("cursor", params.cursor);

        const queryString = query.toString();

        return apiRequest<QuizListResponse>(
            `/quizzes${queryString ? `?${queryString}` : ""}`,
            { token }
        );
    },
};