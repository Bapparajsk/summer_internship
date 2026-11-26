import { Text, View } from 'react-native'
import { PressableFeedback, SkeletonGroup } from 'heroui-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { UserQueryState } from '@/types/user';

export const AcademicInformation = ({ user, isLoading, isError }: UserQueryState) => {
    const router = useRouter();

    return (
        <View className='h-8'>
            {isLoading ? (
                <SkeletonGroup isLoading>
                    <SkeletonGroup.Item className='rounded-full w-30 h-[16px]' />
                    <SkeletonGroup.Item className='rounded-full w-35 h-3.5 mt-0.5' />
                </SkeletonGroup>
            ) : isError && !user ? (
                <View className="h-8 flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text className="font-poppins-medium text-[10px] text-danger">
                        Academic information unavailable
                    </Text>
                </View>
            ) : !user ? (
                <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                    Academic information unavailable
                </Text>
            ) : !user.academic_information ? (
                <PressableFeedback
                    className="h-8 self-start justify-center"
                    onPress={() => router.push('/setting/edit_profile')}
                >
                    <Text className="font-poppins-medium text-xs text-primary">
                        + Add academic information
                    </Text>
                </PressableFeedback>
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