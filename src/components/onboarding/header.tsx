import { View, Text, Pressable } from 'react-native';
import { Chip } from 'heroui-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { useEffect } from 'react';

export const OnboardingHeader = () => {

    const opacity = useSharedValue(1);

    useEffect(() => {
        opacity.value = withRepeat(
            withSequence(
                withTiming(0.25, { duration: 800 }),
                withTiming(1, { duration: 800 }),
            ),
            -1,
            false,
        );
    }, []);

    const fadeStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));


    return (
        <View className="mt-5 flex-row items-center justify-center">
            {/* QuizFlow Badge */}
            <Chip className="bg-surface-container-high border">
                <Animated.View
                    style={fadeStyle}
                    className="h-1.5 w-1.5 rounded-full bg-primary"
                />
                <Text className="font-poppins-semibold text-xs uppercase tracking-wide text-primary">
                    QuizFlow
                </Text>
            </Chip>
        </View>
    )
} 