import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Chip, Switch } from 'heroui-native'
import Animated, { ZoomIn } from 'react-native-reanimated'
import { disableLifelines, enableLifelines, useQuizSettingsStore } from '@/store/quiz/settingStore'

export const Header = () => {

    const enabled = useQuizSettingsStore((state) => state.lifelines.enabled);
    
    const handelToggle = (value: boolean) => {
        if (value) {
            enableLifelines();
        } else {
            disableLifelines();
        }
    }

    return (
        <View className="flex-row items-center gap-3">
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                <Ionicons name="sparkles-outline" size={21} color="#5CC6E2" />
            </View>

            <View className="min-w-0 flex-1">
                <View className="flex-row flex-wrap items-center gap-2">
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        50/50 Lifeline
                    </Text>
                    <Chip variant="soft" size="sm">
                        <Chip.Label className="text-[10px] leading-normal font-poppins-semibold">POWER-UP</Chip.Label>
                    </Chip>
                </View>
                <Text className="text-[10px] font-poppins-medium leading-4 text-text-secondary">
                    Remove two incorrect answers during a question.
                </Text>
            </View>

            <Switch
                isSelected={enabled}
                onSelectedChange={handelToggle}
                className="w-14 h-[28px]"
                animation={{
                    backgroundColor: {
                        value: ['#172554', '#5CC6E2'],
                    },
                }}
            >
                <Switch.Thumb
                    className="size-5.5"
                    animation={{
                        left: {
                            value: 4,
                            springConfig: {
                                damping: 30,
                                stiffness: 300,
                                mass: 1,
                            },
                        },
                    }}
                />
                <Switch.EndContent className="mr-1.75">
                    {enabled && (
                        <Animated.View key="moon" entering={ZoomIn.springify()}>
                            <MaterialCommunityIcons name="key-star" size={12} color="black" />
                        </Animated.View>
                    )}
                </Switch.EndContent>
            </Switch>
        </View>
    )
}