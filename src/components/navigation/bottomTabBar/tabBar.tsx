import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { GestureTabsController } from './gestureTabsController';
import { NativeBottomContainer } from '@/components/ui/nativeBottomContainer';

export const BottomTabBar = ({
    state,
    descriptors,
    navigation,
}: BottomTabBarProps) => {
    return (
        <NativeBottomContainer>
            <GestureTabsController
                state={state}
                descriptors={descriptors}
                navigation={navigation}
            />
        </NativeBottomContainer>
    );
};