import { Pressable, Text, View, Switch as HNSwitch } from 'react-native';
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from 'react-native-reanimated';

type Props = {
    negativeMarking: boolean;
    penalty: number;
    showCorrectAnswer: boolean;
    shuffleAnswers: boolean;

    onNegativeMarkingChange: (value: boolean) => void;
    onPenaltyChange: (value: number) => void;
    onShowCorrectAnswerChange: (value: boolean) => void;
    onShuffleAnswersChange: (value: boolean) => void;
};

const PENALTIES = [5, 10, 15, 20, 25, 50];

export const ScoringSettings = ({
    negativeMarking,
    penalty,
    showCorrectAnswer,
    shuffleAnswers,
    onNegativeMarkingChange,
    onPenaltyChange,
    onShowCorrectAnswerChange,
    onShuffleAnswersChange,
}: Props) => {
    return (
        <View className="gap-2">
            {/* Negative marking */}
            <View className="rounded-xl bg-surface-container-high p-3 gap-3">
                <View className="flex-row items-center gap-3">
                    <View className="flex-1 gap-1">
                        <Text className="font-poppins-medium text-sm text-text-primary">
                            Negative marking
                        </Text>
                        <Text className="font-poppins-light text-xs text-text-secondary">
                            Deduct points for incorrect answers.
                        </Text>
                    </View>

                    <Switch
                        value={negativeMarking}
                        onValueChange={onNegativeMarkingChange}
                        activeColor="#F87171"
                    />
                </View>

                {negativeMarking && (
                    <Animated.View
                        entering={FadeIn.duration(180)}
                        exiting={FadeOut.duration(140)}
                        layout={LinearTransition.duration(180)}
                        className="gap-3"
                    >
                        <View className="h-px bg-border" />

                        <View className="flex-row items-center justify-between">
                            <Text className="font-poppins-medium text-xs text-text-secondary">
                                Penalty per incorrect answer
                            </Text>
                            <Text className="font-poppins-semibold text-sm text-danger">
                                -{penalty} pts
                            </Text>
                        </View>

                        <View className="flex-row gap-1.5">
                            {PENALTIES.map((item) => {
                                const selected = penalty === item;

                                return (
                                    <Pressable
                                        key={item}
                                        onPress={() => onPenaltyChange(item)}
                                        className={`flex-1 items-center justify-center rounded-lg py-2 ${selected
                                            ? 'bg-danger-soft border border-danger/40'
                                            : 'bg-surface-container-highest'
                                            }`}
                                    >
                                        <Text
                                            className={`font-poppins-semibold text-xs ${selected
                                                ? 'text-danger'
                                                : 'text-text-secondary'
                                                }`}
                                        >
                                            {item}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </Animated.View>
                )}
            </View>

            <SettingRow
                title="Show correct answer"
                description="Reveal the correct answer after each question."
                value={showCorrectAnswer}
                onValueChange={onShowCorrectAnswerChange}
            />

            <SettingRow
                title="Shuffle answer options"
                description="Randomize option positions for each player."
                value={shuffleAnswers}
                onValueChange={onShuffleAnswersChange}
            />
        </View>
    );
};

const Switch = ({
    value,
    onValueChange,
    activeColor = '#5CC6E2',
}: {
    value: boolean;
    onValueChange: (value: boolean) => void;
    activeColor?: string;
}) => (
    <HNSwitch
        value={value}
        onValueChange={onValueChange}
        trackColor={{
            false: '#31353C',
            true: activeColor,
        }}
        thumbColor="#FFFFFF"
    />
);

const SettingRow = ({
    title,
    description,
    value,
    onValueChange,
}: {
    title: string;
    description: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
}) => (
    <View className="flex-row items-center gap-3 rounded-xl bg-surface-container-high p-3">
        <View className="flex-1 gap-1">
            <Text className="font-poppins-medium text-sm text-text-primary">
                {title}
            </Text>
            <Text className="font-poppins-light text-xs text-text-secondary">
                {description}
            </Text>
        </View>

        <Switch value={value} onValueChange={onValueChange} />
    </View>
);