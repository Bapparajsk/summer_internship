import { View } from "react-native";
import { OnboardingHeaderChip } from "./headerChip";
import { AnimatedIndexed } from "./animatedIndexed";

const CHIPS = [
    "QuizFlow",
    "YOUR JOURNEY",
    "QUIZFLOW AI",
];

export const Header = ({ index }: { index: number }) => {

    return (
        <View className="mt-5 h-10 flex-row items-center justify-center">
            <AnimatedIndexed
                items={CHIPS}
                index={index}
                renderItem={(chip) => (
                    <OnboardingHeaderChip>
                        {chip}
                    </OnboardingHeaderChip>
                )}
            />
        </View>
    );
};