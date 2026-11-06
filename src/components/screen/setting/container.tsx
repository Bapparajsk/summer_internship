import { cn } from 'heroui-native';
import { ReactNode } from 'react'
import { View, Text } from 'react-native'

export type ContainerProps = {
    children: ReactNode;
    title: string;
    className?: string;
}

export const Container = ({children, title, className}: ContainerProps) => {
    return (
        <View>
            <Text className="px-1 font-poppins-semibold text-[11px] tracking-[1px] text-text-secondary uppercase">
                {title}
            </Text>

            <View className={cn("rounded-[28px] border border-border bg-white/5", className)}>
                {children}
            </View>
        </View>
    )
}