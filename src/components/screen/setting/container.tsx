import { ReactNode } from 'react'
import { View, Text } from 'react-native'

export type ContainerProps = {
    children: ReactNode;
    title: string;
}

export const Container = ({children, title}: ContainerProps) => {
    return (
        <View className="">
            <Text className="px-1 font-poppins-semibold text-[11px] tracking-[1px] text-text-secondary uppercase">
                {title}
            </Text>

            <View className="rounded-[28px] border border-border bg-white/5">
                {children}
            </View>
        </View>
    )
}