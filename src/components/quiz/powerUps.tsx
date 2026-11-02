import { Octicons } from '@expo/vector-icons';
import { cn, PressableFeedback } from 'heroui-native';
import { Text, View } from 'react-native';
import { useQuizSettingsStore, usedLifeline } from '@/store/quiz/settingStore';
import { roomEvents } from '@/events/roomEvents';
import { memo } from 'react';
import { useQuizNavigationStore } from '@/store/quiz';

const PowerUpDots = memo(({ isDisabled }: { isDisabled: boolean }) => {

    const maxUses = useQuizSettingsStore(
        state => state.lifelines.maxUses
    );

    const usedCount = useQuizSettingsStore(
        state => state.lifelines.usedCount
    );

    const remainingCount = maxUses - usedCount;

    return (
        <View className="absolute -bottom-1 left-0 right-0 flex-row items-center justify-center gap-x-1">
            {Array.from({ length: remainingCount }).map((_, index) => (
                <View key={index} className={cn("size-2 rounded-full bg-success", isDisabled && "bg-[#ffffff38]")} />
            ))}
        </View>
    )
});

PowerUpDots.displayName = "PowerUpDots";

const isUsedPowerSet = new Set<string>();

export const QuizPowerUps = memo(() => {


    const lifelineSettings = useQuizSettingsStore( state => state.lifelines );
    const usedCount = useQuizSettingsStore( state => state.lifelines.usedCount );

    const currentQuestionIndex = useQuizNavigationStore(state => state.currentQuestionIndex);

    const handleLifelineUsed = () => {
        const isUsed = usedLifeline();

        if (isUsed) {
            roomEvents.emit("lifelineUsed", `quiz-${currentQuestionIndex}`);
            isUsedPowerSet.add(`quiz-${currentQuestionIndex}`);
        }
    };

    if (!lifelineSettings.enabled) {
        return null;
    }

    const isDisabled = usedCount === lifelineSettings.maxUses || isUsedPowerSet.has(`quiz-${currentQuestionIndex}`);

    return (
        <View className="relative">
            <PressableFeedback
                hitSlop={10}
                animation={isDisabled ? "disable-all" : undefined}
                isDisabled={isDisabled}

                className={cn("flex-row items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2",
                    {
                        "-scale-70 bg-white/4 border-border": isDisabled
                    }
                )}
                
                onPress={handleLifelineUsed}
            >
                <Octicons name="zap" size={14} color={isDisabled ? "#ffffff38" : "#22D3EE"} />
                <Text className={cn("ml-1 text-xs font-poppins-semibold text-cyan-400",
                    {"text-text-disabled": isDisabled}
                )}>
                    50/50
                </Text>
            </PressableFeedback>
            <PowerUpDots isDisabled={isDisabled} />
        </View>
    );
});

QuizPowerUps.displayName = "QuizPowerUps";