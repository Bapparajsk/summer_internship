import { useUser } from '@/hooks/queries/use-user'
import { Skeleton } from 'heroui-native';
import { View, Text } from 'react-native'

export const Level = () => {

    const { data: user, isLoading } = useUser();

    return (
        <View className='flex-row'>
            <Skeleton isLoading={isLoading} className='h-6.25 w-17 rounded-full'>
                <View className="rounded-full border border-primary-border bg-primary-soft px-3 py-1">
                    <Text className="font-poppins-semibold text-[10px] leading-normal text-primary">
                        LEVEL. {(user?.quiz_explorer?.level ?? 1)}
                    </Text>
                </View>
            </Skeleton>
        </View>
    );
}