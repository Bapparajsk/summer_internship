import { Entypo } from '@expo/vector-icons'
import { SelectRoles } from './selectRoles'
import { useState } from 'react'
import { ENGINEERING_COURSES, SelectOption } from './roles';

export const CourseRole = () => {

  const [value, setValue] = useState<SelectOption | undefined>(undefined);

  return (
    <SelectRoles
      data={ENGINEERING_COURSES}
      onChange={setValue}
      current={value}
      label='Department'
      icon={<Entypo name="graduation-cap" size={16} color="#8FA5B8" />}
      endIcon={<Entypo name="chevron-right" size={18} color="#ffffff90" />}
    />
  )
}
