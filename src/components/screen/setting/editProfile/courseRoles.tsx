import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { SelectRoles } from './selectRoles'
import { ENGINEERING_COURSES, SelectOption } from './roles';
import { Text, View } from 'react-native';
import { useUser } from '@/hooks/queries/use-user';
import { useUpdateUser } from '@/hooks/mutations/use-update-user';

export const CourseRole = () => {
  const { data: user, isLoading, isError } = useUser();
  const updateUser = useUpdateUser();
  const department = user?.academic_information?.department;
  const current = ENGINEERING_COURSES.find(
    (course) => course.label === department || course.value === department,
  );

  const handleChange = (course: SelectOption) => {
    if (!user || updateUser.isPending || course.label === department) return;

    updateUser.mutate({ academic_information: { department: course.label } });
  };

  return (
    <View className="gap-1">
      <SelectRoles
        data={ENGINEERING_COURSES}
        onChange={handleChange}
        current={current}
        isDisabled={!user || isLoading || updateUser.isPending}
        label="Department"
        icon={<Entypo name="graduation-cap" size={16} color="#8FA5B8" />}
        endIcon={<Entypo name="chevron-right" size={18} color="#ffffff90" />}
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
            Could not save your department. Please try again.
          </Text>
        </View>
      ) : null}
    </View>
  );
};
