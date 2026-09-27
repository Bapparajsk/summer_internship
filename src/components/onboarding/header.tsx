import { View } from "react-native";
import { OnboardingHeaderChip } from "./headerChip";
import { AnimatedIndexed } from "./animatedIndexed";
import { Easing } from "react-native-reanimated";

const CHIPS = [
    "QuizFlow",
    "YOUR JOURNEY",
    "QUIZFLOW AI",
];

export const Header = ({ index }: { index: number }) => {

    return (
        <View className="mt-5 h-10 flex-row items-center justify-center overflow-visible">
            <AnimatedIndexed
                items={CHIPS}
                index={index}
                renderItem={(chip) => (
                    <OnboardingHeaderChip>
                        {chip}
                    </OnboardingHeaderChip>
                )}
                easing={Easing.inOut(Easing.cubic)}
                duration={700}
                _offset={1}
            />
        </View>
    );
};