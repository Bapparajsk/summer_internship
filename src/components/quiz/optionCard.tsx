import { ScrollView } from 'react-native'
import { updateNavigation, useQuizNavigationStore } from '@/store/quiz';
import * as Haptics from 'expo-haptics';
import { QuizOption, QuizStatus } from './option';
import { QuizData } from '../screen/quiz/game/temp-data';
import { ReactNode, useState } from 'react';

export type OptionCardProps = {
    questionIndex: number;
    quiz: QuizData
}

const ScrollOptionCard = ({ children }: { children: ReactNode }) => {

    const [isScrollable, setIsScrollable] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);

    return (
        <ScrollView
            className={`flex-1 ${isScrollable ? 'pr-2' : ''}`}
            nestedScrollEnabled
            showsVerticalScrollIndicator={isScrollable}
            onLayout={(e) => {
                setContainerHeight(e.nativeEvent.layout.height);
            }}
            onContentSizeChange={(_, contentHeight) => {
                setIsScrollable(contentHeight > containerHeight);
            }}
            contentOffset={{ x: 0, y: 10 }}
        >
            {children}
        </ScrollView>
    )
}

export const OptionCard = ({ questionIndex, quiz }: OptionCardProps) => {

    const status = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.status ?? "unanswered"
    );

    const selectedOption = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.selectedOption
    );

    const handleSelect = async (optionIndex: number) => {
        if (status !== "unanswered") {
            return;
        }

        const isCorrect = optionIndex === quiz.correctAnswer;

        if (isCorrect) {
            await Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Light
            );
        } else {
            await Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
        }

        updateNavigation({
            index: questionIndex,

            selectedOption: optionIndex,

            status: optionIndex ===
                quiz.correctAnswer
                ? "correct"
                : "incorrect",
        });
    };

    return (
        <ScrollOptionCard>
            {quiz.options.map((option, optionIndex) => {

                let optionStatus: QuizStatus = "unanswered";

                if (selectedOption !== undefined) {
                    if (optionIndex === quiz.correctAnswer) {
                        optionStatus = "correct";
                    } else if (optionIndex === selectedOption) {
                        optionStatus = "incorrect";
                    }
                }

                return (
                    <QuizOption
                        key={optionIndex}
                        letter={String.fromCharCode(65 + optionIndex)}
                        text={option}
                        status={optionStatus}
                        onPress={() => handleSelect(optionIndex)}
                    />
                );
            })}
        </ScrollOptionCard>
    )
}