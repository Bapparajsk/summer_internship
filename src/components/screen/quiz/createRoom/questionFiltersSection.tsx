
import { View, Text } from 'react-native';
import { SlidersHorizontal } from 'lucide-react-native';
import { PressableFeedback, Tabs } from 'heroui-native';

export type Difficulty = 'Any' | 'Easy' | 'Medium' | 'Hard';

const DIFFICULTIES: Difficulty[] = [
    'Any',
    'Easy',
    'Medium',
    'Hard',
];

const QUESTION_COUNTS = [5, 10, 15, 20, 30];

type Props = {
    difficulty: Difficulty;
    questionCount: number;
    availableQuestions: number;
    onDifficultyChange: (value: Difficulty) => void;
    onQuestionCountChange: (value: number) => void;
};

export const QuestionFiltersSection = ({
    difficulty,
    questionCount,
    availableQuestions,
    onDifficultyChange,
    onQuestionCountChange,
}: Props) => {
    const hasEnoughQuestions = availableQuestions >= questionCount;

    return (
        <View className="gap-4">
            {/* Header */}
            <View className="flex-row items-center gap-2">
                <SlidersHorizontal size={19} color="#5CC6E2" />
                <Text className="font-poppins-semibold text-base text-text-primary">
                    Question Filters
                </Text>
            </View>

            {/* Difficulty */}
            <View className="gap-2">
                <Text className="font-poppins-medium text-xs text-text-secondary">
                    Difficulty Level
                </Text>

                <Tabs value={difficulty} onValueChange={(value) => onDifficultyChange(value as any)} variant="primary">
                    <Tabs.List className='gap-0'>
                        <Tabs.Indicator />
                        {DIFFICULTIES.map((item) => (
                            <Tabs.Trigger value={item} key={item} className='w-1/4'>
                                <Tabs.Label>
                                    <Text className='text-xs font-poppins-medium'>
                                        {item}
                                    </Text>
                                </Tabs.Label>
                            </Tabs.Trigger>
                        ))}
                    </Tabs.List>
                </Tabs>
            </View>

            {/* Question Count */}
            <View className="gap-2">
                <Text className="font-poppins-medium text-xs text-text-secondary">
                    Number of Questions
                </Text>

                <View className="flex-row gap-2">
                    {QUESTION_COUNTS.map((count) => {
                        const selected = questionCount === count;
                        const disabled = count > availableQuestions;

                        return (
                            <PressableFeedback
                                key={count}
                                isDisabled={disabled}
                                onPress={() => onQuestionCountChange(count)}
                                accessibilityRole="radio"
                                accessibilityState={{
                                    checked: selected,
                                    disabled,
                                }}
                                className={`h-11 min-w-0 flex-1 items-center justify-center rounded-2xl border ${selected
                                    ? 'border-primary-border bg-primary'
                                    : 'border-border bg-surface-container'
                                    } ${disabled ? 'opacity-35' : ''}`}
                            >
                                <Text
                                    className={`text-sm font-poppins-semibold ${selected ? 'text-background' : 'text-text-primary'}`}
                                >
                                    {count}
                                </Text>
                            </PressableFeedback>
                        );
                    })}
                </View>
            </View>

            {/* Availability */}
            <View className="flex-row items-center justify-between rounded-lg bg-surface-container-low px-3 py-2.5">
                <Text className="text-[10px] text-text-secondary font-poppins-medium">
                    Available questions
                </Text>

                <View className="flex-row items-center gap-1.5">
                    <View
                        className={`h-1.5 w-1.5 rounded-full ${hasEnoughQuestions ? 'bg-success' : 'bg-danger'}`}
                    />
                    <Text
                        className={`text-[10px] font-poppins-medium ${hasEnoughQuestions ? 'text-success' : 'text-danger'}`}
                    >
                        {availableQuestions} / {questionCount}
                    </Text>
                </View>
            </View>
        </View>
    );
};
