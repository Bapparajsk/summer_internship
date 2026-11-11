import { BottomSheet, PressableFeedback, Separator } from 'heroui-native';
import { View, Text } from 'react-native'
import { AvatarPreview } from './avatarPreview';
import { getEmoji, PROFILE_EMOJIS, ProfileEmojiName } from '../../profile/emoji';
import { useState } from 'react';
import { CloseButton } from '@/components/ui/button';

export const BottomSheetContent = () => {

    const [selectedEmoji, setSelectedEmoji] = useState<ProfileEmojiName>("bear");
    const [newEmoji, setNewEmoji] = useState<ProfileEmojiName | undefined>(undefined)
    const [isSaves, setIsSaves] = useState(true);

    const handelChangeEmoji = (name: ProfileEmojiName) => {
        if (name === selectedEmoji) {
            setNewEmoji(undefined);
            setIsSaves(true);
            return;
        }

        setNewEmoji(name);
        setIsSaves(false);
    };

    return (
        <BottomSheet.Content>
            <View className='flex-1 flex-row items-center justify-between'>
                <View>
                    <BottomSheet.Title className='font-poppins-semibold text-text-primary'>
                        Choose your avatar
                    </BottomSheet.Title>
                    <BottomSheet.Description className='text-xs font-poppins-medium text-text-secondary'>
                        Make your QuizFlow profile yours.
                    </BottomSheet.Description>
                </View>
                <CloseButton
                    isSaved={isSaves}
                    saveTitle='Change Avatar'
                />
            </View>
            <AvatarPreview
                emojiName={newEmoji ?? selectedEmoji}
            />
            <Separator />
            <View className='flex-1 flex-row flex-wrap gap-1 mt-3'>
                {Object.keys(PROFILE_EMOJIS).map((name) => {
                    const { emoji, background } = getEmoji(name as ProfileEmojiName);
                    return (
                        <PressableFeedback
                            className="rounded-[24px]" key={`profile-emoji-list-${emoji}`}
                            onPress={() => {
                                handelChangeEmoji(name as ProfileEmojiName)
                            }}
                        >
                            <View className='size-15 rounded-[24px] items-center justify-center' style={{ backgroundColor: background }}>
                                <Text className='text-2xl'>
                                    {emoji}
                                </Text>
                            </View>
                        </PressableFeedback>
                    );
                })}
            </View>
        </BottomSheet.Content>
    )
}
