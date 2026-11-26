import { useState } from 'react';
import { Modal, Text, TextInput, View } from 'react-native';
import { useUser as useClerkUser } from '@clerk/expo';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { PressableFeedback } from 'heroui-native';

import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';
import type { UpdateUserInput } from '@/types/user';

import { Container } from '../container';
import { ProfileInfoField } from './infoField';
import { EngineeringRoles } from './engineeringRoles';

type UpdateOperation = 'description' | 'role';
const DESCRIPTION_MAX_LENGTH = 100;

export const PersonalInformationSection = () => {
    const { data: user, isLoading, isError } = useUser();
    const { user: clerkUser, isLoaded: isClerkUserLoaded } = useClerkUser();
    const updateUser = useUpdateUser();

    const [isDescriptionEditorOpen, setIsDescriptionEditorOpen] = useState(false);
    const [descriptionDraft, setDescriptionDraft] = useState('');
    const [savingOperation, setSavingOperation] = useState<UpdateOperation | null>(null);
    const [saveError, setSaveError] = useState<UpdateOperation | null>(null);

    const submitUpdate = (
        operation: UpdateOperation,
        input: UpdateUserInput,
        onSuccess?: () => void,
    ) => {
        setSavingOperation(operation);
        setSaveError(null);
        updateUser.mutate(input, {
            onSuccess: () => {
                setSavingOperation(null);
                onSuccess?.();
            },
            onError: () => {
                setSavingOperation(null);
                setSaveError(operation);
            },
        });
    };

    const handleRoleChange = (engineeringRoll: string) => {
        if (!user || savingOperation) return;

        submitUpdate('role', {
            academic_information: { engineering_roll: engineeringRoll },
        });
    };

    const openDescriptionEditor = () => {
        setDescriptionDraft(user?.description ?? '');
        setSaveError(null);
        setIsDescriptionEditorOpen(true);
    };

    const saveDescription = () => {
        if (!user || savingOperation) return;

        const description = descriptionDraft.trim();
        submitUpdate(
            'description',
            { description: description || null },
            () => setIsDescriptionEditorOpen(false),
        );
    };

    return (
        <>
            <Container title='Personal Information'>
                <View className='gap-3 p-3'>
                    <ProfileInfoField
                        label="Full Name"
                        value={
                            isClerkUserLoaded
                                ? clerkUser?.fullName ?? 'Not provided'
                                : 'Loading...'
                        }
                        isButton={false}
                        icon={<FontAwesome5 name="user-circle" size={18} color="#8FA5B8" />}
                    />

                    <EngineeringRoles
                        value={user?.academic_information?.engineering_roll}
                        isLoading={isLoading}
                        isDisabled={!user || savingOperation !== null}
                        onChange={handleRoleChange}
                    />
                    {saveError === 'role' ? (
                        <View className="flex-row items-center gap-1">
                            <MaterialIcons name="error-outline" size={13} color="#F87171" />
                            <Text className="font-poppins-medium text-[10px] text-danger">
                                Could not save engineering role. Please try again.
                            </Text>
                        </View>
                    ) : null}

                    <ProfileInfoField
                        label="Description"
                        value={isLoading ? 'Loading...' : user ? user.description ?? '' : undefined}
                        showWordCount={!isLoading && !!user}
                        maxCount={DESCRIPTION_MAX_LENGTH}
                        isButton={!isLoading && !!user && savingOperation === null}
                        onPress={openDescriptionEditor}
                        endIcon={
                            user ? (
                                <MaterialIcons name="edit" size={15} color="#8FA5B8" />
                            ) : null
                        }
                    />
                    {isError && !user ? (
                        <View className="flex-row items-center gap-1">
                            <MaterialIcons name="error-outline" size={13} color="#F87171" />
                            <Text className="font-poppins-medium text-[10px] text-danger">
                                Could not load personal information
                            </Text>
                        </View>
                    ) : null}
                    {saveError === 'description' && !isDescriptionEditorOpen ? (
                        <View className="flex-row items-center gap-1">
                            <MaterialIcons name="error-outline" size={13} color="#F87171" />
                            <Text className="font-poppins-medium text-[10px] text-danger">
                                Could not save description. Please try again.
                            </Text>
                        </View>
                    ) : null}
                </View>
            </Container>

            <Modal
                visible={isDescriptionEditorOpen}
                transparent
                animationType="slide"
                onRequestClose={() => {
                    if (savingOperation !== 'description') {
                        setIsDescriptionEditorOpen(false);
                    }
                }}
            >
                <View className="flex-1 justify-end bg-black/60">
                    <View className="rounded-t-[28px] border border-border bg-surface-container-low p-5">
                        <View className="mb-4 flex-row items-center justify-between">
                            <Text className="font-poppins-semibold text-base text-text-primary">
                                Edit description
                            </Text>
                            <PressableFeedback
                                accessibilityRole="button"
                                accessibilityLabel="Close description editor"
                                isDisabled={savingOperation === 'description'}
                                onPress={() => setIsDescriptionEditorOpen(false)}
                                className="size-9 items-center justify-center rounded-full bg-white/5"
                            >
                                <MaterialIcons name="close" size={18} color="#8FA5B8" />
                            </PressableFeedback>
                        </View>

                        <TextInput
                            value={descriptionDraft}
                            onChangeText={setDescriptionDraft}
                            maxLength={DESCRIPTION_MAX_LENGTH}
                            multiline
                            textAlignVertical="top"
                            placeholder="Tell people a little about yourself"
                            placeholderTextColor="#718096"
                            className="min-h-32 rounded-2xl border border-border bg-white/5 px-3 py-3 font-poppins-medium text-sm text-text-primary"
                        />
                        <Text className="mt-1 self-end font-poppins-medium text-[10px] text-text-tertiary">
                            {descriptionDraft.length} / {DESCRIPTION_MAX_LENGTH}
                        </Text>

                        {saveError === 'description' ? (
                            <View className="mt-2 flex-row items-center gap-1">
                                <MaterialIcons name="error-outline" size={13} color="#F87171" />
                                <Text className="font-poppins-medium text-[10px] text-danger">
                                    Could not save description. Please try again.
                                </Text>
                            </View>
                        ) : null}

                        <PressableFeedback
                            accessibilityRole="button"
                            isDisabled={savingOperation !== null}
                            onPress={saveDescription}
                            className="mt-4 items-center rounded-full bg-primary px-4 py-3"
                        >
                            <Text className="font-poppins-semibold text-xs text-white">
                                {savingOperation === 'description' ? 'Saving...' : 'Save description'}
                            </Text>
                        </PressableFeedback>
                    </View>
                </View>
            </Modal>
        </>
    );
}