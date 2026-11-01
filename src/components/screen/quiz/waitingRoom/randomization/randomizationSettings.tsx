import { memo } from "react";
import { Text, View } from "react-native";
import {
    Shuffle,
    ListOrdered,
    ShieldCheck,
} from "lucide-react-native";
import { SettingRow } from "./settingRow";

export const RandomizationSettings = memo(() => {

    return (
        <View className="gap-3">
            <SettingRow
                title="Shuffle questions"
                id="shuffleQuestions"
                description="Give each player the same questions in a different order."
                icon={<Shuffle size={20} color="#5CC6E2" />}
            />

            <SettingRow
                title="Shuffle answer options"
                id="shuffleOptions"
                description="Randomize answer choices for each player."
                icon={<ListOrdered size={20} color="#5CC6E2" />}
            />

            <FairPlayInfo />
        </View>
    );
});

RandomizationSettings.displayName = "RandomizationSettings";

const FairPlayInfo = memo(() => (
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
));

FairPlayInfo.displayName = "FairPlayInfo";