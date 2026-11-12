import { View, Text } from 'react-native';
import { Users, Info } from 'lucide-react-native';
import { PressableFeedback } from 'heroui-native';

const PLAYER_LIMITS = [2, 4, 6, 8, 10, 12, 16] as const;

type Props = {
    value: number;
    onChange: (value: number) => void;
};

export const ParticipantsSection = ({ value, onChange }: Props) => {
    return (
        <View className="gap-3">
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                    <Users size={20} color="#5CC6E2" />
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Participants
                    </Text>
                </View>

                <View className="rounded-full bg-primary-soft px-2.5 py-1">
                    <Text className="text-[10px] font-poppins-semibold text-primary">
                        {value} Max
                    </Text>
                </View>
            </View>

            <Text className="text-xs leading-5 font-poppins-light text-text-secondary">
                Choose the maximum number of players for this session.
            </Text>

            {/* Capacity Selector */}
            <View className="flex-row flex-wrap gap-2">
                {PLAYER_LIMITS.map((limit) => {
                    const selected = value === limit;

                    return (
                        <PressableFeedback
                            key={limit}
                            onPress={() => onChange(limit)}
                            accessibilityRole="radio"
                            accessibilityState={{ checked: selected }}
                            className={`w-[23%] grow items-center justify-center rounded-xl border py-3 ${selected
                                    ? 'border-primary bg-primary-soft'
                                    : 'border-border bg-surface-container'
                                }`}
                        >
                            <Text
                                className={`font-poppins-semibold text-sm ${selected ? 'text-primary' : 'text-text-primary'}`}
                            >
                                {limit}
                            </Text>

                            <Text className="mt-0.5 text-[9px] font-poppins-medium text-text-tertiary">
                                Players
                            </Text>
                        </PressableFeedback>
                    );
                })}
            </View>

            {/* Helper */}
            <View className="flex-row items-center gap-1.5">
                <Info size={13} color="#8FA5B8" />
                <Text className="text-[10px] text-text-tertiary font-poppins-medium leading-normal">
                    You can&apos;t change this limit after created room .
                </Text>
            </View>
        </View>
    );
};