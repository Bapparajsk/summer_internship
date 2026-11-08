import { SettingScreenWrapper } from '@/components/screen/setting'
import { PersonalInformationSection } from '@/components/screen/setting/editProfile'

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
            <PersonalInformationSection />
        </SettingScreenWrapper>
    )
}