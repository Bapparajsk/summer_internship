import { ReactNode } from "react";
import { IconName } from "../lib/icon";

export type SelectOption = {
    id: string;
    label: string;
    iconName?: IconName;
    classNames?: {
        container?: string;
        label?: string;
        startIconColor?: string;
        endIconColor?: string;
    }
};

export type SelectPopoverItemStyle = {
    activeColor?: string;
    inactiveColor?: string;
    labelClassName?: string;
}

export type SelectPopoverProps = {
    items: SelectOption[];
    activeItemId?: string;
    activeItemIds?: SelectOption["id"][];
    itemStyle?: SelectPopoverItemStyle
    zIndex?: number;
    activeContent?: ReactNode;
    activeIsOpenText?: string;
    activeIsOpenTextClassName?: string;
    activeIsOpenTextPosition?: "left" | "right";
    containerPosition?: "left" | "right";
    showActiveIcon?: boolean;
    showActiveColor?: boolean;
    triggerClassName?: string;
    containerClassName?: string;
    iconSize?: number;
    separators?: number[];
    onCloseTriggerId?: SelectOption["id"][];
    onSelect?: (item: SelectOption) => void;
};