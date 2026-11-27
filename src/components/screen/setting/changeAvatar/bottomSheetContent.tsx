import { BottomSheet, PressableFeedback, Separator } from 'heroui-native';
import { View, Text } from 'react-native';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { AvatarPreview } from './avatarPreview';
import { getEmoji, PROFILE_EMOJIS, ProfileEmojiName } from '../../profile/emoji';
import { useState } from 'react';
import { CloseButton } from '@/components/ui/button';
import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';

export const BottomSheetContent = () => {
    const { data: user, isLoading, isError } = useUser();
    const updateUser = useUpdateUser();
    const [selectedEmoji, setSelectedEmoji] = useState<ProfileEmojiName | null>(null);

    const displayedEmoji = selectedEmoji ?? user?.avatar ?? 'bear';
    const hasChanges = Boolean(user && selectedEmoji && selectedEmoji !== user.avatar);

    const handleChangeEmoji = (name: ProfileEmojiName) => {
        if (!user || updateUser.isPending) return;
        setSelectedEmoji(name === user.avatar ? null : name);
        updateUser.reset();
    };

    const handleSaveEmoji = () => {
        if (!user || !hasChanges || !selectedEmoji || updateUser.isPending) return;

        updateUser.mutate(
            { avatar: selectedEmoji },
            {
                onSuccess: () => setSelectedEmoji(null),
            },
        );
    };

    return (
        <BottomSheet.Content>
            <BottomSheet.Header>
                <View className="flex-row items-center justify-between">
                    <View>
                        <BottomSheet.Title className="font-poppins-semibold text-text-primary">
                            Choose your avatar
                        </BottomSheet.Title>
                        <BottomSheet.Description className="text-xs font-poppins-medium text-text-secondary">
                            Make your QuizFlow profile yours.
                        </BottomSheet.Description>
                    </View>
                    <CloseButton
                        isSaved={!hasChanges}
                        isDisabled={!hasChanges || updateUser.isPending}
                        saveTitle={updateUser.isPending ? 'Saving...' : 'Change'}
                        icon={<Entypo name="emoji-happy" size={16} color={"#4ADE80"} />}
                        onPress={handleSaveEmoji}
                    />
                </View>
            </BottomSheet.Header>
            {isLoading ? (
                <Text className="py-2 text-center font-poppins-medium text-xs text-text-tertiary">
                    Loading your profile...
                </Text>
            ) : null}
            {isError && !user ? (
                <View className="flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text
                        accessibilityRole="alert"
                        className="font-poppins-medium text-[10px] text-danger"
                    >
                        Could not load your profile. Please try again.
                    </Text>
                </View>
            ) : null}
            {updateUser.isError ? (
                <View className="flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text
                        accessibilityRole="alert"
                        className="font-poppins-medium text-[10px] text-danger"
                    >
                        Could not save your avatar. Please try again.
                    </Text>
                </View>
            ) : null}
            <AvatarPreview emojiName={displayedEmoji} />
            <Separator />
            <View className="mt-3 flex-1 flex-row flex-wrap gap-1">
                {Object.keys(PROFILE_EMOJIS).map((name) => {
                    const { emoji, background } = getEmoji(name as ProfileEmojiName);
                    return (
                        <PressableFeedback
                            className="rounded-[24px]"
                            key={`profile-emoji-list-${emoji}`}
                            isDisabled={!user || updateUser.isPending}
                            onPress={() => handleChangeEmoji(name as ProfileEmojiName)}
                        >
                            <View
                                className="size-15 items-center justify-center rounded-[24px]"
                                style={{
                                    backgroundColor: background,
                                    borderWidth: name === displayedEmoji ? 2 : 0,
                                    borderColor: '#4ADE80',
                                }}
                            >
                                <Text className="text-2xl">
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
