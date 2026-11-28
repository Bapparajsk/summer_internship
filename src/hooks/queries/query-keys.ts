export const queryKeys = {
    user: {
        all: ["user"] as const,
        me: () => [...queryKeys.user.all, "me"] as const,
    },

    quizzes: {
        all: ["quizzes"] as const,

        lists: () => [...queryKeys.quizzes.all, "list"] as const,

        list: (params?: { limit?: number; cursor?: string }) =>
            [...queryKeys.quizzes.lists(), params] as const,

        details: () => [...queryKeys.quizzes.all, "detail"] as const,

        detail: (id: string) => [...queryKeys.quizzes.details(), id] as const,
    },

    rooms: {
        all: ["rooms"] as const,
        detail: (id: string) =>
            ["rooms", "detail", id] as const,
    },
};
