import { Octicons } from '@expo/vector-icons';
import { PressableFeedback } from 'heroui-native';
import { Text, View } from 'react-native';


export const QuizPowerUps = () => {
    return (
        <View className="relative">
            <PressableFeedback
                hitSlop={10}
                className="flex-row items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2"
            >
                <Octicons name="zap" size={14} color="#22D3EE" />
                <Text className="ml-1 text-xs font-poppins-semibold text-cyan-400">
                    50/50
                </Text>
            </PressableFeedback>

            <View className="absolute -bottom-1 left-0 right-0 flex-row items-center justify-center gap-x-1">
                <View className="size-2 rounded-full bg-success" />
                <View className="size-2 rounded-full bg-success" />
                <View className="size-2 rounded-full bg-success" />
            </View>
        </View>
    );
};