import { Text, View } from "react-native";
import { AnimatedIndexed } from "./animatedIndexed";
import { Easing } from "react-native-reanimated";

const TITLES = [
    "Challenge your",
    "Build Your Momentum",
    "See your progress.",
];

const DESCRIPTIONS = [
    "Test what you know, discover what you don’t, and turn every quiz into progress.",
    "Make every quiz count and build knowledge through consistent practice.",
    "Track your accuracy, find your weak spots, and get better with every quiz.",
];

const HERO_ITEMS = TITLES.map((title, index) => ({
    title,
    description: DESCRIPTIONS[index],
}));

export function OnboardingHeroText({
    index,
}: {
    index: number;
}) {
    return (
        <View className="mt-4 h-30 overflow-visible pt-space-xs pb-space-sm">
            <AnimatedIndexed
                items={HERO_ITEMS}
                index={index}
                renderItem={({ title, description }) => (
                    <>
                        <Text className="font-poppins-semibold text-4xl leading-tight tracking-tight text-text-primary">
                            {title}
                        </Text>

                        <Text className="mt-2 max-w-75 font-poppins-medium text-xl leading-6 text-text-secondary">
                            {description}
                        </Text>
                    </>
                )}
                easing={Easing.inOut(Easing.cubic)}
                duration={1000}
            />
        </View>
    );
}