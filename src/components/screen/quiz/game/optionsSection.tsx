import { memo } from "react";
import { View, ViewProps } from "react-native";
import { QuizQuestionCard } from "@/components/quiz";
import { QuizData } from "./temp-data";
import { OptionCard } from "@/components/quiz/optionCard";

type QuizOptionsSectionProps = ViewProps & {
    questionIndex: number;
    quiz: QuizData
};

const QuizOptionsSection = ({
    questionIndex,
    quiz,
}: QuizOptionsSectionProps) => {

    

    return (
        <View style={{ flex: 1, marginTop: 12 }}>

            <QuizQuestionCard>
                {quiz.question}
            </QuizQuestionCard>

            {/* <QuizPowerUps /> */}
            <OptionCard questionIndex={questionIndex} quiz={quiz} />
        </View>
    );
};


export default memo(QuizOptionsSection);