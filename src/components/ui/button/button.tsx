import { useCallback } from "react";
import {
    ActivityIndicator,
    Pressable,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { themeColors } from "./color";
import { ButtonProps } from "./type";
import { sizeConfig } from "./config";

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
    haptic = true,
    hapticStyle = Haptics.ImpactFeedbackStyle.Medium,
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

        if (haptic) {
            Haptics.impactAsync(hapticStyle);
        }
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
