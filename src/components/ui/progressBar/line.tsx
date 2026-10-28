import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";

type SegmentedProgressProps = {
    progress: number;
    duration?: number;
    primaryColor?: string;
    secondaryColor?: string;
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const SegmentedProgress = ({
    progress,
    duration = 450,
    primaryColor = "#5cc6e2",
    secondaryColor = "#31353c",
}: SegmentedProgressProps) => {
    const value = Math.min(100, Math.max(0, progress));

    const progressValue = useSharedValue(0);

    useEffect(() => {
        progressValue.value = withTiming(value, {
            duration,
        });
    }, [value, duration]);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progressValue.value}%`,
    }));

    return (
        <View className="h-full w-full flex-row gap-0.5 overflow-hidden rounded-full">
            <AnimatedView
                className="h-full rounded-full"
                style={[progressStyle, { backgroundColor: primaryColor }]}
            />

            <View className="h-full flex-1 rounded-full" style={{ backgroundColor: secondaryColor }} />
        </View>
    )
}

type ProgressLineProps = {
    current: number;
    total: number;
    color?: string;
    height?: number;
};

export const ProgressLine = ({
    total,
    current,
    color = '#22D3EE',
    height = 6,
}: ProgressLineProps) => {

    const progressWidth = useSharedValue(0);

    useEffect(() => {
        const percentage =
            total === 0
                ? 0
                : (current / total) * 100;

        progressWidth.value = withSpring(
            percentage,
            {
                stiffness: 120,
                damping: 30,
                mass: 0.7,
            }
        );
    }, [total, current]);

    const progressStyle = useAnimatedStyle(() => ({
        width: `${progressWidth.value}%`,
    }));

    return (
        <View className="overflow-hidden rounded-full bg-white/5">
            <View style={{ height }}>
                <Animated.View
                    style={[progressStyle, { backgroundColor: color }]}
                    className="h-full rounded-full"
                />
            </View>
        </View>
    );
}