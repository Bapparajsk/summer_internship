import { HerderTitle, NotificationsSection, PreferencesSection, StorageDataSection, PrivacySecuritySection, SignOutButton } from '@/components/screen/setting'
import { SettingScreenWrapper } from '@/components/screen/setting/screenWrapper'

export default function SettingScreen() {
  return (
    <SettingScreenWrapper path='index' backTitle='Profile' >
      <HerderTitle />
      <PreferencesSection />
      <NotificationsSection />
      <StorageDataSection />
      <PrivacySecuritySection />
      <SignOutButton onPress={() => {}} />
    </SettingScreenWrapper>
  )
}