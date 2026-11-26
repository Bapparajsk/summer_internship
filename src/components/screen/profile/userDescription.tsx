import { View, Text, Pressable } from 'react-native'
import { SkeletonGroup } from 'heroui-native'
import { MaterialIcons } from '@expo/vector-icons'
import type { UserQueryState } from '@/types/user'

export const UserDescription = ({ user, isLoading, isError }: UserQueryState) => {
    const description = user?.description?.trim();

    if (isLoading) {
        return (
            <View className='w-full mt-3 gap-y-1'>
                <SkeletonGroup isLoading className='gap-y-0.5'>
                    <SkeletonGroup.Item className='w-full h-3.75 rounded-full' />
                    <SkeletonGroup.Item className='w-full h-3.75 rounded-full' />
                    <SkeletonGroup.Item className='w-1/3 h-3.75 rounded-full' />
                </SkeletonGroup>
            </View>
        )
    }

    if (isError && !user) {
        return (
            <View className="mt-3 flex-row items-center gap-1">
                <MaterialIcons name="error-outline" size={13} color="#F87171" />
                <Text className="text-xs font-poppins-medium text-danger">
                    Description unavailable
                </Text>
            </View>
        )
    }

    if (!user) {
        return (
            <Text className="mt-3 text-xs font-poppins-medium text-text-tertiary">
                Description unavailable
            </Text>
        )
    }

    if (!description) {
        return (
            <Pressable className='mt-3 self-start'>
                <Text className='text-xs font-poppins-medium text-primary'>
                    + Add description
                </Text>
            </Pressable>
        )
    }

    return (
        <View className='w-full mt-3'>
            <Text
                className='text-xs font-poppins-medium text-text-secondary'
                numberOfLines={3}
            >
                {description}
            </Text>
        </View>
    )
}