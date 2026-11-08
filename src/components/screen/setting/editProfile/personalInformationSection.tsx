import { Container } from '../container'
import { GraduationCap, Mail, UserRound } from 'lucide-react-native'
import { ProfileInfoField } from './infoField'
import { View } from 'react-native'

export const PersonalInformationSection = () => {
    return (
        <Container title='Personal Information'>
            <View className='gap-4 p-3'>
                <ProfileInfoField
                    label="Full Name"
                    value="Bapparaj Debnath"
                    icon={<UserRound size={18} color="#8FA5B8" />}
                />
                <ProfileInfoField
                    label="Email Address"
                    value="bapparaj@example.com"
                    icon={<Mail size={18} color="#8FA5B8" />}
                />

                <ProfileInfoField
                    label="Course"
                    value="  Computer Science and Technology Computer Science and Technology Computer Science and Technology Computer Science Computer Science and Technology Computer Science Computer Science and Technology Computer Science Computer Science and Technology Computer Science and Technology v vComputer Science and Technology Computer Science and Technology Computer Science and Technology"
                />
            </View>
        </Container>
    )
}