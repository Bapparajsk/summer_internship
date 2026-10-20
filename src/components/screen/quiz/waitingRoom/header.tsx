import { View, Text } from 'react-native'
import { SettingButton } from './settingButton'
import { MotionButton } from '@/components/ui/button/motionButton'
import { Ionicons } from '@expo/vector-icons'

export const Header = () => {
    return (
        <View className='w-full'>
            <View className='w-full flex-row items-center justify-between'>
                <View className='w-20'>
                    <MotionButton className='h-10 flex-row gap-1 w-full'>
                        <Ionicons name="arrow-back-circle-outline" size={24} color={"#f87171"} />
                        <Text className='text-xs font-poppins-medium text-danger '>
                            EXIT
                        </Text>
                    </MotionButton>
                </View>
                <SettingButton />
            </View>
        </View>
    )
}