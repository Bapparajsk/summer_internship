export const queryKeys = {
    user: {
        all: ["user"] as const,
        me: () => [...queryKeys.user.all, "me"] as const,
    },

    quizzes: {
        all: ["quizzes"] as const,
        list: (filters?: object) =>
            ["quizzes", "list", filters] as const,
        detail: (id: string) =>
            ["quizzes", "detail", id] as const,
    },

    rooms: {
        all: ["rooms"] as const,
        detail: (id: string) =>
            ["rooms", "detail", id] as const,
    },
};