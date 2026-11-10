import { View } from 'react-native';
import { Container } from '../container';
import { ProfileInfoField } from './infoField';
import { FontAwesome6, Ionicons } from '@expo/vector-icons';

export const CollegeInformationSection = () => {
  return (
    <Container title='College Information 🏛️'>
      <View className='gap-3 p-3'>
        <ProfileInfoField
          label="College Name"
          value="Elitte Institute of Engineering and Management"
          icon={<FontAwesome6 name="building-columns" size={14} color="#8FA5B8" />}
        />
        <ProfileInfoField
          label="Principal Name"
          value="Chandan Chowdhury"
          icon={<FontAwesome6 name="user-tie" size={14} color="#8FA5B8" />}
        />
        <ProfileInfoField
          label="Location"
          value='P.O. Karnamadhabpur, P.S. Ghola, Near Mohispota, Kalyani Express Highway, Sodepur, Kolkata – 700113, West Bengal'
          showWordCount
          maxCount={100}
        />
        <ProfileInfoField
          label="Website"
          rightLabel='(Optional)'
          value="https://eiem.ac.in"
          icon={<Ionicons name="globe-outline" size={18} color="#8FA5B8" />}
        />
      </View>
    </Container>
  )
}