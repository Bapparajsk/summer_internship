import { Pressable, Text, View } from 'react-native';
import { Check } from 'lucide-react-native';

const TIME_OPTIONS = [10, 15, 20, 30, 45, 60] as const;

type Props = {
    timePerQuestion: number;
    baseScore: number;
    onTimeChange: (value: number) => void;
};

export const TimingScoringSection = ({
    timePerQuestion,
    baseScore,
    onTimeChange,
}: Props) => {
    return (
        <View className="gap-4">
            {/* Time per question */}
            <View className="gap-3">
                <View className="flex-row items-center justify-between">
                    <Text className="font-poppins-medium text-sm text-text-secondary">
                        Time per question
                    </Text>

                    <View className="rounded-md bg-primary-soft px-2.5 py-1">
                        <Text className="font-poppins-semibold text-sm text-primary">
                            {timePerQuestion}s
                        </Text>
                    </View>
                </View>

                <View className="flex-row flex-wrap gap-2">
                    {TIME_OPTIONS.map((seconds) => {
                        const selected = timePerQuestion === seconds;

                        return (
                            <Pressable
                                key={seconds}
                                onPress={() => onTimeChange(seconds)}
                                accessibilityRole="radio"
                                accessibilityState={{ checked: selected }}
                                className={`w-[31%] flex-grow flex-row items-center justify-center gap-1.5 rounded-lg py-3 ${selected
                                        ? 'bg-primary'
                                        : 'bg-surface-container-high'
                                    }`}
                            >
                                <Text
                                    className={`font-poppins-semibold text-xs ${selected
                                            ? 'text-background'
                                            : 'text-text-primary'
                                        }`}
                                >
                                    {seconds}s
                                </Text>

                                {selected && (
                                    <Check size={12} color="#0D1117" />
                                )}
                            </Pressable>
                        );
                    })}
                </View>

                <Text className="font-poppins-light text-[11px] text-text-tertiary">
                    Players have {timePerQuestion} seconds to answer each question.
                </Text>
            </View>

            {/* Base score */}
            <View className="h-px bg-border" />

            <View className="flex-row items-center justify-between gap-3">
                <View className="flex-1 gap-1">
                    <Text className="font-poppins-medium text-sm text-text-primary">
                        Base score per correct answer
                    </Text>
                    <Text className="font-poppins-light text-xs text-text-secondary">
                        Awarded for every correct response.
                    </Text>
                </View>

                <View className="rounded-lg bg-primary-soft px-3 py-2 items-center">
                    <Text className="font-poppins-semibold text-base text-primary">
                        +{baseScore}
                    </Text>
                    <Text className="font-poppins-medium text-[9px] text-text-secondary">
                        POINTS
                    </Text>
                </View>
            </View>
        </View>
    );
};