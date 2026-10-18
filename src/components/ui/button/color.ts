
const sharedColors = {
    primary: {
        face: "#5CC6E2",
        lip: "#2497B5",
        border: "#5CC6E2",
        text: "#07151A",
        pressedFace: "#49B7D4",
    },
    danger: {
        face: "#E5484D",
        lip: "#A9282E",
        border: "#E5484D",
        text: "#FFFFFF",
        pressedFace: "#D63A40",
    },
    warning: {
        face: "#FBBF24",
        lip: "#B77912",
        border: "#FBBF24",
        text: "#271900",
        pressedFace: "#F5B91C",
    },
    info: {
        face: "#38BDF8",
        lip: "#087EAD",
        border: "#38BDF8",
        text: "#062535",
        pressedFace: "#22AFE9",
    },
};

export const themeColors = {
    dark: {
        ...sharedColors,
        secondary: {
            face: "#191B20",
            lip: "#30343B",
            border: "#3A3F47",
            text: "#F1F3F5",
            pressedFace: "#22252C",
        },
        outline: {
            face: "#0A0A0A",
            lip: "#30343B",
            border: "#3A3F47",
            text: "#F1F3F5",
            pressedFace: "#191B20",
        },
        ghost: {
            face: "transparent",
            lip: "transparent",
            border: "transparent",
            text: "#F1F3F5",
            pressedFace: "#191B20",
        },
    },

    light: {
        ...sharedColors,
        secondary: {
            face: "#FFFFFF",
            lip: "#D9DEE5",
            border: "#DADCE0",
            text: "#202124",
            pressedFace: "#F3F5F7",
        },
        outline: {
            face: "#FFFFFF",
            lip: "#D9DEE5",
            border: "#DADCE0",
            text: "#202124",
            pressedFace: "#F3F5F7",
        },
        ghost: {
            face: "transparent",
            lip: "transparent",
            border: "transparent",
            text: "#202124",
            pressedFace: "#F3F5F7",
        },
    },
} as const;