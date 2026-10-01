import { Text, View } from "react-native";
import type { QuizTip } from "./quiz-tips";
import { FontAwesome6 } from "@expo/vector-icons";

interface DailyTipProps {
    tip: QuizTip;
}

export const DailyTip = ({ tip }: DailyTipProps) => {
    return (
        <View className="flex-row items-start gap-3 rounded-[24px] border border-border bg-surface-container-lowest/80 p-3.5">
            <View className="h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                <FontAwesome6 name="lightbulb" size={17} color="#5CC6E2" />
            </View>

            <Text className="flex-1 font-poppins-medium text-xs leading-5 text-text-secondary">
                <Text className="font-poppins-semibold text-text-primary">
                    {tip.label}:
                </Text>{" "}
                {tip.text}{" "}
                {tip.highlight && (
                    <Text className="font-mono text-primary">
                        {tip.highlight}
                    </Text>
                )}
                .
            </Text>
        </View>
    );
}