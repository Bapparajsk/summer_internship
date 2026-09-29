import { Text, View } from 'react-native';
import { PressableFeedback } from 'heroui-native/pressable-feedback';
import { FontAwesome6, MaterialIcons } from '../lib/icon';

type AppFooterProps = {
    version?: string;
    university?: string;
};

export const AppFooter = ({
    version = '1.0.0',
    university = 'Elitte Institute of Engineering and Management',
}: AppFooterProps) => {

    return (

        <View className="mt-10 items-center border-t border-white/10">

            {/* Brand */}
            <View className="flex-row items-center mt-5">

                <Text className="ml-2 text-sm font-poppins-semibold">
                    Aether Campus
                </Text>
            </View>

            {/* Team Button */}
            <PressableFeedback
                className="mt-3 flex-row items-center rounded-full border border-white/10 bg-white/4 px-4 py-2"
            >
                <MaterialIcons 
                    name="groups"
                    size={16}
                    color="#A78BFA"
                />

                <Text className="mx-2 font-poppins-semibold text-xs font-medium text-zinc-300">
                    Meet the Team
                </Text>

                <FontAwesome6
                    name="chevron-right"
                    size={13}
                    color="#71717A"
                />
            </PressableFeedback>

            {/* Version */}
            <Text className="mt-3 font-poppins-medium text-center text-[11px] text-zinc-600">
                v{version} • {university}
            </Text>

            <Text className="mt-1 font-poppins-light text-center text-[10px] text-text-disabled">
                © 2026 All Rights Reserved
            </Text>
        </View>
    );
}