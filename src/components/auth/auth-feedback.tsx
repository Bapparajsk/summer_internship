
import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withSpring,
    withTiming,
} from "react-native-reanimated";

import {
    Smartphone,
    Server,
    Check,
    X,
    MailCheck,
} from "lucide-react-native";
import { cn } from "heroui-native";

export type AuthStatus =
    | "idle"
    | "loading"
    | "success"
    | "error"
    | "otp-sent";

type ActiveAuthStatus = Exclude<AuthStatus, "idle">;

type Props = {
    status: AuthStatus;
};

const AUTH_COLORS = {
    loading: {
        icon: "#07151A",
        packet: "#2497B5",
        accent: "#2497B5",
        glow: "#2497B5",
    },
    success: {
        icon: "#07151A",
        packet: "#16865A",
        accent: "#16865A",
        glow: "#16865A",
    },
    error: {
        icon: "#07151A",
        packet: "#C43D48",
        accent: "#C43D48",
        glow: "#C43D48",
    },
    "otp-sent": {
        icon: "#07151A",
        packet: "#247F9B",
        accent: "#247F9B",
        glow: "#247F9B",
    },
};

function DataPacket({
    index,
    status,
}: {
    index: number;
    status: ActiveAuthStatus;
}) {
    const progress = useSharedValue(0);

    const palette = AUTH_COLORS[status];

    useEffect(() => {
        progress.value = 0;

        if (status === "loading") {
            progress.value = withDelay(
                index * 180,
                withRepeat(
                    withSequence(
                        withTiming(1, {
                            duration: 850,
                            easing: Easing.inOut(Easing.cubic),
                        }),
                        withTiming(0, { duration: 0 })
                    ),
                    -1,
                    false
                )
            );
        } else {
            progress.value = withDelay(
                index * 120,
                withTiming(1, {
                    duration: 750,
                    easing: Easing.inOut(Easing.cubic),
                })
            );
        }
    }, [status, index, progress]);

    const animatedStyle = useAnimatedStyle(() => {
        const direction =
            status === "success" || status === "otp-sent"
                ? -1
                : 1;

        return {
            opacity: interpolate(
                progress.value,
                [0, 0.12, 0.85, 1],
                [0, 1, 1, 0]
            ),
            transform: [
                {
                    translateX:
                        progress.value * 34 * direction,
                },
                {
                    scale: interpolate(
                        progress.value,
                        [0, 0.5, 1],
                        [0.6, 1.2, 0.6]
                    ),
                },
            ],
        };
    });

    return (
        <Animated.View
            style={[
                animatedStyle,
                { backgroundColor: palette.packet },
            ]}
            className="absolute w-1.5 h-1.5 rounded-full"
        />
    );
}

export function AuthFeedback({ status }: Props) {
    const pulse = useSharedValue(1);
    const glow = useSharedValue(0.25);
    const shake = useSharedValue(0);

    useEffect(() => {
        pulse.value = 1;
        glow.value = 0.25;
        shake.value = 0;

        if (status === "loading") {
            pulse.value = withRepeat(
                withSequence(
                    withTiming(1.08, { duration: 600 }),
                    withTiming(1, { duration: 600 })
                ),
                -1,
                true
            );

            glow.value = withRepeat(
                withSequence(
                    withTiming(0.8, { duration: 600 }),
                    withTiming(0.25, { duration: 600 })
                ),
                -1,
                true
            );
        } else {
            pulse.value = withSpring(1, {
                damping: 9,
                stiffness: 160,
            });

            glow.value = withTiming(1, {
                duration: 350,
            });

            if (status === "error") {
                shake.value = withSequence(
                    withTiming(-3, { duration: 60 }),
                    withTiming(3, { duration: 60 }),
                    withTiming(-2, { duration: 60 }),
                    withTiming(2, { duration: 60 }),
                    withTiming(0, { duration: 60 })
                );
            }
        }
    }, [glow, pulse, shake, status]);

    const iconStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: pulse.value },
            { translateX: shake.value },
        ],
    }));

    const glowStyle = useAnimatedStyle(() => ({
        opacity: glow.value,
        transform: [{ scale: pulse.value }],
    }));

    if (status === "idle") return null;

    const palette = AUTH_COLORS[status];

    return (
        <View className="flex-row items-center justify-center gap-0.5">

            {/* Client */}
            <View className="items-center justify-center">

                <Animated.View
                    style={[
                        glowStyle,
                        { borderColor: palette.glow },
                    ]}
                    className="absolute size-9 rounded-xl border"
                />

                <Animated.View
                    style={iconStyle}
                    className="w-9 h-9 items-center justify-center"
                >
                    <Smartphone
                        size={18}
                        color={palette.icon}
                        strokeWidth={2.2}
                    />
                </Animated.View>
            </View>

            {/* Data transfer */}
            <View className="flex-row items-center w-16">

                <View className={cn("absolute right-0 h-4 items-center justify-center -left-9", {
                    "left-9": status === "success" || status === "otp-sent",
                })}>
                    {[0, 1, 2].map((index) => (
                        <DataPacket
                            key={`${status}-${index}`}
                            index={index}
                            status={status}
                        />
                    ))}
                </View>

            </View>

            {/* Server / Response */}
            <View className="items-center justify-center">

                <Animated.View
                    style={[
                        glowStyle,
                        { borderColor: palette.glow },
                    ]}
                    className="absolute size-9 rounded-xl border"
                />

                <Animated.View
                    style={iconStyle}
                    className="w-9 h-9 items-center justify-center"
                >
                    {status === "success" ? (
                        <Check size={22} color={palette.accent} />
                    ) : status === "error" ? (
                        <X size={22} color={palette.accent} />
                    ) : status === "otp-sent" ? (
                        <MailCheck size={23} color={palette.accent} />
                    ) : (
                        <Server size={21} color={palette.icon} />
                    )}
                </Animated.View>
            </View>

        </View>
    );
}
