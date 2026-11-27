import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DropdownButton, className } from './dropdown';
import { SelectOption } from "@/components/select";
import { Text, View } from 'react-native';
import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';

const degrees: SelectOption[] = [
    { id: "diploma", label: "Diploma", classNames: { container: className } },
    { id: "b.tech", label: "B.Tech", classNames: { container: className } },
    { id: "m.tech", label: "M.Tech", classNames: { container: className } },
];

export const CurrentDegree = () => {
    const { data: user, isLoading, isError } = useUser();
    const updateUser = useUpdateUser();
    const currentDegree = user?.academic_information?.degree;
    const currentOption = degrees.find(
        (option) => option.label === currentDegree || option.id === currentDegree,
    );

    const handleSelect = (option: SelectOption) => {
        if (!user || updateUser.isPending || option.label === currentDegree) return;

        updateUser.mutate({ academic_information: { degree: option.label } });
    };

    return (
        <View className="gap-1">
            <DropdownButton
                item={degrees}
                label="Degree"
                value={isLoading ? 'Loading...' : currentOption?.label ?? currentDegree}
                icon={<MaterialCommunityIcons name="account-school" size={16} color="#8FA5B8" />}
                activeIsOpenText="Degree"
                activeItemId={currentOption?.id}
                activeItemIds={currentOption ? [currentOption.id] : undefined}
                isDisabled={!user || isLoading || updateUser.isPending}
                onSelect={handleSelect}
            />
            {isError && !user ? (
                <View className="flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text accessibilityRole="alert" className="font-poppins-medium text-[10px] text-danger">
                        Could not load your academic information.
                    </Text>
                </View>
            ) : null}
            {updateUser.isError ? (
                <View className="flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text accessibilityRole="alert" className="font-poppins-medium text-[10px] text-danger">
                        Could not save your degree. Please try again.
                    </Text>
                </View>
            ) : null}
        </View>
    );
};
