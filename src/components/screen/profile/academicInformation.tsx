import { Text, View } from 'react-native'
import { useUser } from '@/hooks/queries/use-user'
import { SkeletonGroup } from 'heroui-native';

export const AcademicInformation = () => {

    const { data: user, isLoading } = useUser();

    return (
        <View className='h-8'>
            <SkeletonGroup isLoading={isLoading}>
                <SkeletonGroup.Item
                    className='rounded-full w-30 h-[16px]'
                >
                    <Text
                        numberOfLines={1}
                        className="font-poppins-medium text-xs text-text-secondary"
                    >
                        {user?.academic_information?.engineering_roll ?? "Software Engineer"}
                    </Text>
                </SkeletonGroup.Item>
                <SkeletonGroup.Item className='rounded-full w-35 h-3.5 mt-0.5'>
                    <Text className="font-poppins-medium text-[10px] text-text-secondary">
                        {user?.academic_information?.degree ?? "Diploma"} • Semester {user?.academic_information?.current_semester ?? 3}
                    </Text>
                </SkeletonGroup.Item>
            </SkeletonGroup>
        </View>
    )
}