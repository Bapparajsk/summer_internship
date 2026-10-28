import { create } from 'zustand';

type QuizTimerStore = {
    timeLeft: number;
    isRunning: boolean;
};

export const useQuizTimerStore =
    create<QuizTimerStore>(() => ({
        timeLeft: 300, // 5 min
        isRunning: false,
    }));

/**
 * Actions
 */

export const start = () =>
    useQuizTimerStore.setState({ isRunning: true });

export const stop = () =>
    useQuizTimerStore.setState({ isRunning: false });

export const addTime = (seconds: number) =>
    useQuizTimerStore.setState((state) => ({
        timeLeft: state.timeLeft + seconds,
    }));

export const reset = (seconds: number) =>
    useQuizTimerStore.setState({
        timeLeft: seconds,
        isRunning: false,
    });

export const tick = () =>
    useQuizTimerStore.setState((state) => ({
        timeLeft: Math.max(state.timeLeft - 1, 0),
    }));