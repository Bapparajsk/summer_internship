import { View, Text } from "react-native";
import type { ReactNode } from "react";
import { cn, PressableFeedback } from "heroui-native";
import If from "@/components/lib/if";

export type ProfileInfoFieldProps = {
    label: string;
    rightLabel?: string;
    value?: string;
    icon?: ReactNode;
    endIcon?: ReactNode;
    showWordCount?: boolean;
    maxCount?: number;
    isButton?: boolean;
    className?: string;

    onPress?: () => void;
};


export function ProfileInfoField({
    label,
    rightLabel,
    value,
    icon,
    endIcon,
    showWordCount,
    maxCount,
    isButton = true,
    className,

    onPress
}: ProfileInfoFieldProps) {

    const Is = isButton ? PressableFeedback : View;

    return (
        <View className="gap-1">
            <View className="flex-row justify-between items-center px-1">
                <Text className="font-poppins-medium text-xs text-text-primary">
                    {label}
                </Text>
                <If condition={Boolean(rightLabel)}>
                    <If.Then>
                        <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                            {rightLabel}
                        </Text>
                    </If.Then>
                </If>
            </View>

            <Is onPress={onPress}>
                <View className={cn("min-h-13.5 flex-row items-center gap-1.5 rounded-[16px] border border-border bg-transparent px-3 py-2", className)}>
                    {icon && <View className="h-9 w-9 items-center justify-center border border-border rounded-xl bg-transparent">
                        {icon}
                    </View>}

                    <View className="flex-1 justify-center">
                        <Text className="font-poppins-medium text-xs leading-5 text-text-secondary">
                            {value ?? "Not provided"}
                        </Text>
                    </View>

                    {endIcon}
                </View>
            </Is>

            <If condition={Boolean(showWordCount)}>
                <If.Then>
                    <View className="items-end">
                        <Text
                            className="text-[10px] font-poppins-medium text-text-tertiary mr-1"
                        >
                            {value?.split("").length} / {maxCount}
                        </Text>
                    </View>
                </If.Then>
            </If>
        </View>
    );
}
