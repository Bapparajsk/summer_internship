import { useQuizNavigationStore } from "@/store/quiz";
import { memo, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { cn } from "heroui-native";
import { Button } from "@/components/ui/button";

type QuizFooterProps = {
    currentQuestion: number;
    hasAnswered?: boolean;
    onNext?: () => void;
    onPrev?:() => void
};

type ProgressDotProps = {
    index: number;
    active: boolean;
};

const ProgressDot = memo(({ index, active }: ProgressDotProps) => {

    const status = useQuizNavigationStore(
        state => state.navigations[index]?.status
    );

    const scale = useSharedValue(active ? 1.2 : 1);

    useEffect(() => {
        scale.value = withSpring(
            active ? 1.2 : 1,
            {
                stiffness: 220,
                damping: 20,
            }
        );
    }, [active]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View
            style={animatedStyle}
            className={cn(
                "h-2.5 w-2.5 rounded-full bg-white/20",
                {
                    "bg-cyan-400": active,
                    "bg-emerald-400": status === "correct",
                    "bg-rose-400": status === "incorrect",
                }
            )}
        />
    );
}
);

ProgressDot.displayName = "ProgressDot"

export const QuizFooter = ({
    currentQuestion,
    hasAnswered,
    onNext,
    onPrev,
}: QuizFooterProps) => {

    const totalQuestions = useQuizNavigationStore(state => state.totalQuestions);
    const buttonText =
        currentQuestion === totalQuestions
            ? 'Finish Quiz'
            : hasAnswered
                ? 'Next Question'
                : 'Submit Answer';


    return (
        <View className="mt-auto pt-4">

            {/* Progress Tracker */}

            <View className="mb-5 items-center">

                <View className="flex-row items-center gap-2">

                    {Array.from({
                        length: totalQuestions,
                    }).map((_, index) => {


                        return (
                            <ProgressDot
                                key={index}
                                index={index}
                                active={
                                    currentQuestion - 1 ===
                                    index
                                }
                            />
                        );
                    })}

                </View>

            </View>

            {/* Action Button */}
            <View className="flex-row">
                <View className="w-2/6">
                    <Button
                        title="Prev"
                        variant="outline"
                        onPress={onPrev}
                        leftIcon="arrow-back"
                        textStyle={{ marginLeft: 5 }}

                    />
                </View>
                <View className="w-4/6 pl-2">
                    <Button
                        onPress={onNext}
                        title={buttonText}
                        textStyle={{ marginRight: 5 }}
                        variant="outline"
                        theme="light"
                        rightIcon={
                            currentQuestion === totalQuestions
                                ? 'flag'
                                : 'arrow-forward'}

                    />
                </View>
            </View>
        </View>
    );
};