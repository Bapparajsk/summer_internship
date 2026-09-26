import React, { ReactNode, useEffect, useState } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    WithTimingConfig
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { width } = Dimensions.get("window");

type AnimatedIndexedProps<T> = {
    items: readonly T[];
    index: number;
    renderItem: (item: T, index: number) => ReactNode;
    style?: ViewStyle;
    delay?: number;
    duration?: number;
    easing?: WithTimingConfig["easing"];
    _offset?: number;
};

export function AnimatedIndexed<T>({
    items,
    index,
    renderItem,
    style,
    delay = 100,
    duration = 300,
    easing,
    _offset = 5
}: AnimatedIndexedProps<T>) {
    const [previousIndex, setPreviousIndex] = useState(index);

    useEffect(() => {
        if (index !== previousIndex) {
            scheduleOnRN(setPreviousIndex, index);
        }
    }, [index, previousIndex]);

    return (
        <>
            {items.map((item, itemIndex) => (
                <AnimatedIndexedItem
                    key={itemIndex}
                    itemIndex={itemIndex}
                    currentIndex={index}
                    previousIndex={previousIndex}
                    style={style}
                    delay={delay}
                    duration={duration}
                    easing={easing}
                    _offset={_offset}
                >
                    {renderItem(item, itemIndex)}
                </AnimatedIndexedItem>
            ))}
        </>
    );
}

type AnimatedIndexedItemProps = {
    itemIndex: number;
    currentIndex: number;
    previousIndex: number;
    style?: ViewStyle;
    children: ReactNode;
    delay?: number;
    duration?: number;
    easing?: WithTimingConfig["easing"];
    _offset: number;
};

function AnimatedIndexedItem({
    itemIndex,
    currentIndex,
    previousIndex,
    style,
    children,
    delay = 100,
    duration = 300,
    easing = Easing.out(Easing.cubic),
    _offset = 5
}: AnimatedIndexedItemProps) {
    const translateX = useSharedValue(
        itemIndex === currentIndex
            ? 0
            : itemIndex < currentIndex
                ? -width * _offset
                : width * _offset,

    );

    useEffect(() => {
        if (currentIndex === previousIndex) {
            return;
        }

        const isForward = currentIndex > previousIndex;

        // Incoming
        if (itemIndex === currentIndex) {
            translateX.value = isForward ? width * _offset : -width * _offset;

            translateX.value = withDelay(
                delay,
                withTiming(
                    0,
                    {
                        duration,
                        easing
                    },
                )
            );

            return;
        }

        // Outgoing
        if (itemIndex === previousIndex) {
            translateX.value = withDelay(
                delay,
                withTiming(
                    isForward ? -width * _offset : width * _offset,
                    {duration, easing},
                )
            );

            return;
        }

        // Other cards stay outside
        translateX.value =
            itemIndex < currentIndex
                ? -width * _offset
                : width * _offset;
    }, [
        currentIndex,
        previousIndex,
        itemIndex,
        delay,
        duration,
        easing,
        translateX,
    ]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: translateX.value,
            },
        ],
    }));

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    width: "100%",
                },
                style,
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}