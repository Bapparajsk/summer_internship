import {
    useCallback,
    useMemo,
    useState,
} from 'react';

import { Select } from 'heroui-native';
import { ProfileInfoField, ProfileInfoFieldProps,  } from './infoField';

import Animated, {
    Easing,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { SelectOption } from './roles';
import { BottomContent } from './selectBottomContent';

export type SelectRolesProps = {
    current?: SelectOption;
    onChange: (value: SelectOption) => void;
    data: SelectOption[]

    label: ProfileInfoFieldProps["label"];
    icon: ProfileInfoFieldProps["icon"];
    endIcon: ProfileInfoFieldProps["endIcon"];
}

export const SelectRoles = ({ current, onChange, label, icon, endIcon, data }: SelectRolesProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedRole = useMemo(
        () => data.find(item => item.value === current?.value),
        [current, data]
    );

    const iconStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: withTiming(isOpen ? '-90deg' : '90deg', {
                    duration: 180,
                    easing: Easing.out(Easing.cubic),
                }),
            },
        ],
    }));


    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);
    }, []);

    const handelValueChange = (value: SelectOption | undefined) => {
        if (value === undefined) return;

        onChange(value);
    }

    return (
        <>
            <ProfileInfoField
                onPress={() => setIsOpen(true)}
                label={label}
                value={selectedRole?.label}
                icon={icon}
                endIcon={
                    <Animated.View style={iconStyle}>
                        {endIcon}
                    </Animated.View>
                }
            />

            <Select
                isOpen={isOpen}
                onOpenChange={handleOpenChange}
                value={current}
                onValueChange={handelValueChange}
                presentation="bottom-sheet"
            >
                <Select.Portal>
                    <Select.Overlay />

                    <BottomContent data={data} />
                </Select.Portal>
            </Select>
        </>
    );
}