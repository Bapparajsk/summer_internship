import { memo } from 'react';
import { Text, View } from 'react-native';

type QuizQuestionCardProps = {
    children: string;
};

const QuizQuestionCard = memo(({ children }: QuizQuestionCardProps) => {

    return (
        <View className='mb-5'>
            <View className="rounded-3xl border border-white/10 bg-white/4 p-5">
                <Text numberOfLines={10} className="text-xl font-poppins-semibold leading-8">
                    {children}
                </Text>
            </View>
        </View>

    );
});

QuizQuestionCard.displayName = "QuizQuestionCard"

export {
    QuizQuestionCard
}