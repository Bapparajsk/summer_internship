import { ControlField, Description, Label } from "heroui-native";
import { Text, View } from "react-native";

type SettingRowWithSwitchProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    value: boolean;
    enabled?: boolean
    onValueChange: (value: boolean) => void;
};

export const SettingRowWithSwitch = ({
    title,
    description,
    icon,
    value,
    enabled = true,
    onValueChange,
}: SettingRowWithSwitchProps) => {
    return (
        <View className="h-18 flex-row items-center justify-between px-3 py-3">
            <ControlField
                isSelected={value}
                isDisabled={!enabled}
                onSelectedChange={onValueChange}
                className="flex-col items-start gap-1"
            >
                <View className="w-full flex-row items-center justify-between">
                    <View className="flex-1 flex-row items-center gap-3">
                        <View className="h-9 w-9 items-center justify-center rounded-xl bg-white/8 border border-border">
                            {icon}
                        </View>

                        <View className="flex-1 gap-0.5">
                            <Label>
                                <Text className="font-poppins-medium text-[14px] text-text-primary">
                                    {title}
                                </Text>
                            </Label>
                            <Description className="font-poppins-light text-[11px] leading-[16px] text-text-secondary">
                                {description}
                            </Description>
                        </View>
                    </View>

                    <ControlField.Indicator className="mt-0.5" variant="switch">

                    </ControlField.Indicator>
                </View>
            </ControlField>
        </View>
    );
}