import { View } from 'react-native'
import { SettingScreenWrapper } from '@/components/screen/setting'

export const FinalLeaderboard = () => {
    return (
        <SettingScreenWrapper
            path='changePassword'
            backTitle='Setting'
            header={{
                title: 'Change password',
                subtitle: 'Choose a strong password to keep your account secure.'
            }}
        >
            <View>

            </View>
        </SettingScreenWrapper>
    )
}