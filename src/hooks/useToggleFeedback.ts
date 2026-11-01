import { useCallback, useEffect, useRef, useState } from "react";

type UseToggleFeedbackOptions = {
    resetDelay?: number;
};

export function useToggleFeedback({
    resetDelay = 3000,
}: UseToggleFeedbackOptions = {}) {
    const [active, setActive] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const reset = useCallback(() => {
        clearTimer();
        setActive(false);
    }, [clearTimer]);

    const trigger = useCallback(() => {
        clearTimer();
        setActive(true);

        timerRef.current = setTimeout(() => {
            setActive(false);
            timerRef.current = null;
        }, resetDelay);
    }, [clearTimer, resetDelay]);

    useEffect(() => {
        return clearTimer;
    }, [clearTimer]);

    return {
        active,
        setActive,
        trigger,
        reset,
    };
}