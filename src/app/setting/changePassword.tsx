import { Text } from 'react-native'
import { SettingScreenWrapper } from '@/components/screen/setting/screenWrapper'

export default function changePassword() {
  return (
    <SettingScreenWrapper path='changePassword' backTitle='Setting'>
      <Text>changePassword</Text>
    </SettingScreenWrapper>
  )
}