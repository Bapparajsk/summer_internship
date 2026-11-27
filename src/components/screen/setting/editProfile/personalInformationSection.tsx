import { useState } from 'react';
import { Text, View } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';
import type { UpdateUserInput } from '@/types/user';

import { Container } from '../container';
import { ProfileInfoField } from './infoField';
import { EngineeringRoles } from './engineeringRoles';
import { Button } from 'heroui-native';
import If from '@/components/lib/if';
import { UserNameEdit } from './userNameEdit';

type UpdateOperation = 'description' | 'role';
const DESCRIPTION_MAX_LENGTH = 100;

export const PersonalInformationSection = () => {
    const { data: user, isLoading, isError } = useUser();
    
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

    const handleRoleChange = (engineeringRole: string) => {
        if (!user || savingOperation) return;

        submitUpdate('role', {
            academic_information: { engineering_roll: engineeringRole },
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
        if (description === (user.description ?? '').trim()) {
            setIsDescriptionEditorOpen(false);
            return;
        }

        submitUpdate(
            'description',
            { description: description || null },
            () => setIsDescriptionEditorOpen(false),
        );
    };

    const cancelDescriptionEdit = () => {
        if (savingOperation === 'description') return;
        setDescriptionDraft(user?.description ?? '');
        setSaveError(null);
        setIsDescriptionEditorOpen(false);
    };

    return (
        <Container title='Personal Information'>
            <View className='gap-3 p-3'>
                <UserNameEdit />

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
                    isEditable={isDescriptionEditorOpen}
                    editValue={descriptionDraft}
                    onEditValue={setDescriptionDraft}
                    endIcon={
                        user ? (
                            <MaterialIcons name="edit" size={15} color="#8FA5B8" />
                        ) : null
                    }
                    textAreaProps={{
                        numberOfLines: 4,
                        multiline: true,
                        maxLength: DESCRIPTION_MAX_LENGTH
                    }}
                />

                {isError && !user ? (
                    <View className="flex-row items-center gap-1">
                        <MaterialIcons name="error-outline" size={13} color="#F87171" />
                        <Text className="font-poppins-medium text-[10px] text-danger">
                            Could not load personal information
                        </Text>
                    </View>
                ) : null}
            </View>

            <View className='px-3 mb-3'>

                {saveError === 'description' ? (
                    <View className="mt-2 flex-row items-center gap-1">
                        <MaterialIcons name="error-outline" size={13} color="#F87171" />
                        <Text className="font-poppins-medium text-[10px] text-danger">
                            Could not save description. Please try again.
                        </Text>
                    </View>
                ) : null}

                <If condition={isDescriptionEditorOpen}>
                    <If.Then>
                        <View className='flex-row gap-1'>
                            <Button
                                accessibilityRole="button"
                                isDisabled={savingOperation !== null}
                                onPress={cancelDescriptionEdit}
                                size='sm'
                                className='w-1/3'
                                variant='secondary'
                            >
                                <Text className="font-poppins-semibold text-xs text-white">
                                    Cancel
                                </Text>
                            </Button>
                            <Button
                                accessibilityRole="button"
                                isDisabled={
                                    savingOperation !== null
                                    || descriptionDraft.trim() === (user?.description ?? '').trim()
                                }
                                onPress={saveDescription}
                                size='sm'
                                className='flex-1'
                            >
                                <Text className="font-poppins-semibold text-xs text-white">
                                    {savingOperation === 'description' ? 'Saving...' : 'Save description'}
                                </Text>
                            </Button>
                        </View>
                    </If.Then>
                </If>
            </View>
        </Container>
    );
}