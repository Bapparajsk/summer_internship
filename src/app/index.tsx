import { Onboarding } from "@/components/onboarding";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOnboardingStore } from "@/store/onboarding.store";
import { Redirect } from "expo-router";

export default function OnBoarding() {

    const isComplete = useOnboardingStore(store => store.isComplete);

    if(isComplete) {
        return <Redirect href={"/(auth)"}/>
    }

    return (
        <SafeAreaView className="flex-1" >
            <Onboarding />
        </SafeAreaView>
    );
}
