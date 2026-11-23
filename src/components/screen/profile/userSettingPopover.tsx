import { View } from 'react-native'
import { SelectOption, SelectPopover } from '@/components/select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { options, optionsHref } from './constant';
import { useRouter } from 'expo-router';
import { Fragment } from 'react/jsx-runtime';
import { BottomSheet, type BottomSheetRef } from 'heroui-native';
import { useRef } from 'react';
import { BottomSheetContent } from '../setting/changeAvatar/bottomSheetContent';
import { useLogout } from "@/hooks/auth/useLogout";

export const UserSettingPopover = () => {

    const router = useRouter();
    const { logout } = useLogout();

    const sheetRef = useRef<BottomSheetRef>(null);

   
    const handelOnSelect = (item: SelectOption) => {

        if (item.id === "change-avatar") {
            sheetRef.current?.present();
            return;
        }

        if(item.id === "log-out") {
            logout();
        }

        const url = optionsHref[item.id];
        if (url) {
            router.push(url);
            return;
        }
    }

    return (
        <Fragment>
            <View className="absolute right-4 top-4 z-10 flex-row gap-2">
                <SelectPopover
                    items={options}
                    showActiveIcon={false}
                    showActiveColor={false}
                    separators={[3]}
                    activeIsOpenText="Account Center"
                    activeIsOpenTextPosition="right"
                    containerClassName="border-white/20"
                    activeContent={
                        <MaterialCommunityIcons
                            name="account-cog-outline"
                            size={18}
                            color="#9CA3AF"
                        />
                    }
                    triggerClassName="px-3 py-2"
                    itemStyle={{
                        labelClassName: "text-[10px]"
                    }}
                    iconSize={12}
                    activeIsOpenTextClassName='text-xs font-poppins-medium'
                    onSelect={handelOnSelect}
                />
            </View>
            <BottomSheet
                ref={sheetRef}
                detents={[0.9]}
            >
                <BottomSheetContent />
            </BottomSheet>
        </Fragment>
    )
}
