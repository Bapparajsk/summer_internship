import { Container } from '../container'
import { UserRound } from 'lucide-react-native'
import { ProfileInfoField } from './infoField'
import { View } from 'react-native'
import EngineeringRoles from './engineeringRoles'

export const PersonalInformationSection = () => {
    return (
        <Container title='Personal Information'>
            <View className='gap-4 p-3'>
                <ProfileInfoField
                    label="Full Name"
                    value="Bapparaj Debnath"
                    icon={<UserRound size={18} color="#8FA5B8" />}
                />

                <EngineeringRoles />

                <ProfileInfoField
                    label="Description"
                    value='CS sophomore passionate about distributed algorithms, competitive programming & quiz sprints 🚀'
                    showWordCount
                    maxCount={100}
                />
            </View>
        </Container>
    )
}