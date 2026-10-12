import { useMemo } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from 'expo-router/react-navigation';
import If from '@/components/lib/if';
import { getBottomTabIcon } from '../../lib/icon';

export type TabProps =
    Pick<
        BottomTabBarProps,
        "descriptors" | "navigation" | "state"
    > & {
        route: NavigationRoute<ParamListBase, string>;
        index: number;
    };

const isProfileTab = (label: string) => label.toLowerCase() === 'profile';

const ICON_SIZE = 18;

export default function Tab({
    route,
    index,
    descriptors,
    state,
    navigation,
}: TabProps) {

    const { options } = descriptors[route.key];

    const label =
        options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : route.name;

    const { active, inactive } = useMemo(() => {
        return getBottomTabIcon(label.toString().toLowerCase());
    }, [label]);

    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    return (
        <TouchableOpacity
            key={route.key}
            onPress={onPress}
            activeOpacity={0.8}
            className={'w-16 h-12 rounded-full items-center justify-center overflow-hidden border border-transparent'}
        >
            <If condition={isProfileTab(label.toString())}>
                <If.Then>
                    <Image
                        style={{
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            borderRadius: 9999,
                        }}
                        source={{ uri: "https://img.freepik.com/premium-photo/avatar-profile-picture-white-background_880763-10255.jpg?w=1480" }}
                    />
                </If.Then>
                <If.Else>
                    <If condition={isFocused}>
                        <If.Then>
                            <active.Icon
                                name={active.name}
                                size={ICON_SIZE}
                                color={"rgba(255, 255, 255, 0.95)"}
                            />
                        </If.Then>

                        <If.Else>
                            <inactive.Icon
                                name={inactive.name}
                                size={ICON_SIZE}
                                color={"rgba(255, 255, 255, 0.30)"}
                            />
                        </If.Else>
                    </If>
                </If.Else>
            </If>
            <Text
                className={'text-[9px] leading-normal mt-0.5 font-poppins-semibold'}
                style={{ color: isFocused ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.30)" }}
            >
                {label.toString()}
            </Text>
        </TouchableOpacity>
    );
}