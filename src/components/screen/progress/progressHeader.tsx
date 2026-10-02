import {
    CalendarDays,
    CheckCheck,
    Flame,
    Target,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable =
    Animated.createAnimatedComponent(Pressable);

type StatCardProps = {
    icon: React.ComponentType<{
        size?: number;
        color?: string;
        strokeWidth?: number;
    }>;
    value: string;
    label: string;
    meta: string;
    valueClassName?: string;
    iconClassName?: string;
    iconColor?: string;
};

function StatCard({
    icon: Icon,
    value,
    label,
    meta,
    valueClassName = "text-text-primary",
    iconClassName = "bg-surface-container-highest",
    iconColor = "#5CC6E2",
}: StatCardProps) {
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            style={animatedStyle}
            onPressIn={() => {
                scale.set(withSpring(0.97, {
                    damping: 15,
                    stiffness: 300,
                }));
            }}
            onPressOut={() => {
                scale.set(withSpring(1, {
                    damping: 15,
                    stiffness: 300,
                }));
            }}
            className="flex-1"
        >
            <View className="h-[116px] rounded-xl border border-border-subtle bg-surface-container p-3">
                {/* Top */}
                <View className="flex-row items-center justify-between">
                    <View
                        className={`h-7 w-7 items-center justify-center rounded-lg ${iconClassName}`}
                    >
                        <Icon
                            size={15}
                            color={iconColor}
                            strokeWidth={2}
                        />
                    </View>

                    <View className="max-w-[70px] rounded-full bg-surface-container-highest px-1.5 py-0.5">
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
            </View>
        </AnimatedPressable>
    );
}

export function ProgressHeader({
    onFilter,
}: {
    onFilter?: () => void;
}) {
    return (
        <View className="flex-row items-end justify-between px-4 pb-2 pt-1">
            <View className="flex-1">
                <Text className="font-poppins-semibold text-[10px] uppercase tracking-[1.5px] text-primary">
                    Performance Analytics
                </Text>

                <Text className="mt-0.5 font-poppins-semibold text-3xl tracking-tight text-text-primary">
                    Progress
                </Text>

                <Text className="mt-0.5 font-poppins-medium text-xs text-text-secondary">
                    Track your technical mastery & velocity
                </Text>
            </View>

            <Pressable
                onPress={onFilter}
                className="ml-3 h-10 w-10 items-center justify-center rounded-xl bg-surface-container-high active:opacity-70"
                hitSlop={8}
            >
                <CalendarDays
                    size={19}
                    color="#5CC6E2"
                    strokeWidth={2}
                />
            </Pressable>
        </View>
    );
}

export function ProgressOverview() {
    return (
        <View className="px-4 py-2">
            <View className="flex-row gap-2">
                <StatCard
                    icon={CheckCheck}
                    value="1,248"
                    label="Solved"
                    meta="+34 wk"
                />

                <StatCard
                    icon={Target}
                    value="82%"
                    label="Accuracy"
                    meta="Top 12%"
                    valueClassName="text-primary"
                    iconClassName="bg-primary-soft"
                />

                <StatCard
                    icon={Flame}
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