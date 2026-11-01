import { memo } from 'react'
import { cn, Tabs } from 'heroui-native';
import { updateLifelines, useQuizSettingsStore } from '@/store/quiz/settingStore';
import { LifelineSettings } from '@/store/quiz/type.settingStore';
import { Text, View } from 'react-native';

const LIFE_LINE = [1, 2, 3, 4, 5];

export const Options = memo(() => {

    const maxUses = useQuizSettingsStore((state) => state.lifelines.maxUses);

    return (
        <View>
            <View className="mb-2 flex-row items-center justify-between">
                <Text className="font-poppins-medium text-sm text-text-primary">
                    Uses per player
                </Text>
                <Text className="text-[10px] font-poppins-semibold text-primary">
                    {maxUses} {maxUses === 1 ? "use" : "uses"}
                </Text>
            </View>
            <Tabs value={String(maxUses)} onValueChange={(value) => {
                const parsedValue = parseInt(value, 10);
                updateLifelines({ maxUses: parsedValue as LifelineSettings["maxUses"] });
            }}>
                <Tabs.List className="w-full gap-0 bg-primary-soft border border-primary-border">
                    <Tabs.Indicator className="bg-primary" />
                    {LIFE_LINE.map((item) => (<Tabs.Trigger key={`waiting-room-setting-lifeline-${item}`} value={String(item)} className="w-1/5">
                        {({ isSelected }) => (
                            <Tabs.Label className={cn("font-poppins-medium text-sm", isSelected && "text-black")}>{item}</Tabs.Label>
                        )}
                    </Tabs.Trigger>
                    ))}
                </Tabs.List>
            </Tabs>
        </View>

    )
});

Options.displayName = "WaitingRoomLifelineOptions";