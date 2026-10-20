import { View, Text } from 'react-native'
import { SettingButton } from './settingButton'
import { MotionButton } from '@/components/ui/button/motionButton'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from "expo-router"; 

export const Header = () => {

    const router = useRouter();

    return (
        <View className='w-full'>
            <View className='w-full flex-row items-center justify-between'>
                <View className='w-20'>
                    <MotionButton 
                        className='h-10 flex-row gap-1 w-full'
                        onPress={() => {
                            router.dismissTo("/(tab)/explore")
                        }}
                    >
                        <Ionicons name="arrow-back-circle-outline" size={20} color={"#f87171"} />
                        <Text className='text-xs font-poppins-semibold text-danger '>
                            EXIT
                        </Text>
                    </MotionButton>
                </View>
                <SettingButton />
            </View>
        </View>
    )
}