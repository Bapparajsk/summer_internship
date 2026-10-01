import { Card } from "heroui-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const activity = [
    { day: "M", value: 12 },
    { day: "T", value: 18 },
    { day: "W", value: 8 },
    { day: "T", value: 22, peak: true },
    { day: "F", value: 15 },
    { day: "S", value: 5 },
    { day: "S", value: 7, today: true },
];

const MAX_VALUE = Math.max(...activity.map((item) => item.value));

interface ActivityBarProps {
    day: string;
    value: number;
    peak?: boolean;
    today?: boolean;
    selected: boolean;
    onPress: () => void;
}

const ActivityBar = ({
    day,
    value,
    peak,
    today,
    selected,
    onPress,
}: ActivityBarProps) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.94, {
            damping: 15,
            stiffness: 300,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 12,
            stiffness: 250,
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleY: scale.value }],
    }));

    const percentage = (value / MAX_VALUE) * 100;

    return (
        <View className="flex-1 items-center">
            {/* Value */}
            <View className="h-5 items-center justify-center">
                {selected && (
                    <Text
                        className={`font-poppins-medium text-[10px] ${peak
                            ? "text-primary"
                            : "text-text-secondary"
                            }`}
                    >
                        {value}
                    </Text>
                )}
            </View>

            {/* Bar area */}
            <View className="h-24 w-full justify-end rounded-full bg-surface-container">
                <AnimatedPressable
                    style={[
                        animatedStyle,
                        {
                            height: `${percentage}%`,
                        },
                    ]}
                    onPress={onPress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    className={`w-full rounded-full ${today
                            ? "bg-success"
                            : "bg-primary"
                        }`}
                />
            </View>

            {/* Day */}
            <View className="mt-1.5 items-center">
                <Text
                    className={`font-poppins-semibold text-xs ${today || selected
                        ? "text-primary"
                        : "text-text-tertiary"
                        }`}
                >
                    {day}
                </Text>
            </View>
        </View>
    );
}

export const WeeklyActivity = () => {
    const [selectedDay, setSelectedDay] = useState<number | null>(3);

    const total = activity.reduce(
        (sum, item) => sum + item.value,
        0,
    );

    return (
        <Card className="rounded-[34px] border border-border bg-white/4">
            {/* Header */}
            <Card.Header>
                <View className="w-full flex-row items-center justify-between">
                    <View>
                        <Text className="font-poppins-semibold text-base text-text-primary">
                            Weekly activity
                        </Text>

                        <Text className="mt-0.5 font-poppins-medium text-xs text-text-secondary">
                            Your activity this week
                        </Text>
                    </View>

                    <View className="rounded-full bg-surface-container-high px-2.5 py-1">
                        <Text className="font-poppins-semibold text-[10px] leading-normal text-primary">
                            {total} questions
                        </Text>
                    </View>
                </View>
            </Card.Header>
            <Card.Body>
                {/* Chart */}
                <View className="flex-row items-end gap-2 pt-1">
                    {activity.map((item, index) => (
                        <ActivityBar
                            key={`${item.day}-${index}`}
                            day={item.day}
                            value={item.value}
                            peak={item.peak}
                            today={item.today}
                            selected={selectedDay === index}
                            onPress={() => setSelectedDay(index)}
                        />
                    ))}
                </View>
            </Card.Body>
        </Card>
    );
}