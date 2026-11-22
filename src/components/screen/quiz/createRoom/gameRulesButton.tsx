import { ScrollView, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { BottomSheet, PressableFeedback, Separator, type BottomSheetRef } from 'heroui-native';
import { ReactNode, useRef, useState } from 'react';
import { ScoringSettings } from './scoringSettings';
import { TimingScoringSection } from './timingScoringSection';
import { Entypo, Feather, FontAwesome6, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';

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
    const sheetRef = useRef<BottomSheetRef>(null);

    const [negativeMarking, setNegativeMarking] = useState(false);
    const [penalty, setPenalty] = useState(5);
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);



    return (
        <>
            <PressableFeedback
                accessibilityRole="button"
                onPress={() => {
                    setIsOpen(true);
                    sheetRef.current?.present();
                }}
            >
                    <View className='p-3 border border-border bg-white/6 rounded-3xl'>
                        <View className="flex-row items-center gap-3">
                            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                                <MaterialCommunityIcons name="gamepad-variant-outline" size={20} color="#5CC6E2" />
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
                                <Entypo name="chevron-down" size={19} color="#8A929D" />
                            </Animated.View>
                        </View>
                        <Separator className='my-2' />
                        <View className="flex-row flex-wrap items-center gap-x-2 gap-y-2">
                            <SummaryItem
                                // iconName={"clock"}
                                icon={<Feather name="clock" size={12} color="#8A929D" />}
                                label={`${timeLimit}s / question`}
                            />
                            <Separator orientation="vertical" />
                            <SummaryItem
                                icon={<Octicons name="trophy" size={12} color="#8A929D" />}
                                label={`${points} points`}
                            />
                            <Separator orientation="vertical" />
                            <SummaryItem
                                icon={<FontAwesome6 name="shuffle" size={12} color="#8A929D" />}
                                label={shuffleAnswers ? 'Shuffle answers' : 'Fixed answers'}
                            />
                        </View>
                    </View>
            </PressableFeedback>
            <BottomSheet
                ref={sheetRef}
                detents={[0.55, 0.95]}
                onDidDismiss={() => setIsOpen(false)}
            >
                <BottomSheet.Content className="h-full">
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <View className="gap-1 mb-1">
                            <Text className="font-poppins-semibold text-sm text-text-primary">
                                Scoring & answer settings
                            </Text>
                            <Text className="font-poppins-light text-xs text-text-secondary">
                                Control scoring rules and answer presentation.
                            </Text>
                        </View>
                        <Separator className='my-3' />
                        <TimingScoringSection
                            baseScore={100}
                            timePerQuestion={20}
                            onTimeChange={(value) => {
                                console.log(value)
                            }}
                        />
                        <Separator />
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
                    </ScrollView>
                </BottomSheet.Content>
            </BottomSheet>
        </>
    );
};

const SummaryItem = ({
    icon,
    label,
}: {
    label: string;
    icon: ReactNode
}) => (
    <View className="flex-row items-center gap-1">
        {icon}
        <Text className="font-poppins-light text-[10px] text-text-secondary">
            {label}
        </Text>
    </View>
);
