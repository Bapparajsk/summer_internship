import { View } from 'react-native'
import { SelectOption, SelectPopover } from '@/components/select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { options, optionsHref } from './constant';
import { useRouter } from 'expo-router';
import { Fragment } from 'react/jsx-runtime';
import { BottomSheet } from 'heroui-native';
import { useState } from 'react';
import { BottomSheetContent } from '../setting/changeAvatar/bottomSheetContent';
export const UserSettingPopover = () => {

    const router = useRouter();

    const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false);

   
    const handelOnSelect = (item: SelectOption) => {

        if (item.id === "change-avatar") {
            setIsOpenBottomSheet(true);
            return;
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
            <BottomSheet isOpen={isOpenBottomSheet} onOpenChange={setIsOpenBottomSheet}>
                <BottomSheet.Portal>
                    <BottomSheet.Overlay className='bg-black/80' />
                    <BottomSheetContent />
                </BottomSheet.Portal>
            </BottomSheet>
        </Fragment>
    )
}
