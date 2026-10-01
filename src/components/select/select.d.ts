import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode } from "react";

export type SelectOption = {
    id: string;
    label: string;
    iconName?: keyof typeof MaterialIcons.glyphMap;
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
    items1?: SelectOption[];
    activeItemId?: string;
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
    onSelect?: (item: SelectOption) => void;
    iconSize?: number;
};