import { Text, View } from "react-native";
import { cn } from "heroui-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuizSettingsStore } from "@/store/quiz/settingStore";
import { Header } from "./header";
import { Options } from "./options";
import { memo } from "react";

const Penalty = memo(() => (
    <View className="flex-row items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5">
        <MaterialCommunityIcons
            name="shield-alert-outline"
            size={16}
            color="#F87171"
        />
        <Text className="flex-1 text-xs leading-4 text-text-secondary">
            <Text className="text-danger font-poppins-semibold">
                Streak penalty:{" "}
            </Text>
            <Text className="text-[10px] leading-normal font-poppins-medium">
                Using a lifeline deducts points from the streak multiplier.
            </Text>
        </Text>
    </View>
));

Penalty.displayName = "LifelineCardPenalty";

export const LifelineCard = memo(() => {
    const enabled = useQuizSettingsStore((state) => state.lifelines.enabled);
    
    return (
        <View className={cn("rounded-[34px] border border-border bg-surface-container-low p-3", !enabled && "opacity-50")}>
            {/* Header */}
            <Header />

            {enabled && (
                <View className="mt-4 gap-4 rounded-xl bg-surface-container-lowest p-3">
                    {/* Charges */}
                    <Options />
                    {/* Penalty */}
                    <Penalty />
                </View>
            )}
        </View>
    );
});




LifelineCard.displayName = "LifelineCard";