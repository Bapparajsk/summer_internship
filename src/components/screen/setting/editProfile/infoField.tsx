
import { View, Text, ScrollView } from "react-native";
import type { ReactNode } from "react";
import { PressableFeedback } from "heroui-native";
import { LinearGradient } from "expo-linear-gradient";

type ProfileInfoFieldProps = {
    label: string;
    value: string;
    icon?: ReactNode;
};

export function ProfileInfoField({
    label,
    value,
    icon,
}: ProfileInfoFieldProps) {
    return (
        <View className="gap-1">
            <Text className="ml-1 font-poppins-medium text-[12px] text-text-secondary">
                {label}
            </Text>

            {/* <PressableFeedback> */}
            <View className="min-h-13.5 flex-row items-center gap-3 rounded-[16px] border border-border bg-transparent px-3">
                {icon && <View className="h-9 w-9 items-center justify-center border border-border rounded-xl bg-transparent">
                    {icon}
                </View>}

                <View className="">
                    <View className="relative max-h-25 flex-1 justify-center">
                        <ScrollView
                            nestedScrollEnabled
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                justifyContent: "center",
                                paddingRight: 10,
                            }}
                        >
                            <Text className="font-poppins-medium text-[14px] leading-5 text-text-primary">
                                {value || "Not provided"}
                            </Text>
                        </ScrollView>

                        {/* Top shadow */}
                        <LinearGradient
                            pointerEvents="none"
                            colors={["#10141A", "transparent"]}
                            className="absolute top-0 left-0 right-0 h-3"
                        />

                        {/* Bottom shadow */}
                        <LinearGradient
                            pointerEvents="none"
                            colors={["transparent", "#10141A"]}
                            className="absolute bottom-0 left-0 right-0 h-3"
                        />
                    </View>
                </View>
            </View>
            {/* </PressableFeedback> */}
        </View>
    );
}
