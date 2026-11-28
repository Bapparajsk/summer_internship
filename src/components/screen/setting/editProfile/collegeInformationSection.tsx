import { useState } from 'react';
import type { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { FontAwesome6, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Button } from 'heroui-native';

import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';
import type { CollegeInformation } from '@/types/user';

import { Container } from '../container';
import { ProfileInfoField } from './infoField';

type CollegeField = 'college_name' | 'principal_name' | 'location' | 'website';
type CollegeDraft = Record<CollegeField, string>;

const LOCATION_MAX_LENGTH = 100;
const EMPTY_DRAFT: CollegeDraft = {
    college_name: '',
    principal_name: '',
    location: '',
    website: '',
};

const toDraft = (
    college: Pick<CollegeInformation, CollegeField> | null | undefined,
): CollegeDraft => ({
    college_name: college?.college_name ?? '',
    principal_name: college?.principal_name ?? '',
    location: college?.location ?? '',
    website: college?.website ?? '',
});

export const CollegeInformationSection = () => {
    const { data: user, isLoading, isError } = useUser();
    const updateUser = useUpdateUser();
    const college = user?.college_information;

    const [isEditing, setIsEditing] = useState(false);
    const [draft, setDraft] = useState<CollegeDraft>(EMPTY_DRAFT);
    const [validationError, setValidationError] = useState<string | null>(null);

    const startEditing = () => {
        if (!user || updateUser.isPending) return;
        setDraft(toDraft(college));
        setValidationError(null);
        updateUser.reset();
        setIsEditing(true);
    };

    const cancelEditing = () => {
        if (updateUser.isPending) return;
        setDraft(toDraft(college));
        setValidationError(null);
        updateUser.reset();
        setIsEditing(false);
    };

    const saveChanges = () => {
        if (!user || !isEditing || updateUser.isPending) return;

        const collegeName = draft.college_name.trim();
        const location = draft.location.trim();

        if (!collegeName || !location) {
            setValidationError(
                !collegeName ? 'College name is required.' : 'Location is required.',
            );
            return;
        }

        const collegeInformation = {
            college_name: collegeName,
            principal_name: draft.principal_name.trim() || null,
            location,
            website: draft.website.trim() || null,
        };
        const currentInformation = {
            college_name: college?.college_name ?? '',
            principal_name: college?.principal_name ?? '',
            location: college?.location ?? '',
            website: college?.website ?? '',
        };

        if (
            collegeInformation.college_name === currentInformation.college_name.trim()
            && (collegeInformation.principal_name ?? '') === currentInformation.principal_name.trim()
            && collegeInformation.location === currentInformation.location.trim()
            && (collegeInformation.website ?? '') === currentInformation.website.trim()
        ) {
            setIsEditing(false);
            return;
        }

        setValidationError(null);
        updateUser.mutate(
            { college_information: collegeInformation },
            {
                onSuccess: () => {
                    setIsEditing(false);
                    setDraft(EMPTY_DRAFT);
                },
            },
        );
    };

    const fields: {
        key: CollegeField;
        label: string;
        rightLabel?: string;
        icon?: ReactNode;
    }[] = [
        {
            key: 'college_name',
            label: 'College Name',
            icon: <FontAwesome6 name="building-columns" size={14} color="#8FA5B8" />,
        },
        {
            key: 'principal_name',
            label: 'Principal Name',
            icon: <FontAwesome6 name="user-tie" size={14} color="#8FA5B8" />,
        },
        {
            key: 'location',
            label: 'Location',
        },
        {
            key: 'website',
            label: 'Website',
            rightLabel: '(Optional)',
            icon: <Ionicons name="globe-outline" size={18} color="#8FA5B8" />,
        },
    ];

    return (
        <Container title="College Information 🏛️">
            <View className="gap-3 p-3">
                {fields.map((field, index) => {
                    const value = college?.[field.key] ?? undefined;

                    return (
                        <ProfileInfoField
                            key={field.key}
                            label={field.label}
                            rightLabel={field.rightLabel}
                            value={isLoading ? 'Loading...' : value}
                            icon={field.icon}
                            showWordCount={field.key === 'location' && !isLoading && !!user}
                            maxCount={field.key === 'location' ? LOCATION_MAX_LENGTH : undefined}
                            isButton={!isEditing && !isLoading && !!user && !updateUser.isPending}
                            onPress={startEditing}
                            isEditable={isEditing}
                            editValue={draft[field.key]}
                            onEditValue={(nextValue) => {
                                setDraft((current) => ({ ...current, [field.key]: nextValue }));
                                setValidationError(null);
                                updateUser.reset();
                            }}
                            endIcon={
                                !isEditing
                                    ? <MaterialIcons name="edit" size={15} color="#8FA5B8" />
                                    : null
                            }
                            textAreaProps={{
                                multiline: field.key === 'location',
                                numberOfLines: field.key === 'location' ? 3 : 1,
                                maxLength: field.key === 'location' ? LOCATION_MAX_LENGTH : undefined,
                                editable: !updateUser.isPending,
                                keyboardType: field.key === 'website' ? 'url' : 'default',
                                autoCapitalize: field.key === 'website' ? 'none' : 'sentences',
                                autoFocus: false
                            }}
                        />
                    );
                })}

                {isError && !user ? (
                    <View className="flex-row items-center gap-1">
                        <MaterialIcons name="error-outline" size={13} color="#F87171" />
                        <Text
                            accessibilityRole="alert"
                            className="font-poppins-medium text-[10px] text-danger"
                        >
                            Could not load college information. Please try again.
                        </Text>
                    </View>
                ) : null}

                {validationError || updateUser.isError ? (
                    <View className="flex-row items-center gap-1">
                        <MaterialIcons name="error-outline" size={13} color="#F87171" />
                        <Text
                            accessibilityRole="alert"
                            className="font-poppins-medium text-[10px] text-danger"
                        >
                            {validationError ?? 'Could not save college information. Please try again.'}
                        </Text>
                    </View>
                ) : null}

                {isEditing ? (
                    <View className="flex-row gap-1">
                        <Button
                            accessibilityRole="button"
                            isDisabled={updateUser.isPending}
                            onPress={cancelEditing}
                            size="sm"
                            className="w-1/3"
                            variant="secondary"
                        >
                            <Text className="font-poppins-semibold text-xs text-white">Cancel</Text>
                        </Button>
                        <Button
                            accessibilityRole="button"
                            isDisabled={
                                updateUser.isPending
                                || (
                                    draft.college_name.trim() === (college?.college_name ?? '').trim()
                                    && draft.principal_name.trim() === (college?.principal_name ?? '').trim()
                                    && draft.location.trim() === (college?.location ?? '').trim()
                                    && draft.website.trim() === (college?.website ?? '').trim()
                                )
                            }
                            onPress={saveChanges}
                            size="sm"
                            className="flex-1"
                        >
                            <Text className="font-poppins-semibold text-xs text-white">
                                {updateUser.isPending ? 'Saving...' : 'Save changes'}
                            </Text>
                        </Button>
                    </View>
                ) : null}
            </View>
        </Container>
    );
};
