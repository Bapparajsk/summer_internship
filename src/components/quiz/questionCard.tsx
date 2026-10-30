import { memo } from 'react';
import { ScrollView, Text, View } from 'react-native';

type QuizQuestionCardProps = {
    children: string;
};

const QuizQuestionCard = memo(({ children }: QuizQuestionCardProps) => {

    return (
        <View className='mb-5'>
            <View className="rounded-3xl border border-white/30 bg-white/4 p-3.5">
                <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator
                    className="max-h-40"
                >
                    <Text className="text-lg text-text-primary font-poppins-semibold leading-6">
                        {children}
                    </Text>
                </ScrollView>
            </View>
        </View>

    );
});

QuizQuestionCard.displayName = "QuizQuestionCard"

export {
    QuizQuestionCard
}

