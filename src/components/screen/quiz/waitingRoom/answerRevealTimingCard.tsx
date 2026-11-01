import { Text, View } from "react-native";
import { Check, Eye, Trophy } from "lucide-react-native";
import { PressableFeedback } from "heroui-native";
import { AnswerRevealMode } from "@/store/quiz/type.settingStore";
import { useQuizSettingsStore, updateAnswerReveal } from "@/store/quiz/settingStore";
import { memo } from "react";

const options: readonly {
    id: AnswerRevealMode;
    title: string;
    description: string;
    Icon: React.ComponentType<{ size?: number; color?: string }>;
}[] = [
        {
            id: "after_each_question",
            title: "After each question",
            description: "Show correct answers and points instantly.",
            Icon: Eye,
        },
        {
            id: "end_of_game",
            title: "Reveal at the end",
            description: "Keep answers hidden until the quiz ends.",
            Icon: Trophy,
        },
    ];

const Header = () => {
    return (
        <View className="mb-3 flex-row items-center gap-3">
            <View className="h-9 w-9 items-center justify-center rounded-xl bg-surface-container-high">
                <Eye size={19} color="#5CC6E2" />
            </View>

            <View className="flex-1">
                <Text className="font-poppins-semibold text-base text-text-primary">
                    Answer Reveal
                </Text>
                <Text className="text-[10px] font-poppins-medium text-text-secondary">
                    When should answers appear?
                </Text>
            </View>
        </View>
    )
};

export const AnswerRevealTimingCard = memo(() => {

    const mode = useQuizSettingsStore((state) => state.answerReveal);

    return (
        <View className="rounded-[34px] border border-border bg-surface-container-low p-3">
            {/* Header */}
            <Header />

            {/* Options */}
            <View className="gap-2">
                {options.map(({ id, title, description, Icon }) => {
                    const selected = mode === id;

                    return (
                        <PressableFeedback
                            key={id}
                            onPress={() => updateAnswerReveal(id)}
                            accessibilityRole="radio"
                            accessibilityState={{ checked: selected }}
                            className={`flex-row items-center gap-3 rounded-xl border p-3 ${selected
                                ? "border-primary/40 bg-primary-soft"
                                : "border-border bg-surface-container-lowest"
                                }`}
                        >
                            <View
                                className={`h-5 w-5 items-center justify-center rounded-full ${selected
                                    ? "bg-primary"
                                    : "border border-text-tertiary"
                                    }`}
                            >
                                {selected && (
                                    <Check size={13} color="#0D1117" />
                                )}
                            </View>

                            <View className="flex-1">
                                <Text className="font-poppins-medium text-sm text-text-primary">
                                    {title}
                                </Text>
                                <Text className="text-[10px] font-poppins-medium leading-4 text-text-secondary">
                                    {description}
                                </Text>
                            </View>

                            <Icon
                                size={17}
                                color={selected ? "#5CC6E2" : "#8FA5B8"}
                            />
                        </PressableFeedback>
                    );
                })}
            </View>
        </View>
    );
});

AnswerRevealTimingCard.displayName = "AnswerRevealTimingCard";