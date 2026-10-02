import { getCommonIcon, IconName } from "@/components/lib/icon";
import { LinearGradient } from "expo-linear-gradient";
import { Card } from "heroui-native";
import { Text, View } from "react-native";


type StatCardProps = {
    icon: IconName;
    value: string;
    label: string;
    meta: string;
    valueClassName?: string;
    iconClassName?: string;
    iconColor?: string;
};


function StatCard({
    icon,
    value,
    label,
    meta,
    valueClassName = "text-text-primary",
    iconClassName = "bg-surface-container-highest",
    iconColor = "#5CC6E2",
}: StatCardProps) {

    const { Icon, name } = getCommonIcon(icon);

    return (
        <Card className="rounded-xl flex-1 border border-border">
            <LinearGradient
                colors={[
                    "#262A31",
                    "#1C2026",
                    "transparent",
                ]}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.3, 1]}
                className="absolute inset-0"
            />
            {/* Top */}
            <View className="flex-row items-center justify-between">
                <View
                    className={`h-7 w-7 items-center justify-center rounded-lg ${iconClassName}`}
                >
                    <Icon
                        size={15}
                        name={name}
                        color={iconColor}
                        strokeWidth={2}
                    />
                </View>

                <View className="max-w-17.5 rounded-full bg-surface-container-highest px-1.5 py-0.5">
                    <Text
                        numberOfLines={1}
                        className="font-poppins-medium text-[9px] text-text-secondary"
                    >
                        {meta}
                    </Text>
                </View>
            </View>

            {/* Value */}
            <View className="mt-auto">
                <Text
                    className={`font-poppins-semibold text-[23px] leading-7 tracking-tight ${valueClassName}`}
                >
                    {value}
                </Text>

                <Text className="mt-0.5 font-poppins-medium text-[10px] text-text-tertiary">
                    {label}
                </Text>
            </View>
        </Card>
    );
}

export const ProgressOverview = () => {
    return (
        <View className="">
            <View className="flex-row gap-2">
                <StatCard
                    icon={"check-all"}
                    value="1,248"
                    label="Solved"
                    meta="+34 wk"
                />

                <StatCard
                    icon={"target"}
                    value="82%"
                    label="Accuracy"
                    meta="Top 12%"
                    valueClassName="text-primary"
                    iconClassName="bg-primary-soft"
                />

                <StatCard
                    icon={"flame"}
                    value="12d"
                    label="Day streak"
                    meta="Best: 18d"
                    iconClassName="bg-warning-soft"
                    iconColor="#FBBF24"
                />
            </View>
        </View>
    );
}