import { MaterialIcons } from "@expo/vector-icons";
import { PressableFeedback } from "heroui-native";
import { Text, View } from "react-native";
import { QuizListItem } from "@/types/quiz";
import { getCommonIcon } from "../lib/icon";

export type QuizCardProps = QuizListItem & {
    onPress?: () => void;
};

const difficultyColor: Record<QuizListItem["difficulty"], string> = {
    EASY: "#22C55E",
    MEDIUM: "#EAB308",
    HARD: "#EF4444",
};

export function QuizCard({
    title,
    chapter,
    description,
    difficulty,
    icon,
    duration,
    _count,
    onPress,
}: QuizCardProps) {
    const { Icon, name: iconName } = getCommonIcon(icon);
    const questionCount = _count.questions;

    return (
        <View className="relative mb-3 overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-3">
            <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center">
                    <Icon name={iconName} size={16} color="#22D3EE" />
                    <Text
                        numberOfLines={2}
                        className="ml-1.5 flex-1 text-xs font-poppins-medium text-text-tertiary"
                    >
                        {chapter}
                    </Text>
                </View>

                <View
                    className="rounded-full px-2.5 py-1"
                    style={{
                        backgroundColor: `${difficultyColor[difficulty]}15`,
                    }}
                >
                    <Text
                        className="text-[8px] font-poppins-semibold uppercase leading-normal"
                        style={{ color: difficultyColor[difficulty] }}
                    >
                        {difficulty}
                    </Text>
                </View>
            </View>

            <View className="mt-2">
                <Text
                    numberOfLines={1}
                    className="text-sm font-poppins-semibold tracking-tight text-text-primary"
                >
                    {title}
                </Text>
                {description && (
                    <Text
                        numberOfLines={3}
                        className="text-[10px] font-poppins-medium text-text-tertiary"
                    >
                        {description}
                    </Text>
                )}
            </View>

            <View className="mt-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <View className="flex-row items-center">
                        <MaterialIcons
                            name="quiz"
                            size={12}
                            color="#71717A"
                        />
                        <Text className="ml-1 text-[10px] font-poppins-medium text-text-tertiary">
                            {questionCount} Qs
                        </Text>
                    </View>

                    <Text className="mx-2 text-text-tertiary">·</Text>

                    <View className="flex-row items-center">
                        <MaterialIcons
                            name="schedule"
                            size={12}
                            color="#71717A"
                        />
                        <Text className="ml-1 text-[10px] font-poppins-medium text-text-tertiary">
                            {duration} min
                        </Text>
                    </View>
                </View>

                <PressableFeedback
                    onPress={onPress}
                    className="flex-row items-center rounded-xl bg-primary/10 px-3.5 py-2"
                >
                    <Text className="text-xs font-poppins-semibold text-white">
                        Start
                    </Text>
                    <MaterialIcons
                        name="arrow-forward"
                        size={16}
                        color="#FFFFFF"
                        style={{ marginLeft: 4 }}
                    />
                </PressableFeedback>
            </View>
        </View>
    );
}
