import { BottomSheet, type BottomSheetRef } from 'heroui-native';
import { useRef } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MotionButton } from '@/components/ui/button/motionButton';
import { RoomSecurityCard } from './roomSecurityCard';
import { AnswerRevealTimingCard } from './answerRevealTimingCard';
import { LifelineCard } from './lifeline/lifelineCard';
import { RandomizationSettings } from './randomization/randomizationSettings';
import { CloseButton } from './closeButton';


export const SettingButton = () => {
    const sheetRef = useRef<BottomSheetRef>(null);

    return (
        <>
            <MotionButton
                className='size-10'
                accessibilityLabel="setting"
                onPress={() => {
                    sheetRef.current?.present();
                }}
            >
                <Entypo name="list" size={16} color="white" />
            </MotionButton>
            <BottomSheet ref={sheetRef} detents={[0.9]}>
                <BottomSheet.Content className="h-full px-3">
                    <View className='w-full flex-row items-center justify-between'>
                        <View className='flex-row gap-1 items-center'>
                            <Ionicons name="cog" size={18} color="white" />
                            <Text className='text-text-primary font-poppins-medium text-base'>
                                Room Setting
                            </Text>
                        </View>
                        <CloseButton onClose={() => {
                            sheetRef.current?.dismiss();
                        }} />
                    </View>
                    <ScrollView className="mt-3" contentContainerClassName="gap-y-3" showsVerticalScrollIndicator={false}>
                        <RoomSecurityCard
                            roomCode="QF-82K9"
                            passkey='XP-7294'
                            initialEnabled
                            onEnabledChange={(enabled) => {
                                // Update your backend
                            }}
                        />
                        <AnswerRevealTimingCard/>
                        <LifelineCard />
                        <View className="mx-2 h-px bg-border-subtle" />
                        <RandomizationSettings />
                    </ScrollView>
                </BottomSheet.Content>
            </BottomSheet>
        </>
    );
}
