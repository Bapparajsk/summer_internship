import { Text, View } from 'react-native'
import { useUser } from '@/hooks/queries/use-user'
import { PressableFeedback, SkeletonGroup } from 'heroui-native';
import { MaterialIcons } from '@expo/vector-icons';

export const AcademicInformation = () => {

    const { data: user, isLoading, isError, refetch } = useUser();

    return (
        <View className='h-8'>
            {isLoading ? (
                <SkeletonGroup isLoading>
                    <SkeletonGroup.Item className='rounded-full w-30 h-[16px]' />
                    <SkeletonGroup.Item className='rounded-full w-35 h-3.5 mt-0.5' />
                </SkeletonGroup>
            ) : isError ? (
                <PressableFeedback
                    className="h-8 flex-row items-center gap-1"
                    onPress={() => refetch()}
                >
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text className="font-poppins-medium text-[10px] text-danger">
                        Academic info unavailable • Tap to retry
                    </Text>
                </PressableFeedback>
            ) : !user?.academic_information ? (
                <View className="h-8 justify-center">
                    <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                        Academic information not added
                    </Text>
                </View>
            ) : (
                <SkeletonGroup isLoading={false}>
                    <SkeletonGroup.Item
                        className='rounded-full w-30 h-[16px]'
                    >
                        <Text
                            numberOfLines={1}
                            className="font-poppins-medium text-xs text-text-secondary"
                        >
                            {user.academic_information.engineering_roll?.trim() || "Role not added"}
                        </Text>
                    </SkeletonGroup.Item>
                    <SkeletonGroup.Item className='rounded-full w-35 h-3.5 mt-0.5'>
                        <Text
                            numberOfLines={1}
                            className="font-poppins-medium text-[10px] text-text-secondary"
                        >
                            {user.academic_information.degree?.trim() || "Degree not added"}
                            {user.academic_information.current_semester
                                ? ` • Semester ${user.academic_information.current_semester}`
                                : ""}
                        </Text>
                    </SkeletonGroup.Item>
                </SkeletonGroup>
            )}
        </View>
    )
}