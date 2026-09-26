import { View } from "react-native";

import { AnimatedIndexed } from "./animatedIndexed";
import { ProgressDashboardCard } from "./progressDashboardCard";
import { QuizPreviewCard } from "./quizPreviewCard";
import { StreakOnboarding } from "./streakOnboarding";

const CARDS = [
    QuizPreviewCard,
    StreakOnboarding,
    ProgressDashboardCard,
] as const;

export const HeroCard = ({
    index,
}: {
    index: number;
}) => {
    return (
        <View className="h-90 pb-30 w-full mb-20">
            <AnimatedIndexed
                items={CARDS}
                index={index}
                renderItem={(Card) => <Card />}
            />
        </View>
    );
};