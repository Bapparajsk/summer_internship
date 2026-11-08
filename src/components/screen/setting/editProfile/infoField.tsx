import { View, Text } from "react-native";
import type { ReactNode } from "react";
import { PressableFeedback } from "heroui-native";
import If from "@/components/lib/if";

type ProfileInfoFieldProps = {
    label: string;
    value?: string;
    icon?: ReactNode;
    endIcon?: ReactNode
    showWordCount?: boolean
    maxCount?: number

    onPress?: () => void
};

export function ProfileInfoField({
    label,
    value,
    icon,
    endIcon,
    showWordCount,
    maxCount,
    onPress
}: ProfileInfoFieldProps) {
    return (
        <View className="gap-1">
            <Text className="ml-1 font-poppins-medium text-[12px] text-text-primary">
                {label}
            </Text>

            <PressableFeedback onPress={onPress}>
                <View className="min-h-13.5 flex-row items-center gap-1.5 rounded-[16px] border border-border bg-transparent px-3 py-2">
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
            </PressableFeedback>

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
