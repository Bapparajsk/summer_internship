import { memo } from "react";
import { Text, View } from "react-native";
import { ControlField } from "heroui-native";
import {
    updateShuffleQuestionsAndOptions,
    useQuizSettingsStore,
} from "@/store/quiz/settingStore";
import { QuizGameSettings } from "@/store/quiz/type.settingStore";

type SettingKey = keyof Pick<
    QuizGameSettings,
    "shuffleQuestions" | "shuffleOptions"
>;

type Props = {
    title: string;
    id: SettingKey;
    description: string;
    icon: React.ReactNode;
};

export const SettingRow = memo(({ title, id, description, icon }: Props) => {
    const enabled = useQuizSettingsStore((state) => state[id]);

    const toggle = (isSelected: boolean) => {
        updateShuffleQuestionsAndOptions({
            [id]: isSelected,
        });
    };

    console.log(`SettingRow render: ${title}, enabled: ${enabled}`);

    return (
        <View className="flex-row items-center justify-between gap-3 rounded-xl bg-surface-container p-3">
            <ControlField
                isSelected={enabled}
                onSelectedChange={toggle}
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
});

SettingRow.displayName = "SettingRow";