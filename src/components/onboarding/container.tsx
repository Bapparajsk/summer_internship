import { View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

import { OnboardingHeroText } from "./heroText";
import { OnboardingFooter } from "./footer";
import { Header } from "./header";
import { HeroCard } from "./heroCard";
import { setIsComplete } from "@/store/onboarding.store";

export const Onboarding = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();

    const handleContinue = () => {
        if (currentStep === 2) {
            setIsComplete()
            router.replace("/(auth)");
            return;
        }

        setCurrentStep(prev => prev + 1);
    };

    return (
        <View className="px-5 justify-between flex-1 pb-25 min-h-screen">
            <View>
                <Header index={currentStep} />
                <OnboardingHeroText index={currentStep} />
            </View>

            <HeroCard index={currentStep} />

            <OnboardingFooter onContinue={handleContinue} />
        </View>
    );
};