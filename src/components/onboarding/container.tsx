import { View, Text } from "react-native";
import { OnboardingHeader } from "./header";
import { OnboardingHeroText } from "./heroText";
import { QuizPreviewCard } from "./quizPreviewCard";
import { OnboardingFooter } from "./footer";
import { useState } from "react";
import { StreakOnboarding } from "./streakOnboarding";
import { ProgressDashboardCard } from "./progressDashboardCard";

export const Onboarding = () => {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <View className="px-5 justify-between flex-1 pb-25 min-h-screen">
            <View>
                <OnboardingHeader />
                <OnboardingHeroText />
            </View>
            {/* <QuizPreviewCard /> */}
            {/* <StreakOnboarding /> */}
            <ProgressDashboardCard />
            <OnboardingFooter currentStep={0} totalSteps={3} onContinue={() => setCurrentStep(currentStep + 1 % 3)} />
        </View>
    );
}
