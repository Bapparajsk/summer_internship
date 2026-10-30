export const difficultyColors = {
    easy: {
        text: "#4ADE80",
        bg: "#123D2B",
        border: "#287A50",
    },
    medium: {
        text: "#FACC15",
        bg: "#423214",
        border: "#94702B",
    },
    hard: {
        text: "#FB7185",
        bg: "#421F25",
        border: "#963D4B",
    },
} as const;

export type DifficultyColorsType = keyof typeof difficultyColors;