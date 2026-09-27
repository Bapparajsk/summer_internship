import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { Fragment } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureTabsController } from './gestureTabsController';


export const BottomTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {

    const insets = useSafeAreaInsets();

    return (
        <Fragment>
            <View
                style={[{
                    position: 'absolute',
                    alignSelf: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 'auto',
                    bottom: 15 + insets.bottom

                }]}
            >
                <GestureTabsController state={state} descriptors={descriptors} navigation={navigation} />
            </View>
        </Fragment>
    )
}