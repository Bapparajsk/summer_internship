import { SettingScreenWrapper } from '@/components/screen/setting'
import { Text } from 'react-native'

export default function EditProfile() {
    return (
        <SettingScreenWrapper 
            path='changePassword' 
            backTitle='Profile'

            header={{
                title: "Edit profile",
                subtitle: "Update your personal and academic information."
            }}
        >
            <Text className='text-8xl text-pink-300'>
                Edit profile
            </Text>
        </SettingScreenWrapper>
    )
}