import { MaterialIcons } from '@expo/vector-icons';
import { PressableFeedback } from 'heroui-native';
import { Text, View } from 'react-native';


export const QuizPowerUps = () => {
    return (
        <View className="flex-row gap-2 border border-red-400">
            <PressableFeedback className="flex-row items-center rounded-full border border-white/10 bg-white/3 px-4 py-2">
                <MaterialIcons
                    name="timer"
                    size={16}
                    color="#22D3EE"
                />
                <Text className="ml-2 text-sm">
                    +15s
                </Text>
            </PressableFeedback>

            <PressableFeedback className="flex-row items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">
                <MaterialIcons
                    name="auto-awesome"
                    size={16}
                    color="#22D3EE"
                />
                <Text className="ml-2 text-sm font-semibold text-cyan-400">
                    Hint
                </Text>
            </PressableFeedback>
        </View>
    );
};