import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import Svg, {
    Circle,
    Defs,
    LinearGradient as SvgLinearGradient,
    Stop,
} from "react-native-svg";
import { Card } from "heroui-native/card";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

const SIZE = 210;
const CENTER = SIZE / 2;
const RADIUS = 92;
const STROKE = 8;

const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const _MY_INDEX = 1; // Index of the current question in the quiz.


export const StreakOnboarding = ({ index }: { index: number }) => {
    const progress = useSharedValue(0);
    const flameScale = useSharedValue(1);
    const todayPulse = useSharedValue(1);

    const isCompleted = useRef(false);

    const startAnimation = () => {
        // 6 / 7 days
        progress.value = withDelay(
            300,
            withTiming(6 / 7, {
                duration: 1200,
            }),
        );

        // Flame animation
        flameScale.value = withRepeat(
            withSequence(
                withTiming(1.08, { duration: 900 }),
                withTiming(1, { duration: 900 }),
            ),
            -1,
            true,
        );

        // Today indicator
        todayPulse.value = withRepeat(
            withSequence(
                withTiming(0.35, { duration: 700 }),
                withTiming(1, { duration: 700 }),
            ),
            -1,
            false,
        );
    }

    useEffect(() => {

        if (isCompleted.current) return;
        if (index !== _MY_INDEX) return;


        setTimeout(() => {
            startAnimation();
        }, 500);

        // 6 / 7 days

        isCompleted.current = true;
    }, [index]);

    const ringProps = useAnimatedProps(() => ({
        strokeDashoffset: CIRCUMFERENCE * (1 - progress.value),
    }));

    const flameStyle = useAnimatedStyle(() => ({
        transform: [{ scale: flameScale.value }],
    }));

    const todayStyle = useAnimatedStyle(() => ({
        opacity: todayPulse.value,
    }));

    return (
        <View className="relative z-20 mt-space-lg w-full items-center">

            {/* Achievement chip */}
            <View className="mb-3 flex-row items-center gap-1.5 overflow-hidden rounded-full bg-surface-container-high px-3 py-1.5">
                <View className="h-1.5 w-1.5 rounded-full bg-primary" />

                <Text className="font-poppins-semibold text-xs tracking-tight text-primary">
                    6 DAY STREAK
                </Text>
            </View>

            {/* Progress core */}
            <Animated.View className="relative h-[210px] w-[210px]">
                <Svg
                    width={SIZE}
                    height={SIZE}
                    viewBox={`0 0 ${SIZE} ${SIZE}`}
                    style={{ transform: [{ rotate: "-90deg" }] }}
                >
                    <Defs>
                        <SvgLinearGradient
                            id="streakGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <Stop offset="0%" stopColor="#5CC6E2" />
                            <Stop offset="100%" stopColor="#7BE2FF" />
                        </SvgLinearGradient>
                    </Defs>

                    {/* Track */}
                    <Circle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="none"
                        stroke="#262A31"
                        strokeWidth={STROKE}
                    />

                    {/* Progress */}
                    <AnimatedCircle
                        cx={CENTER}
                        cy={CENTER}
                        r={RADIUS}
                        fill="none"
                        stroke="url(#streakGradient)"
                        strokeWidth={STROKE}
                        strokeLinecap="round"
                        strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
                        animatedProps={ringProps}
                    />
                </Svg>

                {/* Center console */}
                <View className="absolute inset-4 items-center justify-center rounded-full bg-surface-container-low">
                    {/* Flame */}
                    <Animated.View
                        style={flameStyle}
                        className="mb-1 h-9 w-9 items-center justify-center rounded-full bg-surface-container"
                    >
                        <Text className="text-xl">🔥</Text>
                    </Animated.View>

                    {/* Number */}
                    <View className="flex-row items-baseline">
                        <Text className="font-poppins-semibold text-[52px] leading-none tracking-tight text-text-primary">
                            6
                        </Text>

                        <Text className="ml-1 font-poppins-semibold text-sm text-primary">
                            days
                        </Text>
                    </View>

                    <Text className="mt-1 font-poppins-semibold text-[10px] uppercase tracking-[2px] text-primary">
                        Current Streak
                    </Text>
                </View>
            </Animated.View>

            {/* Seven day matrix */}
            <View className="mt-5 w-full flex-row justify-between px-1">
                {DAYS.map((day, index) => {
                    const completed = index < 6;
                    const today = index === 6;

                    return (
                        <View
                            key={`${day}-${index}`}
                            className={`w-[13%] items-center rounded-lg py-2 ${today
                                ? "bg-surface-container-highest"
                                : "bg-surface-container-high"
                                }`}
                        >
                            <Text
                                className={`font-poppins-medium text-[11px] ${today ? "text-primary" : "text-text-secondary"
                                    }`}
                            >
                                {day}
                            </Text>

                            <View className="mt-1 h-5 w-5 items-center justify-center rounded-full bg-surface-container">
                                {completed ? (
                                    <Text className="font-poppins-semibold text-xs text-primary">
                                        ✓
                                    </Text>
                                ) : (
                                    <Animated.View
                                        style={todayStyle}
                                        className="h-2 w-2 rounded-full bg-primary"
                                    />
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Insight */}
            <Card className="mt-3 w-full border border-border-subtle bg-surface-container-low">
                <Card.Body className="flex-row items-center gap-space-md">
                    <View className="h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container-high">
                        <Text className="text-xl text-primary">✦</Text>
                    </View>
                    <View className="min-w-0 flex-1 ml-2">
                        <Text className="font-poppins-semibold text-base tracking-tight text-text-primary">
                            Consistency compounds
                        </Text>

                        <Text className="mt-0.5 font-poppins-medium text-xs leading-5 text-text-secondary">
                            A few focused minutes each day can turn practice into a lasting
                            learning habit.
                        </Text>
                    </View>
                </Card.Body>
            </Card>
        </View>
    );
}