import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "heroui-native/card";
import { PressableFeedback } from "heroui-native";
import { Feather, FontAwesome6 } from "../../lib/icon";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface QuickQuizCardProps {
    onStart?: () => void;
}

export const QuickQuizCard = ({
    onStart,
}: QuickQuizCardProps) => {
    const score = 90;

    // Circular score animation
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(score, {
            duration: 1000,
        });
    }, []);

    const scoreProps = useAnimatedProps(() => ({
        strokeDashoffset: 100 - progress.value,
    }));

    return (
        <Card className="relative w-full rounded-[30px] border border-border gap-2 p-3 bg-white/4">
            {/* Card gradient */}
            <LinearGradient
                colors={[
                    "#262A31",
                    "#1C2026",
                    "transparent",
                ]}
                locations={[0, 0.3, 1]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                className="absolute inset-0"
            />

            {/* ───────── TOP METADATA ───────── */}

            <Card.Header>
                <View className="w-full flex-row items-center justify-between">

                    {/* Difficulty */}
                    <View className="flex-row items-center gap-1 rounded-full bg-primary-soft px-3 py-1">
                        <View className="size-1 rounded-full bg-primary" />

                        <Text className="font-poppins-semibold text-[8px] uppercase leading-normal tracking-wider text-primary">
                            Mixed Difficulty
                        </Text>
                    </View>

                    {/* Speed Run */}
                    <View className="flex-row items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5">

                        <FontAwesome6 name="bolt" size={10} color="#5CC6E2" />

                        <Text className="font-poppins-medium text-[10px] text-primary">
                            Speed Run
                        </Text>
                    </View>
                </View>
            </Card.Header>
            {/* ───────── MAIN COPY ───────── */}

            <Card.Body className="gap-3">
                <View>
                    <Text className="font-poppins-semibold text-xl tracking-tight text-text-primary">
                        Quick Quiz
                    </Text>

                    <View className="flex-row items-center gap-x-1.5">

                        {/* Questions */}
                        <View className="flex-row items-center gap-1">
                            <Feather name="help-circle" size={12} color="#5CC6E2" />

                            <Text className="font-poppins-medium text-xs text-text-secondary">
                                10 questions
                            </Text>
                        </View>

                        {/* Separator */}
                        <Text className="font-poppins-semibold text-sm text-text-tertiary">
                            ·
                        </Text>

                        {/* Time */}
                        <View className="flex-row items-center gap-1">
                            <FontAwesome6 name="clock" size={12} color="#5CC6E2" />

                            <Text className="font-poppins-medium text-xs text-text-secondary">
                                5 mins
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ───────── QUICK STATS ───────── */}

                <View className="flex-row items-center justify-between rounded-xl overflow-hidden bg-surface-container-lowest/70 p-3">

                    <LinearGradient
                        colors={[
                            "#262A31",
                            "#1C2026",
                            "transparent",
                        ]}
                        locations={[0, 0.3, 1]}
                        // left to right gradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="absolute inset-0"
                    />

                    <View className="flex-row items-center gap-1.5 relative">
                        {/* Circular score */}
                        <View className="relative h-10 w-10 items-center justify-center rounded-full bg-surface-container">
                            <Svg
                                width={40}
                                height={40}
                                viewBox="0 0 36 36"
                                style={{
                                    transform: [{ rotate: "-90deg" }],
                                }}
                            >
                                {/* Background */}
                                <Circle
                                    cx="18"
                                    cy="18"
                                    r="15.9155"
                                    fill="none"
                                    stroke="#31353C"
                                    strokeWidth="3"
                                />

                                {/* Progress */}
                                <AnimatedCircle
                                    cx="18"
                                    cy="18"
                                    r="15.9155"
                                    fill="none"
                                    stroke="#5CC6E2"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeDasharray="100"
                                    animatedProps={scoreProps}
                                />
                            </Svg>

                            <Text className="absolute font-poppins-semibold text-[10px] leading-normal text-primary">
                                {score}%
                            </Text>
                        </View>

                        {/* Score information */}
                        <View className="flex-col">
                            <Text className="font-poppins-medium text-xs text-text-primary">
                                Top Score Record
                            </Text>

                            <Text className="font-poppins-medium text-[10px] leading-normal text-text-secondary">
                                Top 4% of peers
                            </Text>
                        </View>
                    </View>

                    {/* XP */}
                    <View className="rounded-full bg-primary-soft px-2 py-1">
                        <Text className="font-poppins-semibold text-[8px] leading-normal text-primary">
                            +50 XP
                        </Text>
                    </View>
                </View>
            </Card.Body>
            {/* ───────── START BUTTON ───────── */}
            <Card.Footer className="flex-row gap-2 pt-1">
                {/* Secondary */}
                <PressableFeedback
                    // onPress={onViewInsights}
                    className="h-11 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-surface-container-high"
                >
                    <FontAwesome6 name="chart-line" size={14} color="#8FA5B8" />

                    <Text className="font-poppins-medium text-xs text-text-secondary">
                        View Insights
                    </Text>
                </PressableFeedback>

                {/* Primary */}
                <PressableFeedback
                    onPress={onStart}
                    className="h-11 flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-primary-border"
                >
                    <FontAwesome6 name="play" size={14} color="white" />

                    {/* soft top left to bottom right gradient */}
                    <LinearGradient
                        colors={["#5CC6E2", "#5CC6E2AA", "transparent"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="absolute inset-0 rounded-xl opacity-20"
                    />

                    <Text className="font-poppins-semibold text-xs text-text-primary">
                        Start Quiz
                    </Text>
                </PressableFeedback>
            </Card.Footer>
        </Card>
    );
}