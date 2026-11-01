import { useEffect } from "react";
import { CloseButton as Button } from "@/components/ui/button";
import { useToggleFeedback } from "@/hooks/useToggleFeedback";
import { roomEvents } from "@/events/roomEvents";

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
    const { trigger, active } = useToggleFeedback();

    useEffect(() => {
        return roomEvents.subscribe(
            "settingsChanged",
            trigger
        );
    }, [trigger]);

    return (
        <Button
            isSaved={!active}
            onPress={onClose}
        />
    );
};