import { useMemo } from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from 'expo-router/build/react-navigation/bottom-tabs';
import { NavigationRoute, ParamListBase } from 'expo-router/react-navigation';
import If from '@/components/if';
import getIcon from './icon';

export type TabProps =
    Pick<
        BottomTabBarProps,
        "descriptors" | "navigation" | "state"
    > & {
        route: NavigationRoute<ParamListBase, string>;
        index: number;
    };

const isProfileTab = (label: string) => label.toLowerCase() === 'profile';

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
        return getIcon(label.toString().toLowerCase());
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
            className={'w-20 h-14 rounded-full items-center justify-center overflow-hidden'}
        >
            {isProfileTab(label.toString()) ?
                <Image
                    style={{
                        width: 22,
                        height: 22,
                        borderRadius: 9999,
                    }}
                    source={{ uri: "https://img.freepik.com/premium-photo/avatar-profile-picture-white-background_880763-10255.jpg?w=1480" }}
                />
                :
                <If condition={isFocused}>
                    <If.Then>
                        <active.Icon
                            name={active.name}
                            size={22}
                            color={"#5CC6E2"}
                        />
                    </If.Then>

                    <If.Else>
                        <inactive.Icon
                            name={inactive.name}
                            size={22}
                            color={"#8FA5B8"}
                        />
                    </If.Else>
                </If>}

            <Text
                className={'text-xs mt-0.5 font-poppins-semibold'}
                style={{ color: isFocused ? "#5CC6E2" : "#8FA5B8" }}
            >
                {label.toString()}
            </Text>
        </TouchableOpacity>
    );
}