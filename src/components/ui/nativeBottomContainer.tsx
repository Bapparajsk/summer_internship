import { ReactNode, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

export type NativeBottomContainerProps = {
    children: ReactNode;
    zIndex?: number
    bottomOffset?: number
}

export const NativeBottomContainer = ({ children, zIndex, bottomOffset = 10 }:NativeBottomContainerProps) => {

    const insets = useSafeAreaInsets();

    const bottom = useSharedValue(15 + insets.bottom);

    useEffect(() => {
        bottom.value = withSpring(15 + insets.bottom, {
            damping: 18,
            stiffness: 180,
            mass: 0.5,
        });
    }, [insets.bottom]);

    const animatedStyle = useAnimatedStyle(() => ({
        bottom: bottom.value + 10,
    }));

    return (
        <Animated.View
            style={[
                {
                    position: 'absolute',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 'auto',
                    zIndex
                },
                animatedStyle,
            ]}
        >
            {children}
        </Animated.View>
    )
}


