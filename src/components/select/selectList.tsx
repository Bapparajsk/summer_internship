import { Text } from 'react-native'
import { Fragment } from 'react'
import { SelectOption, SelectPopoverProps } from './select.d';
import { cn, PressableFeedback, Separator } from 'heroui-native';
import { MaterialIcons } from '@expo/vector-icons';
import { isValidValueOrDefault } from './utils';
import Animated, { FadeIn } from 'react-native-reanimated';
import If from '../lib/if';
import { getCommonIcon } from '../lib/icon';

export type SelectItemListProps = Pick<SelectPopoverProps, "items" | "activeItemId" | "itemStyle" | "onSelect" | "showActiveIcon" | "showActiveColor" | "activeItemIds" | "iconSize" | "separators" | "onCloseTriggerId"> & {
    selectedSelect: SelectOption | undefined;
    setSelectedSelect: (item: SelectOption) => void;
    setOpen: (open: boolean) => void;
};


export const SelectItemList = ({
    items,
    selectedSelect,
    activeItemIds,
    itemStyle,
    showActiveIcon,
    showActiveColor,
    iconSize,
    separators,
    onCloseTriggerId,
    setSelectedSelect,
    setOpen,
    onSelect
}: SelectItemListProps) => {
    return (
        <Fragment>
            {items.map((Select, index) => {
                const active = (activeItemIds && activeItemIds?.includes(Select.id)) ?? selectedSelect?.id === Select.id;

                const { Icon, name: iconName } = getCommonIcon(Select.iconName || "sensors");

                return (
                    <Fragment key={`select-item-${Select.id}`}>
                        <If condition={Boolean(separators?.includes(index))}>
                            <If.Then>
                                <Animated.View entering={FadeIn.delay(100)}>
                                    <Separator />
                                </Animated.View>
                            </If.Then>
                        </If>
                        <Animated.View key={`quiz-card-key-${Select.id}`} entering={FadeIn.delay(100)}>
                            <PressableFeedback
                                onPress={() => {
                                    if (activeItemIds) {
                                        onSelect?.(Select);
                                    } else {
                                        setSelectedSelect(Select);
                                    }

                                    if (onCloseTriggerId && onCloseTriggerId.includes(Select.id)) {
                                        setOpen(false);
                                    } 
                                    else if(activeItemIds) {
                                        return;
                                    }
                                    else if(onCloseTriggerId === undefined) {
                                        onSelect?.(Select);
                                        setOpen(false);
                                    }
                                }}
                                className={cn("flex-row items-center rounded-2xl px-2 py-1.5", Select.classNames?.container)}
                            >
                                {Select.iconName && (
                                    <Icon
                                        name={iconName as any}
                                        size={iconSize}
                                        color={Select.classNames?.startIconColor || (showActiveColor && active ? isValidValueOrDefault(itemStyle?.activeColor, '#22D3EE') : "rgba(255, 255, 255, 0.42)")}
                                    />
                                )}

                                <Text
                                    className={cn(`mx-1 font-poppins-semibold`,
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
                    </Fragment>
                );
            })}
        </Fragment>
    )
}