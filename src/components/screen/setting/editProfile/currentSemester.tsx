import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { DropdownButton, className } from './dropdown';
import { SelectOption } from "@/components/select";
import { Text, View } from 'react-native';
import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';

const semesters: SelectOption[] = [1, 2, 3, 4].map((semester) => ({
    id: `semester_${semester}`,
    label: `Semester ${semester}`,
    classNames: { container: className },
}));

export const CurrentSemester = () => {
    const { data: user, isLoading, isError } = useUser();
    const updateUser = useUpdateUser();
    const currentSemester = user?.academic_information?.current_semester;
    const currentOption = semesters.find(
        (option) => option.id === `semester_${currentSemester}`,
    );

    const handleSelect = (option: SelectOption) => {
        if (!user || updateUser.isPending) return;

        const semester = Number(option.id.replace('semester_', ''));
        if (semester === currentSemester) return;

        updateUser.mutate({ academic_information: { current_semester: semester } });
    };

    return (
        <View className="gap-1">
            <DropdownButton
                item={semesters}
                label="Current Semester"
                value={isLoading ? 'Loading...' : currentOption?.label}
                icon={<FontAwesome name="calendar" size={16} color="#8FA5B8" />}
                activeItemId={currentOption?.id}
                activeItemIds={currentOption ? [currentOption.id] : undefined}
                activeIsOpenText="Semester"
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
                        Could not save your semester. Please try again.
                    </Text>
                </View>
            ) : null}
        </View>
    );
};
