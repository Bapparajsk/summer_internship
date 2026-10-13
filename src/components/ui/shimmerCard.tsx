
import { useEffect, useState } from "react";
import { View, type LayoutChangeEvent } from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { cn } from "heroui-native";

type ShimmerCardProps = {
    children: React.ReactNode;
    className?: string;
    scale?: number;
};

const SCALE = 0.4;

export const ShimmerCard = ({ children, className, scale = 0.05 }: ShimmerCardProps) => {
    const [width, setWidth] = useState(0);
    const progress = useSharedValue(0);

    const handleLayout = (event: LayoutChangeEvent) => {
        setWidth(event.nativeEvent.layout.width);
    };

    useEffect(() => {
        if (width <= 0) return;

        progress.value = 0;

        progress.value = withRepeat(
            withSequence(
                withDelay(
                    1000,
                    withTiming(1, {
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                    })
                ),
                withDelay(1200, withTiming(0, { duration: 0 }))
            ),
            -1,
            false
        );

        return () => {
            progress.value = 0;
        };
    }, [width, progress]);

    const shimmerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: interpolate(
                    progress.value,
                    [0, 1],
                    [-width * 1.5, width]
                ),
            },
        ],
    }));

    return (
        <View
            onLayout={handleLayout}
            className={cn("relative overflow-hidden", className)}
        >
            {children}

            {width > 0 && (
                <Animated.View
                    pointerEvents="none"
                    className="absolute bottom-0 top-0"
                    style={[
                        { width: width * 1.5, left: 0 },
                        shimmerStyle,
                    ]}
                >
                    <LinearGradient
                        colors={[
                            "transparent",
                            "rgba(255,255,255,0.25)",
                            "transparent",
                        ]}
                        locations={[SCALE, SCALE+scale, SCALE+(scale * 2)]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
            )}
        </View>
    );
}
