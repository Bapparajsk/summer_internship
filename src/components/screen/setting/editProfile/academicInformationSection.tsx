import { View } from 'react-native'
import { Container } from '../container'
import { CourseRole } from './courseRoles'
import { CurrentSemester } from './currentSemester'
import { CurrentDegree } from './currentDegree'

export const AcademicInformationSection = () => {
    return (
        <Container title='Academic Information'>
            <View className='p-3 gap-y-1'>
                <CurrentDegree />
                <CourseRole />
                <CurrentSemester /> 
            </View>
        </Container>
    )
}
