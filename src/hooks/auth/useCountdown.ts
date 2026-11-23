
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

export function useCountdown(initialSeconds: number) {
    const [endTime, setEndTime] = useState(
        () => Date.now() + initialSeconds * 1000
    );

    const [remaining, setRemaining] = useState(initialSeconds);

    const updateRemaining = useCallback(() => {
        const seconds = Math.max(
            0,
            Math.ceil((endTime - Date.now()) / 1000)
        );

        setRemaining(seconds);
    }, [endTime]);

    useEffect(() => {
        const interval = setInterval(updateRemaining, 1000);

        const subscription = AppState.addEventListener(
            "change",
            (state) => {
                if (state === "active") updateRemaining();
            }
        );

        return () => {
            clearInterval(interval);
            subscription.remove();
        };
    }, [updateRemaining]);

    const reset = useCallback((seconds = initialSeconds) => {
        setEndTime(Date.now() + seconds * 1000);
    }, [initialSeconds]);

    return {
        remaining,
        isComplete: remaining === 0,
        reset,
    };
}
