import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";
import { Card } from "heroui-native/card";
import { Chip, cn } from "heroui-native";
import { PressableFeedback } from 'heroui-native';
import * as Haptics from 'expo-haptics';

type Option = {
    id: string;
    value: string;
    selected?: boolean;
};

const tempOptions: Option[] = [
    { id: "A", value: "O(n)" },
    { id: "B", value: "O(log n)" },
    { id: "C", value: "O(n log n)" },
    { id: "D", value: "O(1)", },
];

const correctOptionsId = "B"; // Number of correct options in the quiz.
const _MY_INDEX = 0; // Index of the current question in the quiz.

export function QuizPreviewCard({index}: {index: number}) {
    const float = useSharedValue(0);
    const [options, setOptions] = useState<Option[]>(tempOptions);

    const isCompleted = useRef(false);

    const handleOptionSelect = async (selectedOptionIndex: number) => {

        if(options[selectedOptionIndex].selected) return; // If the option is already selected, do nothing.

        const selectedOptionId = options[selectedOptionIndex].id;

        setOptions((prevOptions) =>
            prevOptions.map((option, index) => ({
                ...option,
                selected: index === selectedOptionIndex,
            }))
        );

        if (selectedOptionId === correctOptionsId) {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        } else {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        }          
    }

    const startAnimation = () => {
        float.value = withRepeat(
            withSequence(
                withTiming(-4, { duration: 2500 }),
                withTiming(4, { duration: 2500 }),
            ),
            -1,
            true,
        );
    }

    useEffect(() => {

        if(isCompleted.current) return;
        if(index !== _MY_INDEX) return;

        isCompleted.current = true;

        setTimeout(() => {
            startAnimation();
        }, 500);
    }, [index]);

    const cardStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: float.value }],
    }));

    return (
        <View className="relative z-20 w-full">
            {/* HeroUI Card */}
            <Animated.View style={cardStyle}>
                <Card
                    className="overflow-hidden border border-border bg-surface-container-low gap-y-5"
                    style={{ borderRadius: 32 }}
                    variant="tertiary"
                >
                    {/* Header */}
                    <Card.Header className="gap-y-2.5 px-space-md pt-space-md">
                        <View className="w-full flex-row items-center justify-between">
                            <Chip className="bg-primary-soft">
                                <View className="h-1.5 w-1.5 rounded-full bg-primary" />

                                <Chip.Label className="font-poppins-semibold text-[11px] uppercase text-primary">
                                    QUESTION 01
                                </Chip.Label>
                            </Chip>

                            <Chip className="bg-surface-container-high">
                                <Chip.Label className="font-poppins-medium text-[11px] text-text-secondary">
                                    DSA • Algorithms
                                </Chip.Label>
                            </Chip>
                        </View>

                        {/* Question */}
                        <Text className="mb-space-md font-poppins-semibold text-xl leading-7 tracking-tight text-text-primary">
                            What is the time complexity of binary search?
                        </Text>
                    </Card.Header>
                    {/* Answers */}
                    <Card.Body>
                        <View className="gap-2">
                            {options.map((option, index) => {
                                const selected = option.selected;

                                return (
                                    <PressableFeedback
                                        key={option.id}
                                        onPress={() => handleOptionSelect(index)}
                                        className={cn(
                                            "flex-row items-center justify-between rounded-lg px-2.5 py-2 border border-pink-50",
                                            {
                                                "border-primary-border bg-primary-soft": selected && option.id === correctOptionsId,
                                                "border-danger bg-danger-soft": selected && option.id !== correctOptionsId,
                                                "border-border-subtle bg-surface-container": !selected
                                            }
                                        )}
                                    >
                                        <PressableFeedback.Ripple
                                            animation={{
                                                backgroundColor: { value: '#8FA5B8' },
                                                opacity: { value: [0, 0.1, 0] },
                                                progress: { baseDuration: 600 },
                                            }}
                                        />
                                        <View className="flex-row items-center gap-3">
                                            {/* Letter */}
                                            <View
                                                className={cn("h-6 w-6 items-center justify-center rounded-md", {
                                                    "bg-primary": selected && option.id === correctOptionsId,
                                                    "bg-danger": selected && option.id !== correctOptionsId,
                                                    "bg-surface-container-high": !selected
                                                })}
                                            >
                                                <Text
                                                    className={cn("font-poppins-semibold text-xs", {
                                                        "text-background": selected,
                                                        "text-text-secondary": !selected
                                                    })}
                                                >
                                                    {option.id}
                                                </Text>
                                            </View>

                                            {/* Answer */}
                                            <Text
                                                className={cn("font-poppins-semibold text-sm", {
                                                    "text-primary": selected && option.id === correctOptionsId,
                                                    "text-danger": selected && option.id !== correctOptionsId,
                                                    "text-text-primary": !selected
                                                })}
                                            >
                                                {option.value}
                                            </Text>
                                        </View>

                                        {/* Indicator */}
                                        {selected && option.id === correctOptionsId ? (
                                            <View
                                                className="h-5 w-5 items-center justify-center rounded-full bg-primary"
                                            >
                                                <Text className="font-poppins-semibold text-xs text-background">
                                                    ✓
                                                </Text>
                                            </View>
                                        ) : selected && option.id !== correctOptionsId ? (
                                            <View
                                                className="h-5 w-5 items-center justify-center rounded-full bg-danger"
                                            >
                                                <Text className="font-poppins-semibold text-xs text-background">
                                                    ✗
                                                </Text>
                                            </View>
                                        ) : (
                                            <View className="h-4 w-4 rounded-full bg-surface-container-high" />
                                        )}
                                    </PressableFeedback>
                                );
                            })}
                        </View>
                    </Card.Body>
                    {/* Footer */}
                    <Card.Footer>
                        <View className="mt-space-sm flex-row items-center justify-between pt-space-xs">
                            <View className="flex-row items-center gap-1">
                                <Text className="text-sm text-primary">✦</Text>

                                <Text className="font-poppins-medium text-xs text-text-tertiary">
                                    Learn from every answer
                                </Text>
                            </View>

                            <Text className="font-poppins-medium text-xs text-text-tertiary">
                                Interactive quiz
                            </Text>
                        </View>
                    </Card.Footer>
                </Card>
            </Animated.View>
        </View>
    );
}