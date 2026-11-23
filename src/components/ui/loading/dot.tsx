import { cn } from 'heroui-native';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';

type DotProps = {
    delay?: number;
    size?: number;
    color?: string
};

const Dot = ({
    delay = 0,
    size = 10,
    color
}: DotProps) => {

    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.3);

    useEffect(() => {

        const timeout = setTimeout(() => {

            scale.value = withRepeat(
                withSequence(
                    withTiming(1.4, {
                        duration: 600,
                    }),
                    withTiming(1, {
                        duration: 600,
                    })
                ),
                -1,
                false
            );

            opacity.value = withRepeat(
                withSequence(
                    withTiming(1, {
                        duration: 600,
                    }),
                    withTiming(0.3, {
                        duration: 600,
                    })
                ),
                -1,
                false
            );

        }, delay);

        return () => {
            clearTimeout(timeout);
        };

    }, [delay]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [
            {
                scale: scale.value,
            },
        ],
    }));

    return (
        <Animated.View
            className="rounded-full bg-cyan-400"

            style={[
                animatedStyle,
                {
                    width: size,
                    height: size,
                    backgroundColor: color
                },
            ]}
            
        />
    );
};

type LoadingDotsProps = {
    dots?: number;
    size?: number;
    stagger?: number;
    color?: string
    className?: string
};

export const LoadingDots = ({
    dots = 3,
    size = 10,
    stagger = 350,
    color,
    className,
}: LoadingDotsProps) => {
    return (
        <View
            style={{
                gap: size * 0.8,
            }}
            className={cn("mt-6 flex-row items-center justify-center", className)}
        >
            {Array.from({
                length: dots,
            }).map((_, index) => (
                <Dot
                    key={index}
                    size={size}
                    delay={index * stagger}
                    color={color}
                />
            ))}
        </View>
    );
};