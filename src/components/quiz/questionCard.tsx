import { memo } from 'react';
import { Text, View } from 'react-native';

type QuizQuestionCardProps = {
    chapter: string;
    difficulty: string;
    question: string;
};

const QuizQuestionCard = memo(({ chapter, difficulty, question }: QuizQuestionCardProps) => {
    return (
        <View className="mb-5 rounded-3xl border border-white/10 bg-white/4 p-5">

            <View className="mb-4 flex-row items-center justify-between">

                <View className="rounded-full bg-white/5 px-3 py-1">
                    <Text className="text-xs text-zinc-400">
                        {chapter}
                    </Text>
                </View>

                <View className="rounded-full bg-amber-500/10 px-3 py-1">
                    <Text className="text-xs font-medium text-amber-400">
                        {difficulty}
                    </Text>
                </View>

            </View>

            <Text numberOfLines={10} className="text-xl font-poppins-semibold leading-8">
                {question}
            </Text>

        </View>
    );
});

QuizQuestionCard.displayName = "QuizQuestionCard"

export {
    QuizQuestionCardProps,
    QuizQuestionCard
}