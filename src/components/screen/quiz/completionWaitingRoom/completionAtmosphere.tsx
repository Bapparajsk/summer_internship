
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
    Easing,
    useSharedValue,
    useAnimatedStyle,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const PARTICLES = [
    { x: "10%", y: "18%", size: 3, delay: 0 },
    { x: "24%", y: "72%", size: 4, delay: 500 },
    { x: "38%", y: "12%", size: 2, delay: 1000 },
    { x: "52%", y: "82%", size: 3, delay: 300 },
    { x: "69%", y: "22%", size: 4, delay: 800 },
    { x: "82%", y: "65%", size: 2, delay: 1200 },
    { x: "91%", y: "32%", size: 3, delay: 400 },
    { x: "15%", y: "48%", size: 2, delay: 1500 },
    { x: "75%", y: "88%", size: 3, delay: 700 },
    { x: "44%", y: "42%", size: 2, delay: 1100 },
];

function FloatingParticle({
    x,
    y,
    size,
    delay,
}: (typeof PARTICLES)[number]) {
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(0.2);
    const scale = useSharedValue(0.8);

    useEffect(() => {
        const duration = 2200 + delay;

        translateY.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(-24, {
                        duration,
                        easing: Easing.inOut(Easing.sin),
                    }),
                    withTiming(12, {
                        duration: duration + 500,
                        easing: Easing.inOut(Easing.sin),
                    })
                ),
                -1,
                true
            )
        );

        translateX.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(12, { duration: duration + 300 }),
                    withTiming(-12, { duration: duration + 300 })
                ),
                -1,
                true
            )
        );

        opacity.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(0.85, { duration: 1400 }),
                    withTiming(0.15, { duration: 1800 })
                ),
                -1,
                true
            )
        );

        scale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1.5, { duration: 1600 }),
                    withTiming(0.7, { duration: 1600 })
                ),
                -1,
                true
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value },
        ],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                {
                    position: "absolute",
                    left: x as `${number}%`,
                    top: y as `${number}%`,
                    width: size,
                    height: size,
                    borderRadius: size,
                    backgroundColor: "#7BE2FF",
                    shadowColor: "#5CC6E2",
                    shadowOpacity: 0.9,
                    shadowRadius: 8,
                    elevation: 3,
                },
                animatedStyle,
            ]}
        />
    );
}

function GlowOrb({
    color,
    style,
    delay = 0,
}: {
    color: string;
    style: object;
    delay?: number;
}) {
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.16);

    useEffect(() => {
        scale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1.25, {
                        duration: 4500,
                        easing: Easing.inOut(Easing.sin),
                    }),
                    withTiming(0.85, {
                        duration: 4500,
                        easing: Easing.inOut(Easing.sin),
                    })
                ),
                -1,
                true
            )
        );

        opacity.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(0.28, { duration: 4000 }),
                    withTiming(0.1, { duration: 4000 })
                ),
                -1,
                true
            )
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
    }));

    return (
        <Animated.View
            pointerEvents="none"
            style={[
                {
                    position: "absolute",
                    width: 190,
                    height: 190,
                    borderRadius: 100,
                    backgroundColor: color,
                    shadowColor: color,
                    shadowOpacity: 1,
                    shadowRadius: 55,
                    elevation: 12,
                },
                style,
                animatedStyle,
            ]}
        />
    );
}

export function CompletionAtmosphere() {
    return (
        <View
            pointerEvents="none"
            style={StyleSheet.absoluteFill}
            className="overflow-hidden rounded-2xl"
        >
            {/* Moving ambient glows */}
            <GlowOrb
                color="#5CC6E2"
                style={{ top: -100, left: -90 }}
            />

            <GlowOrb
                color="#35D6A0"
                style={{ top: 100, right: -120 }}
                delay={900}
            />

            <GlowOrb
                color="#4385FF"
                style={{ bottom: -130, left: "30%" }}
                delay={1500}
            />

            {/* Blur the ambient lights */}
            <BlurView
                intensity={35}
                tint="dark"
                style={StyleSheet.absoluteFill}
            />

            {/* Floating particles */}
            {PARTICLES.map((particle, index) => (
                <FloatingParticle key={index} {...particle} />
            ))}

            {/* Tiny ambient light dots */}
            <View className="absolute left-[28%] top-[30%] h-1 w-1 rounded-full bg-primary opacity-60" />
            <View className="absolute right-[18%] top-[48%] h-1.5 w-1.5 rounded-full bg-success opacity-50" />
            <View className="absolute bottom-[18%] left-[65%] h-1 w-1 rounded-full bg-primary-bright opacity-70" />
        </View>
    );
}
