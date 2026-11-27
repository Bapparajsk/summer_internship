import { useState } from 'react';
import { Text, View } from 'react-native';
import { useUser as useClerkUser } from '@clerk/expo';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import { ProfileInfoField } from './infoField';

type ParsedName = {
    firstName: string;
    lastName: string;
};

export const parseName = (fullName: string): ParsedName => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean);

    return {
        firstName: parts[0] ?? '',
        lastName: parts.slice(1).join(' '),
    };
};

export const UserNameEdit = () => {
    const { user: clerkUser, isLoaded: isClerkUserLoaded } = useClerkUser();
    const [isNameEditorOpen, setIsNameEditorOpen] = useState(false);
    const [nameDraft, setNameDraft] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    const openEditor = () => {
        if (!clerkUser || isSaving) return;
        setNameDraft(clerkUser.fullName ?? '');
        setSaveError(null);
        setIsNameEditorOpen(true);
    };

    const saveName = async () => {
        if (!clerkUser || isSaving) return;

        const { firstName, lastName } = parseName(nameDraft);
        if (!firstName) {
            setSaveError('Please enter a first name.');
            return;
        }

        if (nameDraft.trim() === (clerkUser.fullName ?? '').trim()) {
            setIsNameEditorOpen(false);
            return;
        }

        setIsSaving(true);
        setSaveError(null);

        try {
            await clerkUser.update({ firstName, lastName });
            setIsNameEditorOpen(false);
        } catch {
            setSaveError("Couldn't update your name. Please try again.");
        }

        setIsSaving(false);
    };

    return (
        <View className="gap-2">
            <ProfileInfoField
                label="Full Name"
                value={
                    isClerkUserLoaded
                        ? clerkUser?.fullName ?? 'Not provided'
                        : 'Loading...'
                }
                icon={<FontAwesome5 name="user-circle" size={18} color="#8FA5B8" />}
                isButton={!isNameEditorOpen && isClerkUserLoaded && !!clerkUser && !isSaving}
                onPress={openEditor}
                isEditable={isNameEditorOpen}
                editValue={nameDraft}
                onEditValue={(value) => {
                    setNameDraft(value);
                    setSaveError(null);
                }}
                textAreaProps={{
                    multiline: false,
                    editable: !isSaving,
                    returnKeyType: 'done',
                    onSubmitEditing: saveName,
                }}
            />

            {saveError ? (
                <View className="flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text
                        accessibilityRole="alert"
                        className="font-poppins-medium text-[10px] text-danger"
                    >
                        {saveError}
                    </Text>
                </View>
            ) : null}

            {isSaving ? (
                <Text
                    accessibilityLiveRegion="polite"
                    className="font-poppins-medium text-[10px] text-text-tertiary"
                >
                    Saving name...
                </Text>
            ) : null}
        </View>
    );
};
