import { FontAwesome } from '@expo/vector-icons';
import { DropdownButton, className } from './dropdown';
import { useState } from 'react';
import { SelectOption } from "@/components/select";

const semesters: SelectOption[] = [
    { id: "semester_1", label: "Semester  1", classNames: { container: className } },
    { id: "semester_2", label: "Semester  2", classNames: { container: className } },
    { id: "semester_3", label: "Semester  3", classNames: { container: className } },
    { id: "semester_4", label: "Semester  4", classNames: { container: className } }
]


export const CurrentSemester = () => {

    const [semester, setSemester] = useState<SelectOption>();

    return (
        <DropdownButton 
            item={semesters}
            label={"Current Semester"}
            value={semester?.label}
            icon={<FontAwesome name="calendar" size={16} color="#8FA5B8" />}

            activeItemId={semester?.id}
            activeIsOpenText='Semester'

            onSelect={setSemester}
        />
    )
}
