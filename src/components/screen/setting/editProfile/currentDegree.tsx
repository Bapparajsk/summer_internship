import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DropdownButton, className } from './dropdown';
import { useState } from 'react';
import { SelectOption } from "@/components/select";

const semesters: SelectOption[] = [
    { id: "diploma", label: "Diploma", classNames: { container: className } },
    { id: "b.tech", label: "B.Tech", classNames: { container: className } },
    { id: "m.tech", label: "M.Tech", classNames: { container: className } },
];


export const CurrentDegree = () => {

    const [degree, setDegree] = useState<SelectOption>();

    return (
        <DropdownButton 
            item={semesters}
            label={"Degree"}
            value={degree?.label}
            icon={<MaterialCommunityIcons name="account-school"  size={16} color="#8FA5B8" />}

            activeIsOpenText='Degree'
            activeItemId={degree?.id}
            
            onSelect={setDegree}
        />
    )
}
