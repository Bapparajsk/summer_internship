
export type AnswerRevealMode =
    | 'after_each_question'
    | 'end_of_game';

export type LifelineSettings = {
    enabled: boolean;
    maxUses: 1 | 2 | 3 | 4 | 5;
};

export type QuizGameSettings = {
    answerReveal: AnswerRevealMode;
    shuffleQuestions: boolean;
    shuffleOptions: boolean;

    lifelines: LifelineSettings;
};
