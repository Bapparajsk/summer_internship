
import { View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Feather, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { SegmentedProgress } from "@/components/ui/progressBar";

type PerformanceCardProps = {
    score: number;
    totalQuestions: number;
    correct: number;
    incorrect: number;
    duration: string;
    xp: number;
    isProvisional?: boolean;
};

function MetricItem({
    icon,
    label,
    value,
    color,
    caption,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
    caption: string;
}) {
    return (
        <View className="flex-1 rounded-xl bg-surface-container p-2.5 gap-1.5 border border-border">
            <View className="flex-row items-center gap-1.5">
                {icon}
                <Text className="font-poppins-medium text-[10px] text-text-secondary">
                    {label}
                </Text>
            </View>

            <Text
                className="font-poppins-semibold text-[21px] leading-normal"
                style={{ color }}
            >
                {value}
            </Text>
        </View>
    );
}

export function PerformanceCard({
    score,
    totalQuestions,
    correct,
    incorrect,
    duration,
    xp,
    isProvisional = true,
}: PerformanceCardProps) {
    const accuracy = totalQuestions > 0
        ? Math.round((correct / totalQuestions) * 100)
        : 0;

    return (
        <View className="rounded-[36px] border border-border bg-white/3 p-3 gap-2">

            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <View className="h-8 w-8 items-center justify-center rounded-lg bg-surface-container-high">
                        <FontAwesome5 name="chart-bar" size={17} color="#5CC6E2" />
                    </View>

                    <Text className="font-poppins-semibold text-[14px] text-text-primary">
                        Your Performance
                    </Text>
                </View>

                {isProvisional && (
                    <View className="rounded-md bg-surface-container-high px-2 py-1">
                        <Text className="font-poppins-medium text-[9px] tracking-wide text-warning uppercase">
                            Provisional
                        </Text>
                    </View>
                )}
            </View>

            {/* Score */}
            <View className="rounded-xl bg-surface-container border border-border p-3.5 gap-2">
                <View className="flex-row items-end justify-between">
                    <View className="gap-1">
                        <Text className="font-poppins-medium text-[10px] tracking-wider text-text-secondary">
                            FINAL SCORE
                        </Text>

                        <View className="flex-row items-baseline gap-1">
                            <Text className="font-poppins-semibold text-[34px] leading-10 text-text-primary">
                                {score}
                            </Text>
                            <Text className="font-poppins-light text-[13px] text-text-secondary">
                                / {totalQuestions}
                            </Text>
                        </View>
                    </View>

                    <View className="rounded-lg bg-success-soft px-2 py-1">
                        <Text className="font-poppins-semibold text-[11px] text-success">
                            +{xp} XP
                        </Text>
                    </View>
                </View>

                <View className="h-1.5 overflow-hidden">
                    {/* <Progress */}
                    <SegmentedProgress 
                        progress={accuracy}
                    />
                </View>

                <View className="flex-row items-center justify-between">
                    <Text className="font-poppins-medium text-[10px] text-text-secondary">
                        {accuracy}% accuracy
                    </Text>
                    <Text className="font-poppins-medium text-[10px] text-success">
                        {accuracy >= 90 ? "Excellent result" : "Keep improving"}
                    </Text>
                </View>
            </View>

            {/* Supporting metrics */}
            <View className="flex-row gap-2">
                <MetricItem
                    icon={<Feather name="check-circle" size={13} color="#4ADE80" />}
                    label="Correct"
                    value={String(correct)}
                    color="#4ADE80"
                    caption="Questions"
                />

                <MetricItem
                    icon={<Feather name="x-circle" size={13} color="#F87171" />}
                    label="Incorrect"
                    value={String(incorrect)}
                    color="#F87171"
                    caption="Questions"
                />

                <MetricItem
                    icon={<MaterialCommunityIcons name="timer-outline" size={13} color="#5CC6E2" />}
                    label="Time"
                    value={duration}
                    color="#FFFFFF"
                    caption="Duration"
                />
            </View>

            {/* Provisional status */}
            {isProvisional && (
                <View className="flex-row items-center gap-3 rounded-xl border border-warning/15 bg-warning-soft px-3 py-2.5">
                    <View className="h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
                        <Svg width={17} height={17} viewBox="0 0 24 24">
                            <Path
                                d="M14.5 14.2l2.9 1.7-.8 1.3L13 15v-5h1.5v4.2zM22 14c0 4.41-3.59 8-8 8-2.02 0-3.86-.76-5.27-2H4c-1.15 0-2-.85-2-2V9c0-1.12.89-1.96 2-2v-.5C4 4.01 6.01 2 8.5 2c2.34 0 4.24 1.79 4.46 4.08.34-.05.69-.08 1.04-.08 4.41 0 8 3.59 8 8zM6 7h5v-.74C10.88 4.99 9.8 4 8.5 4 7.12 4 6 5.12 6 6.5V7zm14 7c0-3.31-2.69-6-6-6s-6 2.69-6 6 2.69 6 6 6 6-2.69 6-6z"
                                fill={"#FBBF24"}
                            />
                        </Svg>
                    </View>

                    <View className="flex-1 gap-0.5">
                        <View className="flex-row items-center gap-1.5">
                            <Text className="font-poppins-semibold text-[12px] text-text-primary">
                                Leaderboard pending
                            </Text>
                            <View className="h-1.5 w-1.5 rounded-full bg-warning" />
                        </View>

                        <Text className="font-poppins-medium text-[10px] leading-3 text-text-secondary">
                            Final ranking and XP will update after everyone finishes.
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
