import { BottomSheet } from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { MotionButton } from '@/components/ui/button/motionButton';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { RoomSecurityCard } from './roomSecurityCard';
import { AnswerRevealTimingCard } from './answerRevealTimingCard';
import { LifelineCard } from './lifeline/lifelineCard';
import { CloseButton } from '@/components/ui/button';
import { RandomizationSettings } from './randomization/randomizationSettings';


export const SettingButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
            <BottomSheet.Trigger asChild>
                <MotionButton
                    className='size-10'
                    accessibilityLabel="setting"
                >
                    <Entypo name="list" size={16} color="white" />
                </MotionButton>
            </BottomSheet.Trigger>
            <BottomSheet.Portal >
                <BottomSheet.Overlay />
                <BottomSheet.Content
                    snapPoints={['90%']}
                    enableOverDrag={false}
                    enableDynamicSizing={false}
                    contentContainerClassName="h-full px-3"
                >
                    <View className='w-full flex-row items-center justify-between'>
                        <View className='flex-row gap-1 items-center'>
                            <Ionicons name="cog" size={18} color="white" />
                            <Text className='text-text-primary font-poppins-medium text-base'>
                                Room Setting
                            </Text>
                        </View>
                        <CloseButton isSaved={false} />
                    </View>
                    <BottomSheetScrollView className={"mt-3"} contentContainerClassName={"gap-y-3"} showsVerticalScrollIndicator={false}>
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
                    </BottomSheetScrollView>
                </BottomSheet.Content>
            </BottomSheet.Portal>
        </BottomSheet>
    );
}
