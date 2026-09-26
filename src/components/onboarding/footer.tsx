import { Text, View } from "react-native";
import { PressableFeedback } from "heroui-native/pressable-feedback";
// import { DotLottie, } from "@lottiefiles/dotlottie-react-native";
import { Image } from "expo-image";
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
            className="w-full gap-y-2.5"
        >
            {/* Continue Button */}
            <View className="flex-row items-center justify-center">
                <PressableFeedback
                    onPress={onContinue}
                    className="relative rounded-[20px] border-2 border-primary-border px-4 py-3"
                    accessibilityLabel="Continue"
                >
                    <Text className="text-center font-poppins-semibold text-base text-text-on-primary text-white">
                        {currentStep === totalSteps - 1 ? "Get Started" : "Continue"}
                    </Text>
                </PressableFeedback>
            </View>
        </View>
    );
}