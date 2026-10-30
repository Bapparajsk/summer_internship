import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import { useShallow } from 'zustand/react/shallow';
import { SegmentedProgress } from '@/components/ui/progressBar';

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
import { getCommonIcon, IconName } from '@/components/lib/icon';
import { QuizPowerUps } from '@/components/quiz';
import { difficultyColors, DifficultyColorsType } from '@/utils/quiz/difficulty.config';


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
            // router.replace({
            //     pathname: "/quiz_game/game_over" as any,
            //     params: {
            //         score: 8,
            //     },
            // });
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
    topic: string;
    icon: IconName
    difficulty: DifficultyColorsType
};


export const QuizGameHeader = ({ topic, icon, difficulty }: QuizGameHeaderProps) => {

    const { totalAnswered, totalQuestions } = useQuizNavigationStore(
        useShallow((state) => ({
            totalAnswered: state.totalAnswered,
            totalQuestions: state.totalQuestions,
        }))
    );

    const { Icon, name } = getCommonIcon(icon);
    const config = difficultyColors[difficulty];

    return (
        <View className="pt-1">

            {/* Header Row */}
            <View className="mb-3 flex-row items-center justify-between">
                <View className='justify-center'>
                    <Text className="text-xs uppercase font-poppins-medium tracking-wider text-zinc-500">
                        Question
                    </Text>
                    <View className='flex-row gap-x-1 items-center justify-center'>
                        <Icon name={name} color={"#ffffff"} size={12}/>
                        <Text className='text-text-primary font-poppins-semibold'>
                            {topic}
                        </Text>
                    </View>
                </View>

                {/* Timer */}
                <QuizTimer />

            </View>

            {/* <ProgressLine total={totalQuestions} current={totalAnswered} /> */}
            <View className='w-full h-1.5'>
                <SegmentedProgress
                    primaryColor='#22D3EE'
                    progress={
                        totalQuestions > 0
                            ? Math.min(
                                100,
                                Math.max(0, (totalAnswered / totalQuestions) * 100)
                            ) : 0
                    }
                />
            </View>

            <View className="flex-row items-start justify-between mt-2">
                <View 
                    className="rounded-full bg-amber-500/10 px-3 py-1 border"
                    style={{ 
                        backgroundColor: config.bg,
                        borderColor: config.border 
                    }}
                >
                    <Text 
                        className="text-[10px] leading-normal font-poppins-medium capitalize"
                        style={{ color: config.text}}
                    >
                        {difficulty}
                    </Text>
                </View>
                <QuizPowerUps />
            </View>
        </View>
    );
};