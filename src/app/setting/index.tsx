import { 
  SettingScreenWrapper, 
  NotificationsSection, 
  PreferencesSection, 
  StorageDataSection, 
  PrivacySecuritySection, 
  SignOutButton 
} from '@/components/screen/setting'

export default function SettingScreen() {
  return (
    <SettingScreenWrapper 
      path='index' 
      backTitle='Profile' 

      header={{
        title: 'Settings',
        subtitle: 'Personalize your QuizFlow experience.'
      }}
    >
      <PreferencesSection />
      <NotificationsSection />
      <StorageDataSection />
      <PrivacySecuritySection />
      <SignOutButton onPress={() => {}} />
    </SettingScreenWrapper>
  )
}