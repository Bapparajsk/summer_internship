import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

import {ProgressLine} from '@/components/ui/progressBar';

import { useEffect } from 'react';
import { tick, useQuizTimerStore, useQuizNavigationStore } from '@/store/quiz';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withSpring,
} from 'react-native-reanimated';
import { cn } from 'heroui-native';


const QuizTimer = () => {

    const router = useRouter();

    const timeLeft = useQuizTimerStore(state => state.timeLeft);

    const isRunning = useQuizTimerStore(
        state => state.isRunning
    );

    const scale = useSharedValue(1);

    const isWarning =
        timeLeft > 0 &&
        timeLeft <= 10;

    useEffect(() => {
        if (!isWarning) {
            scale.value = withSpring(1);
            return;
        }

        scale.value = withRepeat(
            withSequence(
                withSpring(1.15),
                withSpring(1)
            ),
            -1,
            false
        );
    }, [isWarning]);

    useEffect(() => {
        if (timeLeft === 10) {
            Haptics.impactAsync(
                Haptics.ImpactFeedbackStyle.Light
            );
        }

        if (timeLeft === 0) {
            Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
            );
            router.replace({
                pathname: "/quiz_game/game_over" as any,
                params: {
                    score: 8,
                },
            });
        }
    }, [timeLeft]);

    useEffect(() => {
        if (!isRunning) return;

        const timer =
            setInterval(() => {
                tick();
            }, 1000);

        return () =>
            clearInterval(timer);
    }, [isRunning]);

    const animatedStyle =
        useAnimatedStyle(() => ({
            transform: [
                {
                    scale: scale.value,
                },
            ],
        }));

    const minutes =
        Math.floor(timeLeft / 60);

    const seconds =
        timeLeft % 60;

    const formatted =
        `${minutes
            .toString()
            .padStart(2, '0')}:${seconds
                .toString()
                .padStart(2, '0')}`;

    return (
        <Animated.View
            style={animatedStyle}
            className={cn("flex-row items-center rounded-full px-4 py-2 border", {
                "border-rose-500/30 bg-rose-500/10": isWarning,
                "border-cyan-500/20 bg-cyan-500/10": !isWarning,
            })}
        >
            <MaterialIcons
                name="timer"
                size={16}
                color={
                    isWarning
                        ? '#FB7185'
                        : '#22D3EE'
                }
            />

            <Text
                className={`ml-2 font-poppins-semibold ${isWarning
                    ? 'text-rose-400'
                    : 'text-cyan-400'
                    }`}
            >
                {formatted}
            </Text>
        </Animated.View>
    );
};

type QuizGameHeaderProps = {
    currentQuestion: number;
};

export const QuizGameHeader = ({
    currentQuestion,
}: QuizGameHeaderProps) => {

    const {
        totalAnswered,
        totalQuestions,
    } = useQuizNavigationStore((state) => ({
        totalAnswered: state.totalAnswered,
        totalQuestions: state.totalQuestions,
    }));


    return (
        <View className="px-4 pt-2 pb-4">

            {/* Header Row */}
            <View className="mb-3 flex-row items-center justify-between">

                <View>
                    <Text className="text-xs uppercase tracking-wider text-zinc-500">
                        Question
                    </Text>

                    <Text className="mt-1 text-lg font-poppins-semibold text-white">
                        {currentQuestion}
                        <Text className="text-zinc-500">
                            {' / '}
                            {totalQuestions}
                        </Text>
                    </Text>

                    <Text className="mt-1 text-xs text-zinc-500">
                        {totalAnswered} / {totalQuestions} Answered
                    </Text>
                </View>

                {/* Timer */}
                <QuizTimer />

            </View>

            <ProgressLine total={totalQuestions} current={totalAnswered} />

        </View>
    );
};