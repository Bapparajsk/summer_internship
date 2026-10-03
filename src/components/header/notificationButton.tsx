import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Fontisto } from '../lib/icon'
import { BottomSheet, PressableFeedback } from 'heroui-native'
import { useState } from 'react';
import { Text, View } from 'react-native'
import { NotificationList } from '../notification';

export const NotificationButton = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (

        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
            <BottomSheet.Trigger asChild>
                <PressableFeedback
                    className="h-15 w-15 items-center justify-center rounded-full bg-white/10 border-border border"
                    accessibilityRole="button"
                    accessibilityLabel="Notifications"
                >
                    <Fontisto
                        name="bell"
                        size={21}
                        color="white"
                    />

                    <View className="absolute right-5.25 top-4.75 h-2 w-2 rounded-full bg-primary" />
                </PressableFeedback>
            </BottomSheet.Trigger>
            <BottomSheet.Portal>
                <BottomSheet.Overlay />
                <BottomSheet.Content
                    snapPoints={["97%"]}
                    enableOverDrag={false}
                    enableDynamicSizing={false}
                    contentContainerClassName="h-full"
                >
                    <View className="flex-row items-center justify-between px-4 py-3">
                        <View className="flex-row items-center gap-2">
                            <Fontisto
                                name="bell"
                                size={18}
                                color="#8FA5B8"
                            />
                            <View>
                                <Text className="font-poppins-semibold text-sm text-text-primary">
                                    Notifications
                                </Text>
                                <Text className="font-poppins-light text-[10px] text-text-tertiary">
                                    You have 3 new notifications
                                </Text>
                            </View>
                        </View>
                    </View>
                    <BottomSheetScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <NotificationList
                            onNotificationPress={(notification) => {
                                console.log("notification:", notification.id);
                            }}
                        />
                    </BottomSheetScrollView>
                </BottomSheet.Content>
            </BottomSheet.Portal>
        </BottomSheet>
    )
}
