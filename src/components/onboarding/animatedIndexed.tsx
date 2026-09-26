import React, { ReactNode, useEffect, useState } from "react";
import { Dimensions, ViewStyle } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const { width } = Dimensions.get("window");

const SPRING_CONFIG = {
    damping: 18,
    stiffness: 180,
    mass: 0.7,
};

type AnimatedIndexedProps<T> = {
    items: readonly T[];
    index: number;
    renderItem: (item: T, index: number) => ReactNode;
    style?: ViewStyle;
};

export function AnimatedIndexed<T>({
    items,
    index,
    renderItem,
    style,
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
};

function AnimatedIndexedItem({
    itemIndex,
    currentIndex,
    previousIndex,
    style,
    children,
}: AnimatedIndexedItemProps) {
    const translateX = useSharedValue(
        itemIndex === currentIndex
            ? 0
            : itemIndex < currentIndex
              ? -width
              : width,
    );

    useEffect(() => {
        if (currentIndex === previousIndex) {
            return;
        }

        const isForward = currentIndex > previousIndex;

        // Incoming
        if (itemIndex === currentIndex) {
            translateX.value = isForward ? width : -width;

            translateX.value = withSpring(
                0,
                SPRING_CONFIG,
            );

            return;
        }

        // Outgoing
        if (itemIndex === previousIndex) {
            translateX.value = withSpring(
                isForward ? -width : width,
                SPRING_CONFIG,
            );

            return;
        }

        // Other cards stay outside
        translateX.value =
            itemIndex < currentIndex
                ? -width
                : width;
    }, [
        currentIndex,
        previousIndex,
        itemIndex,
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
                    // left: 0,
                    // right: 0,
                },
                style,
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    );
}