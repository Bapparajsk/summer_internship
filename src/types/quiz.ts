export type QuizDifficulty = "EASY" | "MEDIUM" | "HARD";
export type QuizStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type QuizListItem = {
    id: string;
    title: string;
    chapter: string;
    description: string;
    difficulty: QuizDifficulty;
    icon: string;
    duration: number;
    status: QuizStatus;
    createdAt: string;
    updatedAt: string;
    _count: {
        questions: number;
    };
};

export type QuizPagination = {
    limit: number;
    hasNext: boolean;
    nextCursor: string | null;
};

export type QuizListResponse = {
    data: QuizListItem[];
    pagination: QuizPagination;
};