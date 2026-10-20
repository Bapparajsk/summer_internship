import { BottomSheet } from 'heroui-native';
import { useState } from 'react';
import { Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo, Feather } from '@expo/vector-icons';
import { MotionButton } from '@/components/ui/button/motionButton';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearTransition } from 'react-native-reanimated';
import If from '@/components/lib/if';
import { RoomSecurityCard } from './roomSecurityCard';
import { AnswerRevealTimingCard } from './answerRevealTimingCard';
import { LifelineCard } from './lifelineCard';


export const SettingButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [isSave, setIsSave] = useState(true)

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
                        <CloseButton isSaved={isSave} />
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
                        <AnswerRevealTimingCard
                            initialMode="after-each"
                            onModeChange={(mode) => {
                                // Save the selected reveal timing
                                console.log("Answer reveal mode:", mode);
                            }}
                        />
                        <LifelineCard 

                        />
                    </BottomSheetScrollView>
                </BottomSheet.Content>
            </BottomSheet.Portal>
        </BottomSheet>
    );
}

function CloseButton({ isSaved }: { isSaved: boolean }) {
    return (
        <MotionButton
            layout={LinearTransition.springify().stiffness(200).mass(0.5).damping(20)}
            className='w-auto h-auto'
        >
            <If condition={isSaved}>
                <If.Then>
                    <View className='size-8 items-center justify-center'>
                        <Feather name={"x-circle"} size={16} color={"#8FA5B8"} />
                    </View>
                </If.Then>
                <If.Else>
                    <View className='h-8 flex-row items-center justify-center px-2 gap-1'>
                        <Feather name={"check-circle"} size={16} color={"#4ADE80"} />
                        <Text className='text-[10px] leading-normal font-poppins-medium text-success'>
                            Save changes
                        </Text>
                    </View>
                </If.Else>
            </If>

        </MotionButton>
    );
}