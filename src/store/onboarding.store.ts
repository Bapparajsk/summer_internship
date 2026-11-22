
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface OnboardingState {
    isComplete: boolean;
    setIsComplete: (value: boolean) => void;
    resetOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            isComplete: false,

            setIsComplete: (value) => set({ isComplete: value }),

            resetOnboarding: () => set({ isComplete: false }),
        }),
        {
            name: "quizflow-onboarding",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
