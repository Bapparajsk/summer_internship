import { create } from 'zustand';
import { QuizGameSettings, LifelineSettings } from "./type.settingStore";
import { emitSettingsChanged } from '@/events/roomSettingEvents';


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

// ------------------------------------
// utils
const updateQuizSettings = (updater: (prev: QuizGameSettings) => QuizGameSettings) => {
    const prev = useQuizSettingsStore.getState();
    const next = updater(prev);

    if (Object.is(prev, next)) return;

    useQuizSettingsStore.setState(next);
    emitSettingsChanged();
}

// functions
export const updateAnswerReveal = (newValue: QuizGameSettings["answerReveal"]) => {
    updateQuizSettings((prev) =>
        prev.answerReveal === newValue
            ? prev
            : { ...prev, answerReveal: newValue }
    );
};

export const updateShuffleQuestionsAndOptions = ({
    shuffleQuestions,
    shuffleOptions,
}: Pick<
    Partial<QuizGameSettings>,
    "shuffleQuestions" | "shuffleOptions"
>) => {
    updateQuizSettings((prev) => {
        const nextQuestions = shuffleQuestions ?? prev.shuffleQuestions;
        const nextOptions = shuffleOptions ?? prev.shuffleOptions;

        if (
            nextQuestions === prev.shuffleQuestions &&
            nextOptions === prev.shuffleOptions
        ) return prev;

        return {
            ...prev,
            shuffleQuestions: nextQuestions,
            shuffleOptions: nextOptions,
        };
    });
};

const updateLifelinesEnabled = (enabled: boolean) => {
    updateQuizSettings((prev) => {
        if (prev.lifelines.enabled === enabled) return prev;

        return {
            ...prev,
            lifelines: {
                ...prev.lifelines,
                enabled,
            },
        };
    });
};

export const enableLifelines = () => updateLifelinesEnabled(true);

export const disableLifelines = () => updateLifelinesEnabled(false);


export const updateLifelines = ({ maxUses }: Pick<LifelineSettings, "maxUses">) => {
    updateQuizSettings((prev) => {
        if (prev.lifelines.maxUses === maxUses) return prev;

        return {
            ...prev,
            lifelines: {
                ...prev.lifelines,
                maxUses,
            },
        };
    });
};