import { Entypo, Octicons } from '@expo/vector-icons'
import { SelectRoles } from './selectRoles'
import { useState } from 'react'
import { ENGINEERING_ROLES, SelectOption } from './roles';

export const EngineeringRoles = () => {
    
    const [value, setValue] = useState<SelectOption | undefined>(undefined);

    return (
        <SelectRoles 
            data={ENGINEERING_ROLES}
            onChange={setValue}
            current={value}
            label='Engineering Role'
            icon={<Octicons name="briefcase" size={16} color="#8FA5B8" />}
            endIcon={<Entypo name="chevron-right" size={18} color="#ffffff90" />}
        />
    )
}
