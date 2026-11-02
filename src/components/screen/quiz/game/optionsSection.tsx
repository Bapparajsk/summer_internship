import { memo } from "react";
import { View } from "react-native";
import { QuizQuestionCard } from "@/components/quiz";
import { QuizData } from "./temp-data";
import { OptionCard } from "@/components/quiz/optionCard";

type QuizOptionsSectionProps =  {
    questionIndex: number;
    quiz: QuizData
    gameId: string
}; 

const QuizOptionsSection = ({
    questionIndex,
    quiz,
    gameId
}: QuizOptionsSectionProps) => {
    return (
        <View style={{ flex: 1, marginTop: 12 }}>

            <QuizQuestionCard>
                {quiz.question}
            </QuizQuestionCard>

            {/* <QuizPowerUps /> */}
            <OptionCard gameId={gameId} questionIndex={questionIndex} correctAnswer={quiz.correctAnswer} options={quiz.options} />
        </View>
    );
};


export default memo(QuizOptionsSection);