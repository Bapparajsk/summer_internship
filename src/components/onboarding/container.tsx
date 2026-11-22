import { View } from "react-native";
import { OnboardingHeroText } from "./heroText";
import { OnboardingFooter } from "./footer";
import { useState } from "react";
import { Header } from "./header";
import { HeroCard } from "./heroCard";
import { Redirect } from "expo-router"

export const Onboarding = () => {

    const [currentStep, setCurrentStep] = useState(0);

    const handelContinue = () => {
        if(currentStep === 3) {
            return <Redirect href={"/(auth)"}/>
        }

        setCurrentStep(prev => prev + 1);
    }

    return (
        <View className="px-5 justify-between flex-1 pb-25 min-h-screen">
            <View>
                <Header index={currentStep} />
                <OnboardingHeroText index={currentStep} />
            </View>
            <HeroCard index={currentStep} />
            <OnboardingFooter
                onContinue={handelContinue}
            />
        </View>
    );
}
