import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { Button } from "heroui-native/button";

interface OnboardingFooterProps {
    currentStep?: number;
    totalSteps?: number;
    onContinue?: () => void;
}

export function OnboardingFooter({
    currentStep = 0,
    totalSteps = 3,
    onContinue,
}: OnboardingFooterProps) {
    const progress = useSharedValue(0);

    useEffect(() => {
        progress.value = withTiming(1, {
            duration: 500,
        });
    }, []);

    const footerStyle = useAnimatedStyle(() => ({
        opacity: progress.value,
        transform: [
            {
                translateY: 20 * (1 - progress.value),
            },
        ],
    }));

    return (
        <Animated.View
            style={footerStyle}
            className="w-full gap-y-2.5"
        >
            {/* Pagination */}
            <View className="flex-row items-center justify-center gap-2">
                {Array.from({ length: totalSteps }).map((_, index) => {
                    const active = index === currentStep;

                    return (
                        <View
                            key={index}
                            className={`h-2 rounded-full ${active
                                    ? "w-6 bg-primary"
                                    : "w-2 bg-surface-container-high"
                                }`}
                        />
                    );
                })}
            </View>

            {/* Continue Button */}
            <Button
                onPress={onContinue}
                className="h-12 w-full rounded-lg bg-primary"
            >
                <Button.Label className="font-poppins-semibold text-base text-background">
                    Continue
                </Button.Label>

                <Text className="ml-1 text-lg font-semibold text-background">
                    →
                </Text>
            </Button>
        </Animated.View>
    );
}