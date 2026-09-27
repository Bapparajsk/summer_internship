import { Text, View } from "react-native";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { DotLottie } from "@lottiefiles/dotlottie-react-native";

interface OnboardingFooterProps {
    currentStep?: number;
    totalSteps?: number;
    onContinue?: () => void;
    onPrevious?: () => void;
}

export function OnboardingFooter({
    currentStep = 0,
    totalSteps = 3,
    onContinue,
    onPrevious,
}: OnboardingFooterProps) {
    return (
        <View
            className="w-full gap-y-2.5 mb-10"
        >
            {/* Continue Button */}
            <View className="flex-row items-center justify-center">
                <View className="absolute">
                    <DotLottie
                        source={{ uri: "https://lottie.host/23f0569d-8516-4530-a4f5-39e14e1d2cdf/zY7x3hdHtW.lottie" }}
                        autoplay
                        loop
                        themeId="dark-mode"
                        style={{ width: 150, height: 150 }}
                    />
                </View>
                <PressableFeedback
                    onPress={onContinue}
                    className="relative rounded-[20px]"
                    accessibilityLabel="Continue"
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text className="text-center font-poppins-semibold text-base text-text-on-primary text-white">
                        →
                    </Text>
                </PressableFeedback>
            </View>
        </View>
    );
}