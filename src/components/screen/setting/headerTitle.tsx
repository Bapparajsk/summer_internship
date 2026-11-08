import { Separator } from 'heroui-native'
import { View, Text } from 'react-native'

export type HeaderTitleProps = {
    title: string; 
    subtitle: string
}

export const HeaderTitle = ({ title, subtitle }: HeaderTitleProps) => {
    return (
        <View >
            <Text className="font-poppins-semibold text-[28px] leading-9 tracking-[-0.6px] text-text-primary">
                {title}
            </Text>

            <Text className="mt-1 mb-1 font-poppins-medium text-[13px] leading-5 text-text-secondary">
                {subtitle}
            </Text>
            <Separator/>
        </View>
    )
}