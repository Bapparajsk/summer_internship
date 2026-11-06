import { HerderTitle, SettingScreenWrapper } from '@/components/screen/setting'
import { ChangePasswordForm } from '@/components/screen/setting/changePassword/changePasswordForm';

export default function changePassword() {
  return (
    <SettingScreenWrapper path='changePassword' backTitle='Setting'>
      <HerderTitle title='Change password' subtitle='Choose a strong password to keep your account secure.' />
      <ChangePasswordForm
        onSubmitPassword={async (values) => {
          // await updatePassword({
          //   currentPassword: values.currentPassword,
          //   newPassword: values.newPassword,
          // });

          console.log(values)

        }}

      />
    </SettingScreenWrapper>
  )
}

