import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { memo } from 'react';
import { PressableFeedback, cn } from 'heroui-native';

export type QuizStatus = 'correct' | 'incorrect' | 'unanswered';

type QuizOptionCardProps = {
    letter: string;
    text: string;
    status?: QuizStatus;
    onPress?: () => void;
};

export const QuizOptionCard = memo(({ letter, text, status = "unanswered", onPress }: QuizOptionCardProps) => {

    const isCorrect = status === "correct";
    const isIncorrect = status === "incorrect";
    const isUnanswered = status === "unanswered";

    return (
        <PressableFeedback
            isDisabled={
                !isUnanswered
            }
            onPress={onPress}
            className={cn(
                "mb-3 rounded-2xl border p-4",
                {
                    "border-cyan-400 bg-cyan-500/10":
                        isCorrect,

                    "border-white/10 bg-white/3":
                        isUnanswered,

                    "border-rose-500 bg-rose-500/10":
                        isIncorrect,
                }
            )}
        >
            <View className="flex-row items-center">

                <View
                    className={cn("h-10 w-10 items-center justify-center rounded-full", {
                        "bg-cyan-500": status === "correct",
                        "bg-white/5": status === "unanswered",
                        "bg-rose-500": status === "incorrect",
                    })}
                >
                    <Text
                        className={cn("font-poppins-semibold", {
                            "text-white": status === "correct" || status === "incorrect",
                            "text-zinc-400": status === "unanswered",
                        })}
                    >
                        {letter}
                    </Text>
                </View>

                <Text
                    numberOfLines={2}
                    className={cn("ml-4 flex-1 text-base", {
                        "font-semibold text-white": status === "correct",
                        "text-zinc-300": status === "unanswered",
                        "text-rose-400": status === "incorrect",
                    })}
                >
                    {text}
                </Text>

                {status === "correct" && (
                    <MaterialIcons
                        name="check-circle"
                        size={22}
                        color="#22D3EE"
                    />
                )}

                {status === "incorrect" && (
                    <MaterialIcons
                        name="cancel"
                        size={22}
                        color="#F87171"
                    />
                )}
            </View>
        </PressableFeedback>
    );
}
);

QuizOptionCard.displayName = "QuizOptionCard"