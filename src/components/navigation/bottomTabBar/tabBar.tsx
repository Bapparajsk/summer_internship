import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import { GestureTabsController } from './gestureTabsController';

export const BottomTabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
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
                },
                animatedStyle,
            ]}
        >
            <GestureTabsController
                state={state}
                descriptors={descriptors}
                navigation={navigation}
            />
        </Animated.View>
    );
};