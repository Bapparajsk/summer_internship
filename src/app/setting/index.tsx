import { Text } from 'react-native'
import { ScreenWrapper } from '@/components/screen'

export default function SettingScreen() {
  return (
    <ScreenWrapper path='setting' showFooter={false}>
      <Text className='text-pink-50 text-9xl font-poppins-medium'>index</Text>
    </ScreenWrapper>
  )
}