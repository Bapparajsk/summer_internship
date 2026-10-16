import { useCallback } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
    type ViewStyle,
    type TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export type ButtonVariant =
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger";

export type ButtonSize = "sm" | "md" | "lg";

export type ThemeMode = "dark" | "light";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type ButtonProps = {
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
};

const themeColors = {
    dark: {
        primary: {
            face: "#5CC6E2",
            lip: "#2497B5",
            border: "#5CC6E2",
            text: "#07151A",
            pressedFace: "#49B7D4",
        },
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
        danger: {
            face: "#E5484D",
            lip: "#A9282E",
            border: "#E5484D",
            text: "#FFFFFF",
            pressedFace: "#D63A40",
        },
    },
    light: {
        primary: {
            face: "#5CC6E2",
            lip: "#2497B5",
            border: "#5CC6E2",
            text: "#07151A",
            pressedFace: "#49B7D4",
        },
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
        danger: {
            face: "#E5484D",
            lip: "#A9282E",
            border: "#E5484D",
            text: "#FFFFFF",
            pressedFace: "#D63A40",
        },
    },
};

const sizeConfig = {
    sm: {
        height: 40,
        faceHeight: 36,
        radius: 12,
        horizontalPadding: 12,
        fontSize: 12,
        iconSize: 16,
    },
    md: {
        height: 52,
        faceHeight: 48,
        radius: 16,
        horizontalPadding: 16,
        fontSize: 14,
        iconSize: 20,
    },
    lg: {
        height: 60,
        faceHeight: 56,
        radius: 18,
        horizontalPadding: 20,
        fontSize: 16,
        iconSize: 22,
    },
};

export function Button({
    title,
    onPress,
    variant = "primary",
    size = "md",
    theme = "dark",
    leftIcon,
    rightIcon,
    isLoading = false,
    disabled = false,
    fullWidth = false,
    iconColor,
    style,
    textStyle,
    accessibilityLabel,
}: ButtonProps) {

    const pressed = useSharedValue(0);

    const colors = themeColors[theme][variant];
    const dimensions = sizeConfig[size];
    const isDisabled = disabled || isLoading;

    const currentFaceColor = pressed
        ? colors.pressedFace
        : colors.face;

    const currentIconColor = iconColor ?? colors.text;

    
    const handlePressIn = useCallback(() => {
        pressed.value = withSpring(1, {
            damping: 18,
            stiffness: 320,
            mass: 0.45,
        });
    }, []);

    const handlePressOut = useCallback(() => {
        pressed.set(withSpring(0, {
            damping: 14,
            stiffness: 260,
            mass: 0.5,
        }));
    }, []);

    const faceStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: pressed.value * 4 },
        ]
    }));

    return (
        <Pressable
            accessibilityRole="button"
            accessibilityLabel={accessibilityLabel ?? title}
            accessibilityState={{
                disabled: isDisabled,
                busy: isLoading,
            }}
            disabled={isDisabled}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                {
                    width: fullWidth ? "100%" : undefined,
                    opacity: isDisabled ? 0.55 : 1,
                },
                style,
            ]}
        >
            <View
                style={{
                    height: dimensions.height,
                    backgroundColor: colors.lip,
                    borderRadius: dimensions.radius,
                    overflow: "hidden",
                }}
            >
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: dimensions.faceHeight,
                            borderRadius: dimensions.radius,
                            borderWidth: variant === "outline" ? 1 : 0,
                            borderColor: colors.border,
                            backgroundColor: currentFaceColor,
                            paddingHorizontal: dimensions.horizontalPadding,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        },
                        faceStyle
                    ]}
                >
                    {isLoading ? (
                        <ActivityIndicator color={colors.text} size="small" />
                    ) : (
                        <>
                            {leftIcon && (
                                <Ionicons
                                    name={leftIcon}
                                    size={dimensions.iconSize}
                                    color={currentIconColor}
                                />
                            )}

                            {title && (
                                <Text
                                    numberOfLines={1}
                                    className="font-poppins-semibold"
                                    style={[
                                        {
                                            color: colors.text,
                                            fontSize: dimensions.fontSize,
                                            marginLeft: leftIcon ? 10 : 0,
                                            marginRight: rightIcon ? 10 : 0,
                                            flexShrink: 1,
                                        },
                                        textStyle,
                                    ]}
                                >
                                    {title}
                                </Text>
                            )}

                            {rightIcon && (
                                <Ionicons
                                    name={rightIcon}
                                    size={dimensions.iconSize}
                                    color={currentIconColor}
                                />
                            )}
                        </>
                    )}
                </Animated.View>
            </View>
        </Pressable>
    );
}
