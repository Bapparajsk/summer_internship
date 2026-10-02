import { Fragment, useEffect, useMemo, useState } from "react";
import {
    LayoutChangeEvent,
    Text,
    View,
} from "react-native";
import { TrendingUp, TrendingDown } from "lucide-react-native";
import Svg, {
    Circle,
    Defs,
    LinearGradient,
    Line,
    Path,
    Stop,
} from "react-native-svg";
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const PRIMARY = "#5CC6E2";
const BACKGROUND = "#10141A";
const GRID = "#31353C";

export type AccuracyPoint = {
    label: string;
    value: number;
};

type AccuracyTrendProps = {
    data?: AccuracyPoint[];
    periodLabel?: string;
    onPointPress?: (point: AccuracyPoint, index: number) => void;
};

const DEFAULT_DATA: AccuracyPoint[] = [
    { label: "Day 1", value: 2 },
    { label: "Day 2", value: 1 },
    { label: "Day 3", value: 20 },
    { label: "Day 4", value: 3 },
    { label: "Day 5", value: 9 },
    { label: "Day 6", value: 2 },
    { label: "Day 7", value: 50 },
];

type ProgressLevel = "low" | "medium" | "high";

function getProgressLevel(progress: number): ProgressLevel {
    if (progress <= 40) return "low";
    if (progress <= 70) return "medium";
    return "high";
}

const progressColors = {
    low: {
        line: "#F87171",
        area: "rgba(248, 113, 113, 0.18)",
        marker: "#F87171",
    },
    medium: {
        line: "rgba(92, 198, 226, 0.65)",
        area: "rgba(92, 198, 226, 0.18)",
        marker: "rgba(92, 198, 226, 0.85)",
    },

    high: {
        line: "#7BE2FF",
        area: "rgba(92, 198, 226, 0.24)",
        marker: "#7BE2FF",
    },
} as const;

function sanitizeData(data: AccuracyPoint[]) {
    return data
        .map((item) => ({
            ...item,
            value: Number(item.value),
        }))
        .filter(
            (item) =>
                Number.isFinite(item.value) &&
                item.label.trim().length > 0,
        );
}

function getChartRange(values: number[]) {
    if (!values.length) {
        return {
            min: 0,
            max: 100,
        };
    }

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // Flat data needs some vertical space.
    if (minValue === maxValue) {
        const padding = Math.max(5, Math.abs(minValue) * 0.1);

        return {
            min: minValue - padding,
            max: maxValue + padding,
        };
    }

    const range = maxValue - minValue;
    const padding = Math.max(5, range * 0.18);

    return {
        min: Math.max(0, minValue - padding),
        max: Math.min(100, maxValue + padding),
    };
}

function createPoints(
    data: AccuracyPoint[],
    width: number,
    height: number,
) {
    if (!data.length) return [];

    const values = data.map((item) => item.value);
    const { min, max } = getChartRange(values);

    const range = max - min || 1;

    if (data.length === 1) {
        return [
            {
                x: width / 2,
                y:
                    height -
                    ((data[0].value - min) / range) * height,
            },
        ];
    }

    return data.map((item, index) => {
        const x = (index / (data.length - 1)) * width;

        const normalized =
            (item.value - min) / range;

        const y = height - normalized * height;

        return {
            x,
            y: Math.max(0, Math.min(height, y)),
        };
    });
}

function createSmoothPath(
    points: { x: number; y: number }[],
) {
    if (!points.length) return "";

    if (points.length === 1) {
        return `M ${points[0].x} ${points[0].y}`;
    }

    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
        const current = points[i];
        const next = points[i + 1];

        const controlX =
            current.x + (next.x - current.x) * 0.5;

        path += `
      C
      ${controlX} ${current.y},
      ${controlX} ${next.y},
      ${next.x} ${next.y}
    `;
    }

    return path;
}

function createAreaPath(
    linePath: string,
    points: { x: number; y: number }[],
    height: number,
) {
    if (!points.length || !linePath) return "";

    if (points.length === 1) {
        return `
      M ${points[0].x} ${points[0].y}
      L ${points[0].x} ${height}
      L ${points[0].x} ${height}
      Z
    `;
    }

    return `
    ${linePath}
    L ${points[points.length - 1].x} ${height}
    L ${points[0].x} ${height}
    Z
  `;
}

function getChange(data: AccuracyPoint[]) {
    if (data.length < 2) return 0;

    const first = data[0].value;
    const last = data[data.length - 1].value;

    return last - first;
}

function formatChange(change: number) {
    if (change > 0) return `+${change}%`;
    if (change < 0) return `${change}%`;
    return "0%";
}

