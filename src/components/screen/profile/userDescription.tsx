import { View, Text } from 'react-native'
import React from 'react'
import { SkeletonGroup } from 'heroui-native'
import { useUser } from '@/hooks/queries/use-user'


export const UserDescription = () => {

    const { data: user, isLoading } = useUser();

    return (
        <View className='w-full mt-3 h-15'>
            <SkeletonGroup className='gap-y-0.5' isLoading={isLoading}>
                <SkeletonGroup.Item>
                    <Text
                        className='text-xs font-poppins-medium text-text-secondary'
                        numberOfLines={3}
                    >
                        {user?.description ?? "NONE"}
                    </Text>
                </SkeletonGroup.Item>
                <SkeletonGroup.Item className='w-full h-3.75 rounded-full'/>
                <SkeletonGroup.Item className='w-full h-3.75 rounded-full'/>
                <SkeletonGroup.Item className='w-1/3 h-3.75 rounded-full'/>
            </SkeletonGroup>
        </View>
    )
}
