import { View, Text } from 'react-native';
import { Wind } from 'lucide-react-native';

export function WaitingExperience() {
    return (
        <View className="flex-row items-center gap-3 rounded-2xl border border-border-subtle bg-surface-container-low/70 p-3">
            {/* Icon */}
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                <Wind size={19} color="#5CC6E2" />
            </View>

            {/* Content */}
            <View className="flex-1 gap-0.5">
                <Text className="font-poppins-semibold text-xs text-text-primary">
                    While you wait...
                </Text>

                <Text className="font-poppins-light text-[10px] leading-3.75 text-text-secondary">
                    Take a breath. Your final results and ranking will appear once everyone finishes.
                </Text>
            </View>
        </View>
    );
}