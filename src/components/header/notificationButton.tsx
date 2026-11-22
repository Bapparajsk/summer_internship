import { Fontisto } from '../lib/icon'
import { BottomSheet, type BottomSheetRef } from 'heroui-native'
import { Fragment, useRef } from 'react';
import { ScrollView, Text, View } from 'react-native'
import { NotificationList } from '../notification';
import { MotionButton } from '../ui/button/motionButton';

export const NotificationButton = () => {

    const sheetRef = useRef<BottomSheetRef>(null);

    return (
        <Fragment>
            <MotionButton
                accessibilityLabel="Notifications"
                onPress={() => sheetRef.current?.present()}
            >
                <Fontisto
                    name="bell"
                    size={18}
                    color="white"
                />

                <View className="absolute right-4.25 top-3.75 h-2 w-2 rounded-full bg-primary" />
            </MotionButton>

            <BottomSheet
                detents={[0.97]}
                draggable={false}
            >
                <BottomSheet.Content>
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
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <NotificationList
                            onNotificationPress={(notification) => {
                                console.log("notification:", notification.id);
                            }}
                        />
                    </ScrollView>
                </BottomSheet.Content>
            </BottomSheet>
        </Fragment>
    )
}