export function AccuracyTrend({
    data = DEFAULT_DATA,
    periodLabel = "vs. previous period",
    onPointPress,
}: AccuracyTrendProps) {
    const [chartWidth, setChartWidth] = useState(0);

    const chartHeight = 105;

    const safeData = useMemo(
        () => sanitizeData(data),
        [data],
    );

    const currentAccuracy = safeData.at(-1)?.value ?? 0;

    const change = getChange(safeData);

    const progressLevel = getProgressLevel(currentAccuracy);
    const colors = progressColors[progressLevel];

    const points = useMemo(
        () =>
            createPoints(
                safeData,
                Math.max(chartWidth, 1),
                chartHeight,
            ),
        [safeData, chartWidth],
    );

    const linePath = useMemo(
        () => createSmoothPath(points),
        [points],
    );

    const areaPath = useMemo(
        () =>
            createAreaPath(
                linePath,
                points,
                chartHeight,
            ),
        [linePath, points],
    );

    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = 0;

        progress.value = withTiming(1, {
            duration: 850,
            easing: Easing.out(Easing.cubic),
        });
    }, [linePath]);

    const animatedLineProps = useAnimatedProps(() => ({
        strokeDashoffset: 1 - progress.value,
        opacity: progress.value,
    }));

    const animatedAreaProps = useAnimatedProps(() => ({
        opacity: progress.value * 0.9,
    }));

    const lastPoint = points.at(-1);

    const handleLayout = (
        event: LayoutChangeEvent,
    ) => {
        const width =
            event.nativeEvent.layout.width;

        if (width > 0 && width !== chartWidth) {
            setChartWidth(width);
        }
    };

    if (!safeData.length) {
        return (
            <View className="rounded-[34px] border border-border bg-white/4 p-4">
                <Text className="font-poppins-medium text-[10px] uppercase tracking-[1.4px] text-text-tertiary">
                    7-Day Performance
                </Text>

                <Text className="mt-0.5 font-poppins-semibold text-base text-text-primary">
                    Accuracy trend
                </Text>

                <View className="h-[150px] items-center justify-center">
                    <Text className="font-poppins-medium text-xs text-text-tertiary">
                        No accuracy data available
                    </Text>
                </View>
            </View>
        );
    }

    const TrendIcon =
        change >= 0 ? TrendingUp : TrendingDown;

    const changeColor =
        change >= 0 ? PRIMARY : "#F87171";

    return (
        <View>
            <View className="rounded-[34px] border border-border bg-white/4 p-4">
                {/* Header */}
                <View className="mb-3 flex-row items-start justify-between">
                    <View className="flex-1">
                        <Text className="font-poppins-medium text-[10px] uppercase tracking-[1.4px] text-text-tertiary">
                            7-Day Performance
                        </Text>

                        <Text className="mt-0.5 font-poppins-semibold text-base text-text-primary">
                            Accuracy trend
                        </Text>
                    </View>

                    <View className="items-end">
                        <View className="flex-row items-center gap-1.5">
                            <Text className="font-poppins-semibold text-xl text-primary">
                                {Math.round(currentAccuracy)}%
                            </Text>

                            <View
                                className="flex-row items-center rounded-full px-1.5 py-0.5"
                                style={{
                                    backgroundColor:
                                        change >= 0
                                            ? "rgba(92,198,226,0.12)"
                                            : "rgba(248,113,113,0.10)",
                                }}
                            >
                                <TrendIcon
                                    size={11}
                                    color={changeColor}
                                    strokeWidth={2.5}
                                />

                                <Text
                                    className="ml-0.5 font-poppins-semibold text-[10px]"
                                    style={{ color: changeColor }}
                                >
                                    {formatChange(change)}
                                </Text>
                            </View>
                        </View>

                        <Text className="mt-0.5 font-poppins-medium text-[9px] text-text-tertiary">
                            {periodLabel}
                        </Text>
                    </View>
                </View>

                {/* Chart */}
                <View
                    className="mt-1 w-full"
                    onLayout={handleLayout}
                >
                    {chartWidth > 0 && (
                        <Fragment>
                            <Svg
                                width={chartWidth}
                                height={128}
                                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                            >
                                <Defs>
                                    <LinearGradient
                                        id="accuracyAreaGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <Stop
                                            offset="0"
                                            stopColor={colors.area}
                                            stopOpacity="0.26"
                                        />

                                        <Stop
                                            offset="1"
                                            stopColor={colors.area}
                                            stopOpacity="0"
                                        />
                                    </LinearGradient>
                                </Defs>

                                {/* Grid */}
                                <Line
                                    x1="0"
                                    y1="20"
                                    x2={chartWidth}
                                    y2="20"
                                    stroke={GRID}
                                    strokeWidth="0.7"
                                    strokeDasharray="3 3"
                                />

                                <Line
                                    x1="0"
                                    y1="60"
                                    x2={chartWidth}
                                    y2="60"
                                    stroke={GRID}
                                    strokeWidth="0.7"
                                    strokeDasharray="3 3"
                                />

                                {/* Area */}
                                {areaPath && (
                                    <AnimatedPath
                                        d={areaPath}
                                        fill="url(#accuracyAreaGradient)"
                                        animatedProps={animatedAreaProps}
                                    />
                                )}

                                {/* Curve */}
                                {linePath && (
                                    <AnimatedPath
                                        d={linePath}
                                        fill="none"
                                        stroke={colors.line}
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animatedProps={
                                            animatedLineProps
                                        }
                                    />
                                )}

                                {/* Current point */}
                                {lastPoint && (
                                    <AnimatedCircle
                                        cx={lastPoint.x - 4}
                                        cy={lastPoint.y}
                                        r="4.5"
                                        fill={colors.marker}
                                        stroke={BACKGROUND}
                                        strokeWidth="2"
                                    />
                                )}
                            </Svg>

                            {/* Labels */}
                            <View className="mt-1 flex-row items-center justify-between px-1">
                                {safeData.map((item, index) => {
                                    const shouldShow = safeData.length <= 4 || index === 0 ||  
                                        index === Math.floor(  (safeData.length - 1) / 2, ) || 
                                        index === safeData.length - 1;

                                    return (
                                        <Text
                                            key={`${item.label}-${index}`}
                                            className={`font-poppins-medium text-[9px] ${index ===
                                                safeData.length - 1
                                                ? "text-primary"
                                                : "text-text-tertiary"
                                                }`}
                                        >
                                            {shouldShow ? item.label : ""}
                                        </Text>
                                    );
                                })}
                            </View>
                        </Fragment>
                    )}
                </View>
            </View>
        </View>
    );
}