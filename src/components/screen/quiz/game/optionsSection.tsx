import { updateNavigation, useQuizNavigationStore } from "@/store/quiz";
import * as Haptics from 'expo-haptics';
import { memo } from "react";
import { View } from "react-native";
import { QuizQuestionCard, QuizPowerUps, QuizOptionCard, QuizStatus } from "@/components/quiz";
import { QuizData } from "./control";

type QuizOptionsSectionProps = QuizData & {
    questionIndex: number;
};

const QuizOptionsSection = ({
    questionIndex,
    ...quiz
}: QuizOptionsSectionProps) => {

    const navigation = useQuizNavigationStore(state => state.navigations[questionIndex]);

    const status = navigation?.status ?? "unanswered";

    const selectedOption = navigation?.selectedOption;

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
        <View style={{ flex: 1 }}>

            <QuizQuestionCard
                chapter={quiz.chapter}
                difficulty={
                    quiz.difficulty
                }
                question={
                    quiz.question
                }
            />

            <QuizPowerUps />

            {quiz.options.map(
                (
                    option,
                    optionIndex
                ) => {

                    let optionStatus:
                        QuizStatus =
                        "unanswered";

                    if (
                        selectedOption !==
                        undefined
                    ) {
                        if (
                            optionIndex ===
                            quiz.correctAnswer
                        ) {
                            optionStatus =
                                "correct";
                        } else if (
                            optionIndex ===
                            selectedOption
                        ) {
                            optionStatus =
                                "incorrect";
                        }
                    }

                    return (
                        <QuizOptionCard
                            key={
                                optionIndex
                            }
                            letter={String.fromCharCode(
                                65 +
                                optionIndex
                            )}
                            text={option}
                            status={
                                optionStatus
                            }
                            onPress={() =>
                                handleSelect(
                                    optionIndex
                                )
                            }
                        />
                    );
                }
            )}

        </View>
    );
};

export default memo(
    QuizOptionsSection
);