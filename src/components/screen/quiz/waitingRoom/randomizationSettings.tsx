
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import {
    Shuffle,
    ListOrdered,
    ShieldCheck,
    Check,
} from "lucide-react-native";
import { ControlField, Description, Label } from "heroui-native";

type Props = {
    initialShuffleQuestions?: boolean;
    initialShuffleAnswers?: boolean;
    onShuffleQuestionsChange?: (enabled: boolean) => void;
    onShuffleAnswersChange?: (enabled: boolean) => void;
};

function SettingRow({
    title,
    description,
    enabled,
    onToggle,
    icon,
}: {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
}) {
    return (
        <View className="flex-row items-center justify-between gap-3 rounded-xl bg-surface-container p-3">
            <ControlField
                isSelected={enabled}
                onSelectedChange={onToggle}
            >
                <View className="flex-1 flex-row items-center gap-3">
                    <View className="h-10 w-10 items-center justify-center rounded-lg bg-surface-container-high">
                        {icon}
                    </View>

                    <View className="min-w-0 flex-1">
                        <Text className="font-poppins-semibold text-sm text-text-primary">
                            {title}
                        </Text>
                        <Text className="mt-0.5 font-poppins-medium text-xs leading-4 text-text-secondary">
                            {description}
                        </Text>
                    </View>
                </View>
                <ControlField.Indicator />
            </ControlField>
        </View>
    );
}

export function RandomizationSettings({
    initialShuffleQuestions = true,
    initialShuffleAnswers = true,
    onShuffleQuestionsChange,
    onShuffleAnswersChange,
}: Props) {
    const [shuffleQuestions, setShuffleQuestions] = useState(
        initialShuffleQuestions,
    );
    const [shuffleAnswers, setShuffleAnswers] = useState(
        initialShuffleAnswers,
    );

    const toggleQuestions = () => {
        const next = !shuffleQuestions;
        setShuffleQuestions(next);
        onShuffleQuestionsChange?.(next);
    };

    const toggleAnswers = () => {
        const next = !shuffleAnswers;
        setShuffleAnswers(next);
        onShuffleAnswersChange?.(next);
    };

    return (
        <View className="gap-3">
            <SettingRow
                title="Shuffle questions"
                description="Give each player the same questions in a different order."
                enabled={shuffleQuestions}
                onToggle={toggleQuestions}
                icon={<Shuffle size={20} color="#5CC6E2" />}
            />

            <SettingRow
                title="Shuffle answer options"
                description="Randomize answer choices for each player."
                enabled={shuffleAnswers}
                onToggle={toggleAnswers}
                icon={<ListOrdered size={20} color="#5CC6E2" />}
            />

            {/* Fair-play information */}
            <View className="flex-row items-start gap-3 rounded-xl bg-surface-container-high p-3">
                <View className="mt-0.5 h-7 w-7 items-center justify-center rounded-lg bg-primary-soft">
                    <ShieldCheck size={17} color="#5CC6E2" />
                </View>

                <View className="flex-1">
                    <Text className="font-poppins-semibold text-sm text-text-primary">
                        Fair for everyone
                    </Text>
                    <Text className="mt-1 font-poppins-medium text-xs leading-5 text-text-secondary">
                        Everyone gets the same questions and scoring rules.
                        Only the order of questions and answer choices changes.
                    </Text>
                </View>
            </View>
        </View>
    );
}
