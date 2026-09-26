import { View } from "react-native";
import { OnboardingHeroText } from "./heroText";
import { OnboardingFooter } from "./footer";
import { useState } from "react";
import { Header } from "./header";
import { HeroCard } from "./heroCard";

export const Onboarding = () => {

    const [currentStep, setCurrentStep] = useState(0);

    return (
        <View className="px-5 justify-between flex-1 pb-25 min-h-screen">
            <View>
                <Header index={currentStep}/>
                <OnboardingHeroText index={currentStep} />
            </View>
            <HeroCard index={currentStep} />
            <OnboardingFooter currentStep={currentStep} totalSteps={3} onContinue={() => setCurrentStep((currentStep + 1) % 3)} onPrevious={() => setCurrentStep((currentStep - 1 + 3) % 3)} />
        </View>
    );
}
