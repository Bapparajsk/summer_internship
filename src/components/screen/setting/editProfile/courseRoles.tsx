import { Entypo } from '@expo/vector-icons'
import { SelectRoles } from './selectRoles'
import { useState } from 'react'
import { ENGINEERING_COURSES, SelectOption } from './roles';

export const CourseButton = () => {

  const [value, setValue] = useState<SelectOption | undefined>(undefined);

  return (
    <SelectRoles
      data={ENGINEERING_COURSES}
      onChange={setValue}
      current={value}
      label='Course'
      icon={<Entypo name="graduation-cap" size={16} color="#8FA5B8" />}
      endIcon={<Entypo name="chevron-right" size={18} color="#ffffff90" />}
    />
  )
}
