import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface SegmentedProgressProps {
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