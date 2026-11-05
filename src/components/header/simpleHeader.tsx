import { View, Text } from 'react-native'
import { MotionButton } from '@/components/ui/button/motionButton'
import { IconName } from '../lib/icon';
import { ReactNode } from 'react';
import If from '../lib/if';
import { Icon } from '../ui/icon';
import { cn } from 'heroui-native';

export type SimpleHeaderProps = {
    title?: string;
    icon?: {
        name: IconName;
        size?: number;
        color?: string
    };

    titleClassName?: string;

    leftContent?: ReactNode;
    rightContent?: ReactNode;

    onPress?: () => void;
}

export const SimpleHeader = ({ title, icon, titleClassName , leftContent, rightContent, onPress }: SimpleHeaderProps) => {
    return (
        <View className='w-full'>
            <View className='w-full flex-row items-center justify-between'>
                <If condition={Boolean(leftContent)}>
                    <If.Then>
                        {leftContent}
                    </If.Then>

                    <If.Else>
                        <View className='w-20'>
                            <MotionButton
                                className='h-10 flex-row gap-1 w-full'
                                onPress={onPress}
                                
                            >
                                {/* <Ionicons name="arrow-back-circle-outline" size={20} color={"#f87171"} /> */}
                                <If condition={Boolean(icon)}>
                                    <If.Then>
                                        <Icon
                                            name={icon?.name ?? "alert"}
                                            size={icon?.size ?? 14}
                                            color={icon?.color ?? "white"}
                                        />
                                    </If.Then>
                                </If>

                                <If condition={Boolean(title)}>
                                    <If.Then>
                                        <Text className={cn('text-xs font-poppins-semibold', titleClassName)}>
                                            {title}
                                        </Text>
                                    </If.Then>
                                </If>
                            </MotionButton>
                        </View>
                    </If.Else>
                </If>

                {rightContent}
            </View>
        </View>
    )
}