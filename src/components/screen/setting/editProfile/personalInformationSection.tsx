import { Container } from '../container'
import { ProfileInfoField } from './infoField'
import { View } from 'react-native'
import { EngineeringRoles } from './engineeringRoles'
import { FontAwesome5 } from '@expo/vector-icons'

export const PersonalInformationSection = () => {
    return (
        <Container title='Personal Information'>
            <View className='gap-3 p-3'>
                <ProfileInfoField
                    label="Full Name"
                    value="Bapparaj Debnath"
                    icon={<FontAwesome5 name="user-circle" size={18} color="#8FA5B8" />}
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