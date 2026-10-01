import { areAllValid } from "./utils";
import { MaterialIcons } from '@expo/vector-icons';
import { Fragment, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';
import { cn, PressableFeedback, Separator } from 'heroui-native';
import { SelectOption, SelectPopoverProps } from "./select.d";
import { SelectItemList } from "./selectItemlist";

    
export const SelectPopover = ({
    items,
    activeItemId,
    itemStyle,
    zIndex,
    activeContent,
    activeIsOpenText,
    activeIsOpenTextClassName,
    activeIsOpenTextPosition = "right",
    containerPosition = "right",
    showActiveIcon = true,
    showActiveColor = true,
    triggerClassName,
    containerClassName,
    iconSize = 16,
    onSelect,
}: SelectPopoverProps) => {

    const triggerWidth = useRef(120);
    const [open, setOpen] = useState(false);
    const [selectedSelect, setSelectedSelect] = useState<SelectOption>(items.find(item => item.id === activeItemId) || items[0]);

    if(items.length === 0) {
        console.warn("SelectPopover: No items provided.");
        return null;
    }

    return (
        <View className="relative" style={{ zIndex: zIndex || 10 }}>

            {open && (
                <PressableFeedback
                    style={{
                        position: 'absolute',
                        width: 99999,
                        height: 99999,
                        top: -1000,
                        left: -1000,
                        backgroundColor: "#00000080",
                    }}
                    onPress={() => setOpen(false)}
                />
            )}

            {/* Spacer */}
            <View className="h-12" />

            <Animated.View
                layout={LinearTransition.springify().stiffness(200).mass(0.5).damping(20)}
                className={cn(
                    "absolute top-0 rounded-3xl border border-border bg-[#1a1a2b]",
                    containerClassName,
                    containerPosition === "left" ? "left-0" : "right-0"
                )}
                style={{ alignSelf: 'flex-start' }}
            >
                {/* Trigger */}
                <PressableFeedback
                    onPress={() => setOpen(prev => !prev)}
                    onLayout={e => {
                        triggerWidth.current =
                            e.nativeEvent.layout.width;
                    }}
                    className={cn("flex-row items-center px-4 py-3", triggerClassName)}
                >
                    {activeContent ? ( 
                        <Fragment>
                            {areAllValid(open, activeIsOpenText, activeIsOpenTextPosition === "left") && (
                                <Animated.View entering={FadeIn}>
                                    <Text className={cn("ml-2 text-zinc-400 font-poppins-medium", activeIsOpenTextClassName)}>
                                        {activeIsOpenText}
                                    </Text>
                                </Animated.View>
                            )}
                            {activeContent}
                            {areAllValid(open, activeIsOpenText, activeIsOpenTextPosition === "right") && (
                                <Animated.View entering={FadeIn}>
                                    <Text className={cn("ml-2 text-zinc-400 font-poppins-medium", activeIsOpenTextClassName)}>
                                        {activeIsOpenText}
                                    </Text>
                                </Animated.View>
                            )}
                        </Fragment>
                    ) : (
                        <Fragment>
                            {selectedSelect.iconName && (
                                <MaterialIcons
                                    name={selectedSelect.iconName}
                                    size={16}
                                    color="#22D3EE"
                                />
                            )}

                            <Text className={cn("ml-2 font-poppins-medium", itemStyle?.labelClassName)}>
                                {selectedSelect.label}
                            </Text>

                            <MaterialIcons
                                name={open ? 'expand-less' : 'expand-more'}
                                size={18}
                                color="#A1A1AA"
                                style={{ marginLeft: 8 }}
                            />
                        </Fragment>
                    )}
                </PressableFeedback>

                {open && (
                    <Animated.View entering={FadeIn.delay(100)}>
                        <Separator />
                    </Animated.View>
                )}

                {/* Content */}
                {open && (
                    <Animated.View className="mb-3 gap-1 px-2 mt-1.5" >
                        <SelectItemList
                            items={items}
                            selectedSelect={selectedSelect}
                            setSelectedSelect={setSelectedSelect}
                            setOpen={setOpen}
                            onSelect={onSelect}
                            iconSize={iconSize}
                            itemStyle={itemStyle}
                            showActiveIcon={showActiveIcon}
                            showActiveColor={showActiveColor}
                        />
                    </Animated.View>
                )}
            </Animated.View>
        </View>
    );
};

