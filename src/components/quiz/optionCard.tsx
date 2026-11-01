import { ScrollView } from 'react-native'
import { updateNavigation, useQuizNavigationStore } from '@/store/quiz';
import * as Haptics from 'expo-haptics';
import { QuizOption, QuizStatus } from './option';
import { QuizData } from '../screen/quiz/game/temp-data';
import { ReactNode, useState } from 'react';

export type OptionCardProps = {
    questionIndex: number;
    options: QuizData["options"];
    correctAnswer: QuizData["correctAnswer"];
}

type OptionsDetails = {
    id: string;
    option: string;
    status: QuizStatus;
    letter: string;
    isCurrentQuestion: boolean;
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

const buildOptionsDetails = (options: QuizData["options"], correctAnswer: QuizData["correctAnswer"]): OptionsDetails[] => {
    return options.map((item, index) => ({
        id: item.id,
        option : item.option,
        status: "unanswered",
        letter: String.fromCharCode(65 + index),
        isCurrentQuestion: item.id === correctAnswer,
    }));
};

export const OptionCard = ({ questionIndex, options, correctAnswer }: OptionCardProps) => {

    const [optionsList, setOptionsList] = useState<OptionsDetails[]>(buildOptionsDetails(options, correctAnswer));

    const status = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.status ?? "unanswered"
    );
    const selectedOption = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.selectedOption
    );

    const handleSelect = async (id: string) => {
        if (status !== "unanswered") {
            return;
        }

        // api call to check if the answer is correct
        const isCorrect = optionsList.find((opt) => opt.id === id)?.isCurrentQuestion;

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
            selectedOption: id,
            status: isCorrect ? "correct" : "incorrect",
        });
    };

    return (
        <ScrollOptionCard>
            {optionsList.map((option, optionIndex) => {

                let optionStatus: QuizStatus = "unanswered";

                if (selectedOption !== undefined) {
                    if (option.isCurrentQuestion) {
                        optionStatus = "correct";
                    } else if (option.id === selectedOption) {
                        optionStatus = "incorrect";
                    }
                }

                return (
                    <QuizOption
                        key={optionIndex}
                        letter={String.fromCharCode(65 + optionIndex)}

                        option={option.option}
                        id={option.id}
                        status={optionStatus}
                        onPress={handleSelect}
                    />
                );
            })}
        </ScrollOptionCard>
    )
}