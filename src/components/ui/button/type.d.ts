import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import type { TextStyle, ViewStyle } from "react-native";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "warning"
    | "info";

export type ButtonSize = "sm" | "md" | "lg";

export type ThemeMode = "dark" | "light";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

export type ButtonProps = {
    title?: string;
    onPress?: () => void;

    variant?: ButtonVariant;
    size?: ButtonSize;
    theme?: ThemeMode;

    leftIcon?: IconName;
    rightIcon?: IconName;

    isLoading?: boolean;
    disabled?: boolean;
    fullWidth?: boolean;

    /** Optional social provider icon color or custom icon color */
    iconColor?: string;

    /** Optional custom styles */
    style?: ViewStyle;
    textStyle?: TextStyle;

    /** Accessibility */
    accessibilityLabel?: string;

    /** Haptic feedback */
    haptic?: boolean
    hapticStyle?: Haptics.ImpactFeedbackStyle;
};

export type MotionButtonProps = {
    children: ReactNode
}

export type CloseButtonProps = {
    isSaved?: boolean;
    saveTitle?: string
}