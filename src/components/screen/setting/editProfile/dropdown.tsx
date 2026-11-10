import { ProfileInfoField, ProfileInfoFieldProps } from './infoField'
import { Entypo } from '@expo/vector-icons'
import { SelectOption, SelectPopover, SelectPopoverProps } from '@/components/select'

export const className = "px-2 py-1.5 border border-border mb-0.5 bg-blue-400/5";

export type DropdownButtonProps = 
    Pick<ProfileInfoFieldProps, "label" | "value" | "icon"> &
    Pick<SelectPopoverProps, "activeIsOpenText" | "activeItemId" | "zIndex" |"onSelect"> &
{
    item: SelectOption[];
}

export const DropdownButton = ({ item, label, icon, value, activeIsOpenText, activeItemId, zIndex , onSelect } : DropdownButtonProps) => {
    return (
        <ProfileInfoField
            isButton={false}
            label={label}
            value={value}
            className='py-1'
            icon={icon}
            
            endIcon={
                <SelectPopover
                    items={item}
                    zIndex={zIndex}
                    activeItemId={activeItemId}
                    activeIsOpenText={activeIsOpenText}
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
                    iconSize={14}
                    activeIsOpenTextClassName='text-[12px] font-poppins-medium'
                    onSelect={onSelect}
                />
            }
        />
    )
}
