import { SelectPopover } from '@/components/select';
import { ProfileInfoField } from './infoField'
import { Entypo, FontAwesome } from '@expo/vector-icons'

const className = "px-2 py-1.5 border border-border mb-0.5 bg-blue-400/5";

export const CurrentSemester = () => {
    return (
        <ProfileInfoField
            isButton={false}
            label={"Current Semester"}
            value={"Semester 4"}
            className='py-1'
            icon={<FontAwesome name="calendar" size={16} color="#8FA5B8" />}
            endIcon={
                <SelectPopover
                    items={[
                        { id: "semester_1", label: "Semester  1", classNames: { container: className } },
                        { id: "semester_2", label: "Semester  2", classNames: { container: className } },
                        { id: "semester_3", label: "Semester  3", classNames: { container: className } },
                        { id: "semester_4", label: "Semester  4",  classNames: { container: className } }
                    ]}
                    showActiveIcon={false}
                    showActiveColor={false}
                    activeIsOpenText="Semester"
                    activeIsOpenTextPosition="right"
                    containerClassName="border-white/20 mt-2.5 rounded-[16px]"
                    activeContent={
                        <Entypo
                            name="list" 
                            size={16}
                            color="#9CA3AF"
                        />
                    }
                    triggerClassName="px-2 py-1"
                    itemStyle={{
                        labelClassName: "text-[10px]",
                    }}
                    iconSize={10}
                    activeIsOpenTextClassName='text-[12px] font-poppins-medium'
                />
            }
        />
    )
}
