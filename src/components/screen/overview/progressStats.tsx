import { Text, View } from "react-native";
import { Card } from "heroui-native/card";
import { cn } from "heroui-native/utils";
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "../../lib/icon";
import { SectionHeader } from "../../header/sectionHeader";
import { LinearGradient } from "expo-linear-gradient";

interface ProgressStat {
    label: string;
    value?: number;
    parentage?: number
    meta: string;
    type: "solved" | "accuracy" | "streak";
}

const stats: ProgressStat[] = [
    {
        label: "Solved",
        value: 1248,
        meta: "+34 this week",
        type: "solved",
    },
    {
        label: "Accuracy",
        parentage: 82,
        meta: "+4% this week",
        type: "accuracy",
    },
    {
        label: "Day streak",
        value: 12,
        meta: "Best: 18 days",
        type: "streak",
    },
];

const IconWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <View className="h-7 w-7 items-center justify-center rounded-lg bg-surface-container-highest">
            {children}
        </View>
    );
}

const StatIcon = ({
    type,
}: {
    type: ProgressStat["type"];
}) => {
    if (type === "solved") {
        return (
            <IconWrapper>
                <FontAwesome6 name="list-check" size={14} color="#8FA5B8" />
            </IconWrapper>
        );
    }

    if (type === "accuracy") {
        return (
            <IconWrapper>
                <MaterialCommunityIcons name="target" size={17} color="#5CC6E2" />
            </IconWrapper>
        );
    }

    return (
        <IconWrapper>
            <FontAwesome6 name="fire-flame-curved" size={14} color="#FBBF24" />
        </IconWrapper>
    );
}

const ProgressCard = ({
    stat,
}: {
    stat: ProgressStat;
}) => {
    const isAccuracy = stat.type === "accuracy";
    const isStreak = stat.type === "streak";

    return (
        <Card className="rounded-xl flex-1 border border-border p-2.5">
            <LinearGradient
                colors={[
                    "#262A31",
                    "#1C2026",
                    "transparent",
                ]}
                locations={[0, 0.5, 1]}
                className="absolute inset-0"
            />

            <Card.Body>
                <View className="flex-row items-center gap-1.5">
                    <StatIcon type={stat.type} />
                    <Text
                        className={cn("font-poppins-semibold text-base tracking-tight",
                            {
                                "text-primary" : isAccuracy,
                                "text-warning" : isStreak,
                                "text-text-primary" : !isAccuracy && !isStreak
                            },
                        )}
                    >
                        {stat.value?.toLocaleString() ?? `${stat.parentage}%`}
                    </Text>
                </View>

                <View className="mt-2">
                    <Text className="font-poppins-semibold text-[10px] text-text-secondary">
                        {stat.label}
                    </Text>

                    <Text
                        className={cn("font-poppins-medium text-[8px] leading-px",
                            isAccuracy ? "text-primary" : isStreak ? "text-warning" : "text-text-tertiary")}
                    >
                        {stat.meta}
                    </Text>
                </View>
            </Card.Body>
        </Card>
    );
}

export const ProgressStats = () => {
    return (
        <View className="gap-3">
            {/* Header */}
            <SectionHeader
                title="Your progress"
                rightText="View stats"
                rightIcon={<Ionicons name="trending-up" size={16} color="#5CC6E2" />}
            />

            {/* Stats */}
            <View className="flex-row gap-2.5">
                {stats.map((stat) => (
                    <ProgressCard
                        key={stat.type}
                        stat={stat}
                    />
                ))}
            </View>
        </View>
    );
}