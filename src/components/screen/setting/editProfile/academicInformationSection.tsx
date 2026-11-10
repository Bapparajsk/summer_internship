import { View } from 'react-native'
import { Container } from '../container'
import { CourseButton } from './courseRoles'
import { CurrentSemester } from './currentSemester'

export const AcademicInformationSection = () => {
    return (
        <Container title='Academic Information'>
            <View className='p-3 gap-y-1'>
                <CourseButton />
                <CurrentSemester /> 
            </View>
        </Container>
    )
}
