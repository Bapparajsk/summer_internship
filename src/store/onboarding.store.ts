
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingState {
    isComplete: boolean;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            isComplete: false,
        }),
        {
            name: "quizflow-onboarding",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export const setIsComplete = () => {
    useOnboardingStore.setState({ isComplete: true })
}