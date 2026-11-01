import { useEffect } from "react";
import { CloseButton as Button } from "@/components/ui/button";
import { useToggleFeedback } from "@/hooks/useToggleFeedback";
import { roomSettingEvents } from "@/events/roomSettingEvents";

export const CloseButton = ({ onClose }: { onClose: () => void }) => {
    const { trigger, active } = useToggleFeedback();

    useEffect(() => {
        return roomSettingEvents.subscribe(
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