import { SettingScreenWrapper } from '@/components/screen/setting'
import { View, Text } from 'react-native'

export default function VerifyEmail() {
    return (
        <SettingScreenWrapper
            path='(auth)/verify-email'
            backTitle=''
        >
            <Text>verify-email</Text>
        </SettingScreenWrapper>
    )
}