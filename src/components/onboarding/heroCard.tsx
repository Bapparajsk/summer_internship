import { View } from "react-native";

import { AnimatedIndexed } from "./animatedIndexed";
import { ProgressDashboardCard } from "./progressDashboardCard";
import { QuizPreviewCard } from "./quizPreviewCard";
import { StreakOnboarding } from "./streakOnboarding";
import { LinearGradient } from "expo-linear-gradient";
import { Easing } from "react-native-reanimated";

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
        <View className="h-90 pb-30 w-full mb-20 overflow-visible">

            <View className="absolute -inset-8 overflow-hidden">
                <LinearGradient
                    colors={[
                        "rgba(92,198,226,0.18)",
                        "rgba(92,198,226,0.06)",
                        "transparent",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute -left-12 -top-10 h-64 w-64"
                    style={{ borderRadius: 9999 }}
                />

                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(92,198,226,0.05)",
                        "rgba(92,198,226,0.14)",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute -bottom-12 -right-10 h-56 w-56"
                    style={{ borderRadius: 9999 }}
                />
            </View>

            <AnimatedIndexed
                items={CARDS}
                index={index}
                renderItem={(Card) => <Card index={index} />}
                easing={Easing.out(Easing.cubic)}
                duration={1000}
            />
        </View>
    );
};