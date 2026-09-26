import { useEffect } from "react";
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
    Path,
    Stop,
} from "react-native-svg";
import { Card } from "heroui-native/card";
import { SegmentedProgress } from "../progressBar";
import { Ticker } from "../number";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CHART_PATH = "M 10,80 Q 80,72 150,50 T 260,30 L 305,14";
const CHART_LENGTH = 350;

const subjects = [
    {
        name: "Data Structures & Algo",
        value: 82,
        color: "#5CC6E2",
    },
    {
        name: "Modern C++ Mastery",
        value: 50,
        color: "#7BE2FF",
        top: true,
    },
    {
        name: "Database Internals",
        value: 39,
        color: "#8FA5B8",
    },
];

export const ProgressDashboardCard = () => {
    const chartProgress = useSharedValue(0);
    const areaOpacity = useSharedValue(0);
    const cardProgress = useSharedValue(0);
    const apexPulse = useSharedValue(1);
    const pointPulse = useSharedValue(1);

    useEffect(() => {
        pointPulse.value = withRepeat(
            withSequence(
                withTiming(0.15, {
                    duration: 2000,
                }),
                withTiming(0.8, {
                    duration: 2000,
                }),
            ),
            -1,
            true,
        );
    }, []);

    const pointGlowProps = useAnimatedProps(() => ({
        opacity: 0.15 + pointPulse.value * 0.3,
        r: 7 + pointPulse.value * 4,
    }));

    useEffect(() => {
        chartProgress.value = withDelay(
            300,
            withTiming(1, {
                duration: 1200,
            }),
        );

        areaOpacity.value = withDelay(
            700,
            withTiming(1, {
                duration: 700,
            }),
        );

        cardProgress.value = withDelay(
            500,
            withTiming(1, {
                duration: 600,
            }),
        );

        apexPulse.value = withTiming(1, {
            duration: 500,
        });
    }, []);

    const chartProps = useAnimatedProps(() => ({
        strokeDashoffset: CHART_LENGTH * (1 - chartProgress.value),
    }));

    const cardStyle = useAnimatedStyle(() => ({
        opacity: cardProgress.value,
        transform: [
            {
                translateY: 12 * (1 - cardProgress.value),
            },
        ],
    }));

    return (
        <View className="w-full">
            <Card className="relative overflow-hidden rounded-xl border border-border-subtle bg-surface-container-low">
                <Card.Body>
                    {/* Header */}
                    <View className="relative z-10 flex-row items-start justify-between">
                        <View>
                            <Text className="font-poppins-semibold text-xs uppercase tracking-wider text-text-secondary">
                                Overall Accuracy
                            </Text>

                            <View className="mt-0.5 flex-row items-baseline">
                                <Ticker value={"60%"} fontSize={42} className="text-white font-poppins-semibold" />
                            </View>
                        </View>

                        {/* Trend */}
                        <View className="flex-row items-center gap-1 rounded-full bg-primary-soft px-2.5 py-1">
                            <Text className="text-sm text-primary">↗</Text>

                            <Text className="font-poppins-semibold text-xs text-primary">
                                Improving
                            </Text>
                        </View>
                    </View>

                    {/* Chart */}
                    <View className="mt-4 h-32 w-full">
                        <Svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 320 100"
                            preserveAspectRatio="none"
                        >
                            <Defs>
                                <SvgLinearGradient
                                    id="areaGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <Stop
                                        offset="0"
                                        stopColor="#5CC6E2"
                                        stopOpacity="0.28"
                                    />
                                    <Stop
                                        offset="1"
                                        stopColor="#5CC6E2"
                                        stopOpacity="0"
                                    />
                                </SvgLinearGradient>
                            </Defs>

                            {/* Reference lines */}
                            <Path
                                d="M 0 25 L 320 25"
                                stroke="#31353C"
                                strokeWidth="1"
                                strokeDasharray="3 4"
                                opacity={0.5}
                            />

                            <Path
                                d="M 0 50 L 320 50"
                                stroke="#31353C"
                                strokeWidth="1"
                                strokeDasharray="3 4"
                                opacity={0.5}
                            />

                            <Path
                                d="M 0 75 L 320 75"
                                stroke="#31353C"
                                strokeWidth="1"
                                strokeDasharray="3 4"
                                opacity={0.5}
                            />

                            {/* Area */}
                            <AnimatedPath
                                d={`${CHART_PATH} L 305,100 L 10,100 Z`}
                                fill="url(#areaGradient)"
                                // style={{

                                // }}
                                animatedProps={chartProps}
                            />

                            {/* Main line */}
                            <AnimatedPath
                                d={CHART_PATH}
                                fill="none"
                                stroke="#5CC6E2"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeDasharray={CHART_LENGTH}
                                animatedProps={chartProps}
                            />

                            {/* Milestones */}
                            <Circle
                                cx="10"
                                cy="80"
                                r="3"
                                fill="#181C22"
                                stroke="#5CC6E2"
                                strokeWidth="2"
                            />

                            <Circle
                                cx="85"
                                cy="68"
                                r="3"
                                fill="#181C22"
                                stroke="#5CC6E2"
                                strokeWidth="2"
                            />

                            <Circle
                                cx="160"
                                cy="48"
                                r="3"
                                fill="#181C22"
                                stroke="#5CC6E2"
                                strokeWidth="2"
                            />

                            <Circle
                                cx="235"
                                cy="31"
                                r="3"
                                fill="#181C22"
                                stroke="#5CC6E2"
                                strokeWidth="2"
                            />

                            {/* Current point */}
                            <AnimatedCircle
                                cx="305"
                                cy="14"
                                fill="#5CC6E2"
                                animatedProps={pointGlowProps}
                            />

                            <Circle
                                cx="305"
                                cy="14"
                                r="4"
                                fill="#7BE2FF"
                            />

                            <Circle
                                cx="305"
                                cy="14"
                                r="1.5"
                                fill="#0D1117"
                            />
                        </Svg>
                    </View>

                    {/* Subject list */}
                    <View className="relative z-10 mt-2 gap-2">
                        {subjects.map((subject, index) => (
                            <Animated.View
                                key={subject.name}
                                style={cardStyle}
                            >
                                <View className="flex-row items-center justify-between rounded-lg bg-surface-container-high/80 p-3">
                                    <View className="flex-1 flex-row items-center gap-3">
                                        {/* Icon */}
                                        <View className="h-8 w-8 items-center justify-center rounded-lg bg-surface-container">
                                            <Text
                                                className="font-poppins-semibold text-sm"
                                                style={{ color: subject.color }}
                                            >
                                                {index === 0 ? "⌘" : index === 1 ? "</>" : "DB"}
                                            </Text>
                                        </View>

                                        {/* Subject */}
                                        <View className="flex-1">
                                            <View className="flex-row items-center gap-1.5">
                                                <Text
                                                    numberOfLines={1}
                                                    className="flex-1 font-poppins-semibold text-sm text-text-primary"
                                                >
                                                    {subject.name}
                                                </Text>

                                                {subject.top && (
                                                    <View className="rounded-full bg-primary-soft px-1.5 py-0.5">
                                                        <Text className="font-poppins-semibold text-[9px] uppercase tracking-wider text-primary">
                                                            Top
                                                        </Text>
                                                    </View>
                                                )}
                                            </View>

                                            {/* Progress */}
                                            <View className="mt-1.5 w-24 overflow-hidden">
                                                {/* <View
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${subject.value}%`,
                                                        backgroundColor: subject.color,
                                                    }}
                                                /> */}
                                                <SegmentedProgress progress={subject.value} primaryColor={subject.color} />
                                            </View>
                                            
                                        </View>
                                    </View>

                                    {/* Percentage */}
                                    <View className="ml-2 rounded-full bg-surface-container px-2 py-0.5">
                                        <Text
                                            className="font-poppins-semibold text-xs"
                                            style={{ color: subject.color }}
                                        >
                                            {subject.value}%
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>
                        ))}
                    </View>
                </Card.Body>
            </Card>
        </View>
    );
}