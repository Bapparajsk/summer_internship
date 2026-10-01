import { Text } from 'react-native'
import { Fragment } from 'react'
import { SelectOption, SelectPopoverProps } from './select.d';
import { cn, PressableFeedback } from 'heroui-native';
import { MaterialIcons } from '@expo/vector-icons';
import { isValidValueOrDefault } from './utils';
import Animated, { FadeIn } from 'react-native-reanimated';

export type SelectItemListProps = Pick<SelectPopoverProps, "items" | "activeItemId" | "itemStyle" | "onSelect" | "showActiveIcon" | "showActiveColor" | "iconSize"> & {
    selectedSelect: SelectOption | undefined;
    setSelectedSelect: (item: SelectOption) => void;
    setOpen: (open: boolean) => void;
};


export const SelectItemList = ({ items, selectedSelect, setSelectedSelect, setOpen, onSelect, itemStyle, showActiveIcon, showActiveColor, iconSize } : SelectItemListProps) => {
    return (
        <Fragment>
            {items.map(Select => {
                const active = selectedSelect?.id === Select.id;

                return (
                    <Animated.View key={Select.id} entering={FadeIn.delay(100)}>
                        <PressableFeedback
                            onPress={() => {
                                setSelectedSelect(Select);
                                setOpen(false);
                                onSelect?.(Select);
                            }}
                            className={cn("flex-row items-center rounded-2xl px-2 py-1.5", Select.classNames?.container)}
                        >
                            {Select.iconName && (
                                <MaterialIcons
                                    name={Select.iconName}
                                    size={iconSize}
                                    color={Select.classNames?.startIconColor || (showActiveColor && active ? isValidValueOrDefault(itemStyle?.activeColor, '#22D3EE') : "rgba(255, 255, 255, 0.42)")}
                                />
                            )}

                            <Text
                                className={cn(`mx-2 font-poppins-semibold`,
                                    `text-text-secondary`,
                                    { "text-primary": showActiveColor && active },
                                    itemStyle?.labelClassName,
                                    Select.classNames?.label
                                )}
                            >
                                {Select.label}
                            </Text>

                            {showActiveIcon && active && (
                                <MaterialIcons
                                    name="check"
                                    size={iconSize}
                                    color={isValidValueOrDefault(Select.classNames?.endIconColor, "#22D3EE")}
                                />
                            )}
                        </PressableFeedback>
                    </Animated.View>
                );
            })}
        </Fragment>
    )
}