import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

export function OnboardingHeroText() {
    const titleProgress = useSharedValue(0);
    const descriptionProgress = useSharedValue(0);

    useEffect(() => {
        titleProgress.value = withTiming(1, {
            duration: 550,
        });

        descriptionProgress.value = withDelay(
            140,
            withTiming(1, {
                duration: 500,
            }),
        );
    }, []);

    const titleStyle = useAnimatedStyle(() => ({
        opacity: titleProgress.value,
        transform: [
            {
                translateY: 18 * (1 - titleProgress.value),
            },
        ],
    }));

    const descriptionStyle = useAnimatedStyle(() => ({
        opacity: descriptionProgress.value,
        transform: [
            {
                translateY: 10 * (1 - descriptionProgress.value),
            },
        ],
    }));

    return (
        <View className="pt-space-xs pb-space-sm mt-4">
            {/* Heading */}
            <Animated.View style={titleStyle}>
                <Text className="font-poppins-semibold text-4xl leading-tight tracking-tight text-text-primary">
                    Challenge your{"\n"}knowledge.
                </Text>
            </Animated.View>

            {/* Description */}
            <Animated.View style={descriptionStyle}>
                <Text className="mt-2 max-w-75 font-poppins-medium text-xl leading-6 text-text-secondary">
                    Test what you know, discover what you don’t, and turn every quiz into
                    progress.
                </Text>
            </Animated.View>
        </View>
    );
}