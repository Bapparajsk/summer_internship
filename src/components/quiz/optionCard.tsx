import { ScrollView } from 'react-native';
import { memo, ReactNode, useCallback, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';

import {
    updateNavigation,
    useQuizNavigationStore,
} from '@/store/quiz';

import { QuizOption, QuizStatus } from './option';
import { QuizData } from '../screen/quiz/game/temp-data';
import { roomEvents } from '@/events/roomEvents';

export type OptionCardProps = {
    gameId: string;
    questionIndex: number;
    options: QuizData['options'];
    correctAnswer: QuizData['correctAnswer'];
};

const ScrollOptionCard = memo(({ children }: { children: ReactNode }) => {
    const [isScrollable, setIsScrollable] = useState(false);
    const [containerHeight, setContainerHeight] = useState(0);

    return (
        <ScrollView
            className={`flex-1 ${isScrollable ? 'pr-2' : ''}`}
            nestedScrollEnabled
            showsVerticalScrollIndicator={isScrollable}
            onLayout={(e) =>
                setContainerHeight(e.nativeEvent.layout.height)
            }
            onContentSizeChange={(_, contentHeight) =>
                setIsScrollable(contentHeight > containerHeight)
            }
        >
            {children}
        </ScrollView>
    );
});

ScrollOptionCard.displayName = 'ScrollOptionCard';

export const OptionCard = memo(({
    gameId,
    questionIndex,
    options,
    correctAnswer,
}: OptionCardProps) => {

    // Hidden options for this question only
    const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);

    const status = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.status ?? 'unanswered'
    );

    const selectedOption = useQuizNavigationStore(
        state => state.navigations[questionIndex]?.selectedOption
    );

    const handleSelect = useCallback(async (id: string) => {
        if (status !== 'unanswered') return;

        const isCorrect = id === correctAnswer;

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
            status: isCorrect ? 'correct' : 'incorrect',
        });
    }, [status, correctAnswer, questionIndex]);

    // Handle 50/50 event
    const handleFiftyFiftyEvent = useCallback(() => {
        if (status !== 'unanswered') return;

        const incorrectOptions = options.filter(
            option => option.id !== correctAnswer
        );

        if (incorrectOptions.length < 2) return;

        // Randomly shuffle incorrect options
        const shuffled = [...incorrectOptions];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        const hiddenOptionIds = shuffled.slice(0, 2).map(option => option.id);

        setHiddenOptions(prev => [
            ...new Set([...prev, ...hiddenOptionIds]),
        ]);

    }, [status, options, correctAnswer]);



    useEffect(() => {
        return roomEvents.subscribe(
            'lifelineUsed',
            gameId,
            handleFiftyFiftyEvent
        );
    }, [handleFiftyFiftyEvent, gameId]);

    return (
        <ScrollOptionCard>
            {options.map((option, optionIndex) => {
                
                let optionStatus: QuizStatus = 'unanswered';

                if (selectedOption !== undefined) {
                    if (option.id === correctAnswer) {
                        optionStatus = 'correct';
                    } else if (option.id === selectedOption) {
                        optionStatus = 'incorrect';
                    }
                }
                
                return (
                    <QuizOption
                        key={option.id}
                        letter={String.fromCharCode(65 + optionIndex)}
                        option={option.option}
                        id={option.id}
                        status={optionStatus}
                        onPress={handleSelect}
                        disabled={hiddenOptions.includes(option.id) || status !== 'unanswered'}
                        isFalse={hiddenOptions.includes(option.id)}
                    />
                );
            })}
        </ScrollOptionCard>
    );
});

OptionCard.displayName = 'OptionCard';