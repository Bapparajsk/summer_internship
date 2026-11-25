
import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
    withDelay,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { usePreventRemove } from "expo-router/react-navigation";
import { useLogout } from "@/hooks/auth/useLogout";
import { useRouter } from "expo-router";

const COLORS = {
    background: "#10141A",
    surface: "#181C22",
    surfaceHigh: "#262A31",
    primary: "#5CC6E2",
    text: "#DFE2EB",
    secondary: "#B3C9DD",
    muted: "#879397",
    icon: "#94A3B8",
};

function LoadingDots() {
    const dot1 = useSharedValue(0);
    const dot2 = useSharedValue(0);
    const dot3 = useSharedValue(0);

    useEffect(() => {
        const animate = (value: typeof dot1, delay: number) => {
            value.value = withDelay(
                delay,
                withRepeat(
                    withSequence(
                        withTiming(1, {
                            duration: 560,
                            easing: Easing.inOut(Easing.ease),
                        }),
                        withTiming(0, {
                            duration: 840,
                            easing: Easing.inOut(Easing.ease),
                        })
                    ),
                    -1,
                    false
                )
            );
        };

        animate(dot1, 0);
        animate(dot2, 200);
        animate(dot3, 400);
    }, [dot1, dot2, dot3]);

    const firstStyle = useAnimatedStyle(() => ({
        opacity: interpolate(dot1.value, [0, 1], [0.25, 1]),
        transform: [
            {
                scale: interpolate(dot1.value, [0, 1], [0.85, 1.15]),
            },
        ],
    }));

    const secondStyle = useAnimatedStyle(() => ({
        opacity: interpolate(dot2.value, [0, 1], [0.25, 1]),
        transform: [
            {
                scale: interpolate(dot2.value, [0, 1], [0.85, 1.15]),
            },
        ],
    }));

    const thirdStyle = useAnimatedStyle(() => ({
        opacity: interpolate(dot3.value, [0, 1], [0.25, 1]),
        transform: [
            {
                scale: interpolate(dot3.value, [0, 1], [0.85, 1.15]),
            },
        ],
    }));

    return (
        <View className="flex-row items-center justify-center gap-2 mt-4">
            {[firstStyle, secondStyle, thirdStyle].map((style, index) => (
                <Animated.View
                    key={index}
                    style={[
                        styles.dot,
                        style,
                    ]}
                />
            ))}
        </View>
    );
}

type LogoutStatus = "loading" | "success" | "error";

export default function SignOutScreen() {

    const router = useRouter();
    const { logout } = useLogout();

    const [status, setStatus] = useState<LogoutStatus>("loading");

    // Prevent duplicate logout calls in Strict Mode
    const logoutStarted = useRef(false);

    usePreventRemove(status === "loading", () => { });

    const pulse = useSharedValue(1);

    useEffect(() => {
        pulse.value = withRepeat(
            withSequence(
                withTiming(1.02, {
                    duration: 1600,
                    easing: Easing.inOut(Easing.ease),
                }),
                withTiming(1, {
                    duration: 1600,
                    easing: Easing.inOut(Easing.ease),
                })
            ),
            -1,
            false
        );
    }, [pulse]);

    // Perform logout
    const performLogout = useCallback(async () => {
        if (logoutStarted.current) return;

        logoutStarted.current = true;
        setStatus("loading");

        try {
            await logout();
            setStatus("success");
        } catch (error) {
            logoutStarted.current = false;
            setStatus("error");
        }
    }, [logout]);

    // Start logout once, after the effect has synchronized the component
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            void performLogout();
        }, 0);

        return () => clearTimeout(timeoutId);
    }, [performLogout]);

    // Redirect only after the navigation lock is disabled
    useEffect(() => {
        if (status === "success") {
            router.replace("/(auth)/sign-in");
        }
    }, [status, router]);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
    }));

    return (
        <View className="flex-1 px-4 justify-between items-center">

            {/* Brand */}
            <View className="w-full items-center pt-8">
                <View className="flex-row items-center gap-2 px-3 py-2 rounded-full bg-surface-container-low">
                    <Feather
                        name="zap"
                        size={14}
                        color={COLORS.primary}
                    />
                    <Text className="text-[10px] font-poppins-semibold leading-normal tracking-widest text-[#B3C9DD]">
                        QUIZFLOW
                    </Text>
                </View>
            </View>

            {/* Main content */}
            <View className="flex-1 justify-center items-center w-full px-6">

                {/* Animated icon */}
                <Animated.View
                    style={[styles.iconContainer, pulseStyle]}
                >
                    <View style={styles.iconBackground} />

                    <View className="relative items-center justify-center">
                        <Feather
                            name="log-out"
                            size={34}
                            color={COLORS.icon}
                        />
                    </View>
                </Animated.View>

                {/* Title */}
                <View className="items-center mt-8">
                    <Text
                        className="text-[23px] font-poppins-semibold tracking-tight text-[#DFE2EB]"
                    >
                        Signing you out
                    </Text>

                    <Text className="text-[12px] font-poppins-medium leading-normal text-[#BDC8CD] mt-2">
                        Ending your session securely.
                    </Text>
                </View>

                {/* Loading */}
                <LoadingDots />
            </View>

            {/* Footer */}
            <View className="w-full items-center mb-12 gap-3">
                <View className="flex-row items-center gap-2">
                    <Feather
                        name="lock"
                        size={13}
                        color={COLORS.muted}
                    />

                    <Text className="text-[10px] tracking-[1px] leading-normal text-[#879397] font-poppins-medium ">
                        ENCRYPTED SESSION TERMINATION
                    </Text>
                </View>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        width: 96,
        height: 96,
        borderRadius: 48,
        backgroundColor: COLORS.surface,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.05)",
    },
    iconBackground: {
        ...StyleSheet.absoluteFill,
        borderRadius: 48,
        backgroundColor: COLORS.surfaceHigh,
        opacity: 0.4,
    },
    arrowOverlay: {
        position: "absolute",
        right: -12,
        top: 4,
        backgroundColor: COLORS.surface,
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: COLORS.primary,
    },
});
