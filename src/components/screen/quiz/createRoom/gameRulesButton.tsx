import { Text, View } from 'react-native';
import Animated, {
    LinearTransition,
} from 'react-native-reanimated';
import {
    ChevronDown,
    Clock3,
    Gamepad2,
    Shuffle,
    Trophy,
} from 'lucide-react-native';
import { BottomSheet, PressableFeedback, Separator } from 'heroui-native';
import { useState } from 'react';
import { ScoringSettings } from './scoringSettings';
import { TimingScoringSection } from './timingScoringSection';

type Props = {
    timeLimit: number;
    points: number;
    shuffleAnswers: boolean;
};

export const GameRulesButton = ({
    timeLimit,
    points,
    shuffleAnswers,
}: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    // negativeMarking: boolean;
    // penalty: number;
    // showCorrectAnswer: boolean;
    // shuffleAnswers: boolean;

    const [negativeMarking, setNegativeMarking] = useState(false);
    const [penalty, setPenalty] = useState(0);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);



    return (
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
            <BottomSheet.Trigger asChild>
                <PressableFeedback
                    accessibilityRole="button"
                >
                    <View className='p-3 border border-border bg-white/6 rounded-4xl'>
                        <View className="flex-row items-center gap-3">
                            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                                <Gamepad2 size={20} color="#5CC6E2" />
                            </View>

                            <View className="flex-1 gap-0.5">
                                <Text className="font-poppins-semibold text-sm text-text-primary">
                                    Game rules & timers
                                </Text>
                                <Text className="font-poppins-medium text-[10px] text-text-secondary">
                                    Customize the quiz experience
                                </Text>
                            </View>

                            <View className="rounded-full bg-surface-container-high px-2 py-1">
                                <Text className="font-poppins-medium text-[10px] text-text-secondary">
                                    Settings
                                </Text>
                            </View>

                            <Animated.View
                                layout={LinearTransition.duration(200)}
                                style={{
                                    transform: [{ rotate: isOpen ? '180deg' : '0deg' }],
                                }}
                            >
                                <ChevronDown size={19} color="#8A929D" />
                            </Animated.View>
                        </View>
                        <Separator className='my-2' />
                        <View className="flex-row flex-wrap items-center gap-x-2 gap-y-2">
                            <SummaryItem
                                Icon={Clock3}
                                label={`${timeLimit}s / question`}
                            />
                            <Separator orientation="vertical" />
                            <SummaryItem
                                Icon={Trophy}
                                label={`${points} points`}
                            />
                            <Separator orientation="vertical" />
                            <SummaryItem
                                Icon={Shuffle}
                                label={shuffleAnswers ? 'Shuffle answers' : 'Fixed answers'}
                            />
                        </View>
                    </View>
                </PressableFeedback>
            </BottomSheet.Trigger>
            <BottomSheet.Portal>
                <BottomSheet.Overlay className='bg-black/60' />
                <BottomSheet.Content
                    snapPoints={["75%"]}
                >
                    <View className="gap-1 mb-1">
                        <Text className="font-poppins-semibold text-sm text-text-primary">
                            Scoring & answer settings
                        </Text>
                        <Text className="font-poppins-light text-xs text-text-secondary">
                            Control scoring rules and answer presentation.
                        </Text>
                    </View>
                    <Separator className='my-3'/>
                    <TimingScoringSection
                        baseScore={100}
                        timePerQuestion={20}
                        onTimeChange={(value) => {
                            console.log(value)
                        }}
                    />
                    <ScoringSettings
                        negativeMarking={negativeMarking}
                        penalty={penalty}
                        showCorrectAnswer={showCorrectAnswer}
                        shuffleAnswers={shuffleAnswers}

                        onNegativeMarkingChange={setNegativeMarking}
                        onPenaltyChange={setPenalty}
                        onShowCorrectAnswerChange={setShowCorrectAnswer}
                        onShuffleAnswersChange={() => { }}

                    />

                </BottomSheet.Content>
            </BottomSheet.Portal>
        </BottomSheet>
    );
};

const SummaryItem = ({
    Icon,
    label,
}: {
    Icon: typeof Clock3;
    label: string;
}) => (
    <View className="flex-row items-center gap-1">
        <Icon size={12} color="#8A929D" />
        <Text className="font-poppins-light text-[10px] text-text-secondary">
            {label}
        </Text>
    </View>
);
