import { Separator } from 'heroui-native'
import { View, Text } from 'react-native'

export const HerderTitle = () => {
    return (
        <View >
            <Text className="font-poppins-semibold text-[28px] leading-9 tracking-[-0.6px] text-text-primary">
                Settings
            </Text>

            <Text className="mt-1 mb-1 font-poppins-medium text-[13px] leading-5 text-text-secondary">
                Personalize your QuizFlow experience.
            </Text>
            <Separator/>
        </View>
    )
}