
import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import { LoadingDots } from '../../../ui/loading';

// import { useRouter } from 'expo-router';
// import { useEffect } from 'react';
// import { setQuizResult } from "store/quizGame/quizResultStore";
// import { useQuizNavigationStore } from '@/store/quizGame/quizNavigationStore';
// import { useQuizTimerStore } from '@/store/quizGame/quizTimerStore';

type QuizTimeoutModalProps = {
    title?: string;
    description?: string;
};

export const QuizTimeoutModal = ({
    title = 'Challenge Complete',
    description = 'Time limit reached. Calculating your results...',
}: QuizTimeoutModalProps) => {

    // const router = useRouter();
    // const quizData = useQuizNavigationStore((state) => state.navigations);
    // const timeLeft = useQuizTimerStore(state => state.timeLeft);


    // useEffect(() => {

    //     const score = quizData.reduce((acc, quiz) => {
    //         if (quiz.status === "correct") {
    //             return acc + 2;
    //         }
    //         return acc;
    //     }, 0);

    //     const timeTaken = 300 - timeLeft;

    //     setQuizResult(score, quizData.length, timeTaken);

    //     const id = setInterval(() => {
    //         router.replace("/quiz_game/game_over");
    //     }, 5000);

    //     return () => clearInterval(id);
    // }, [])

    return (
        <View className="items-center rounded-4xl border border-white/10 bg-[#101827] px-6 py-8" >

            {/* Icon */}

            <View className="h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/20">
                <MaterialIcons
                    name="flag"
                    size={36}
                    color="#22D3EE"
                />
            </View>

            {/* Title */}

            <Text className="mt-5 text-2xl font-poppins-semibold text-text-primary">
                {title}
            </Text>

            {/* Description */}

            <Text
                numberOfLines={4}
                className="mt-2 text-center text-zinc-400">
                {description}
            </Text>

            {/* Loading */}

            <LoadingDots />
        </View>
    );
};