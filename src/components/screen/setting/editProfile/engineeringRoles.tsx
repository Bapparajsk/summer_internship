import { Entypo, Octicons } from '@expo/vector-icons'
import { View } from 'react-native';
import { SelectRoles } from './selectRoles'
import { ENGINEERING_ROLES } from './roles';
import { Skeleton } from 'heroui-native';

type EngineeringRolesProps = {
    value?: string | null;
    isLoading: boolean;
    isDisabled: boolean;
    onChange: (value: string) => void;
};

export const EngineeringRoles = ({ value, isLoading, isDisabled, onChange }: EngineeringRolesProps) => {
    if (isLoading) {
        return (
            <View className="gap-1">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-13.5 w-full rounded-[16px]" />
            </View>
        );
    }

    const current = ENGINEERING_ROLES.find(
        (role) => role.value === value || role.label === value
    );

    return (
        <SelectRoles
            data={ENGINEERING_ROLES}
            onChange={(role) => onChange(role.label)}
            current={current}
            isDisabled={isDisabled}
            label='Engineering Role'
            icon={<Octicons name="briefcase" size={16} color="#8FA5B8" />}
            endIcon={<Entypo name="chevron-right" size={18} color="#ffffff90" />}
        />
    )
}
