import { Text, View } from 'react-native';
import { ListOrdered, Shuffle } from 'lucide-react-native';
import { cn, Tabs } from 'heroui-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

export type QuestionOrder = 'randomized' | 'sequential';

type Props = {
    value: QuestionOrder;
    onChange: (value: QuestionOrder) => void;
};

const OPTIONS = [
    {
        value: 'randomized',
        label: 'Randomized',
        Icon: Shuffle,
    },
    {
        value: 'sequential',
        label: 'Sequential',
        Icon: ListOrdered,
    },
] as const;

const AnimatedContentContainer = ({
    children,
}: {
    children: string;
}) => (
    <Animated.View
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(200)}
    >
        <View className="flex-row items-center gap-2">
            <View className="h-5 w-5 rounded-full bg-primary-soft items-center justify-center">
                <Text className="text-primary text-[10px]">i</Text>
            </View>

            <Text className="flex-1 text-[11px] font-poppins-medium text-text-secondary">
                {children}
            </Text>
        </View>
        
    </Animated.View>
);

export const QuestionOrderSection = ({
    value,
    onChange,
}: Props) => {

    return (
        <View className="rounded-4xl bg-white/7 border border-border p-3 gap-3">
            <View className="gap-1">
                <Text className="font-poppins-medium text-sm text-text-primary">
                    Question order
                </Text>

                <Text className="font-poppins-medium text-xs text-text-secondary">
                    Choose how questions appear to players.
                </Text>
            </View>
            <Tabs value={value} onValueChange={(item) => onChange(item as any)} variant="primary">
                <Tabs.List className='gap-0'>
                    <Tabs.ScrollView>
                        <Tabs.Indicator />
                        {OPTIONS.map(item => (
                            <Tabs.Trigger className='w-1/2' value={item.value} key={item.value}>
                                {({ isSelected }) => (
                                    <>
                                        <item.Icon
                                            size={12}
                                            color={isSelected ? '#5CC6E2' : '#8A929D'}
                                        />
                                        <Tabs.Label
                                            className={cn("text-xs font-poppins-semibold", isSelected ? 'text-primary' : 'text-text-secondary')}
                                        >
                                            {item.label}
                                        </Tabs.Label>
                                    </>
                                )}
                            </Tabs.Trigger>
                        ))}

                    </Tabs.ScrollView>
                </Tabs.List>
                <Animated.View
                    layout={LinearTransition.duration(200)}
                    className="px-4 py-6 border border-border rounded-xl"
                >
                    <Tabs.Content value="randomized">
                        <AnimatedContentContainer>
                            Each player gets the same questions in a shuffled order.
                        </AnimatedContentContainer>
                    </Tabs.Content>
                    <Tabs.Content value="sequential">
                        <AnimatedContentContainer>
                            Every player gets questions in the original order.
                        </AnimatedContentContainer>
                    </Tabs.Content>
                </Animated.View>
            </Tabs>
        </View>
    );
};