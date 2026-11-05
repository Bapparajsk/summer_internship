import { ScreenWrapper } from '@/components/screen'
import { Header, HerderTitle, NotificationsSection, PreferencesSection, StorageDataSection, PrivacySecuritySection } from '@/components/screen/setting'

export default function SettingScreen() {
  return (
    <ScreenWrapper path='setting' showFooter={false} paddingTop={10}>
      <Header />
      <HerderTitle />
      <PreferencesSection />
      <NotificationsSection />
      <StorageDataSection />
      <PrivacySecuritySection />
    </ScreenWrapper>
  )
}