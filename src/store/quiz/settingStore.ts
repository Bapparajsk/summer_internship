import { create } from 'zustand';
import { QuizGameSettings, LifelineSettings } from "./type.settingStore";


// // ------------------------------------
// // Default values
// // ------------------------------------

const defaultSettings: QuizGameSettings = {
    answerReveal: 'end_of_game',
    shuffleQuestions: true,
    shuffleOptions: true,

    lifelines: {
        enabled: false,
        maxUses: 1,
    },
};

export const useQuizSettingsStore = create<QuizGameSettings>(() => ({ ...defaultSettings }));

// functions
export const updateAnswerReveal = (newValue: QuizGameSettings['answerReveal']) => {
    useQuizSettingsStore.setState((prev) => ({
        ...prev,
        answerReveal: newValue,
    }));
}

export const updateShuffleQuestionsAndOptions = ({ shuffleQuestions, shuffleOptions }: Pick<Partial<QuizGameSettings>, 'shuffleQuestions' | 'shuffleOptions'>) => {
    useQuizSettingsStore.setState((prev) => ({
        ...prev,
        shuffleQuestions: typeof shuffleQuestions === 'boolean' ? shuffleQuestions : prev.shuffleQuestions,
        shuffleOptions: typeof shuffleOptions === 'boolean' ? shuffleOptions : prev.shuffleOptions,
    }));
}

const updateLifelinesEnabled = (enabled: boolean) => {
    useQuizSettingsStore.setState((prev) => ({
        ...prev,
        lifelines: {
            ...prev.lifelines,
            enabled: typeof enabled === 'boolean' ? enabled : prev.lifelines.enabled,
        },
    }));
}

export const enableLifelines = () => {
    updateLifelinesEnabled(true);
}

export const disableLifelines = () => {
    updateLifelinesEnabled(false);
}


export const updateLifelines = ({ maxUses }: Pick<LifelineSettings, 'maxUses'>) => {
    useQuizSettingsStore.setState((prev) => ({
        ...prev,
        lifelines: {
            ...prev.lifelines,
            maxUses: typeof maxUses === 'number' ? maxUses : prev.lifelines.maxUses,
        },
    }));
}