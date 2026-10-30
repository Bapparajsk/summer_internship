import { updateNavigation, useQuizNavigationStore } from "@/store/quiz";
import * as Haptics from 'expo-haptics';
import { memo } from "react";
import { View, ViewProps } from "react-native";
import { QuizQuestionCard, QuizOptionCard, QuizStatus } from "@/components/quiz";
import { QuizData } from "./temp-data";

type QuizOptionsSectionProps = ViewProps & {
    questionIndex: number;
    quiz: QuizData
};

const QuizOptionsSection = ({
    questionIndex,
    quiz,
}: QuizOptionsSectionProps) => {

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
        <View style={{ flex: 1, marginTop: 12 }}>

            <QuizQuestionCard>
                {quiz.question}
            </QuizQuestionCard>

            {/* <QuizPowerUps /> */}

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
                    <QuizOptionCard
                        key={optionIndex}
                        letter={String.fromCharCode(65 + optionIndex)}
                        text={option}
                        status={optionStatus}
                        onPress={() => handleSelect(optionIndex)}
                    />
                );
            })}
        </View>
    );
};

function QuizOption() {

}

export default memo(QuizOptionsSection);