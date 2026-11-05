
import { useState } from "react";
import { View, Text, Pressable, Alert } from "react-native";
import { Container } from "./container";
import { PressableFeedback } from "heroui-native";
import { AntDesign, Entypo, Octicons } from "@expo/vector-icons";
import { SelectPopover } from "@/components/select";

type StorageRowProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    onPress: () => void;
    trailing?: React.ReactNode;
};

function StorageRow({
    title,
    description,
    icon,
    onPress,
    trailing,
}: StorageRowProps) {
    return (
        <Pressable
            onPress={onPress}
            className="h-18 flex-row items-center justify-between px-3 py-3 active:opacity-70"
        >
            <View className="flex-1 flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-xl bg-surface-container-high">
                    {icon}
                </View>

                <View className="flex-1 gap-0.5">
                    <Text className="font-poppins-medium text-[14px] text-text-primary">
                        {title}
                    </Text>
                    <Text className="font-poppins-light text-[11px] text-text-secondary">
                        {description}
                    </Text>
                </View>
            </View>

            {trailing ?? <Entypo name="chevron-right" size={18} color="#8FA5B8" />}
            
        </Pressable>
    );
}

export function StorageDataSection() {
    const [cacheSize, setCacheSize] = useState("142 MB");

    const handleClearCache = () => {
        Alert.alert(
            "Clear cached data?",
            "Temporary files will be removed. Your downloaded quiz packs and account data will remain unchanged.",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Clear Cache",
                    style: "destructive",
                    onPress: () => {
                        // Connect your actual cache-clearing function here.
                        // Update the displayed size after successful clearing.
                        setCacheSize("0 MB");
                    },
                },
            ]
        );
    };


    const className = "px-2 py-1.5 border border-border mb-0.5 bg-blue-400/5";

    return (
        <Container title="Storage & Data">

            {/* Cache */}
            <View className="h-18 flex-row items-center justify-between px-3 py-3">
                <View className="flex-1 flex-row items-center gap-3">
                    <View className="h-9 w-9 items-center justify-center rounded-xl bg-surface-container-high">
                        <Octicons name="trash" size={18} color="#8FA5B8" />
                    </View>

                    <View className="flex-1 gap-0.5">
                        <Text className="font-poppins-medium text-[14px] text-text-primary">
                            Clear Cached Data
                        </Text>
                        <Text className="font-poppins-light text-[11px] text-text-secondary">
                            {cacheSize} used
                        </Text>
                    </View>
                </View>

                <PressableFeedback
                    onPress={handleClearCache}
                    className="rounded-lg border border-border px-3 py-1.5 active:bg-surface-container-high"
                >
                    <Text className="font-poppins-medium text-[11px] text-text-secondary">
                        Clear
                    </Text>
                </PressableFeedback>
            </View>

            <View className="h-px bg-border" />

            {/* Downloaded content */}
            <StorageRow
                title="Downloaded Content"
                description="3 quiz packs · 48 MB"
                icon={<AntDesign name="cloud-download" size={18} color="#8FA5B8" />}
                onPress={() => {
                    // router.push("/settings/downloads");
                }}
            />

            <View className="h-px bg-border" />

            {/* Data usage */}
            <StorageRow
                title="Data Use"
                description="Mobile data / wifi"
                icon={<Entypo name="network" size={18} color="#8FA5B8" />}
                onPress={() => {
                    // router.push("/settings/data-usage");
                }}
                trailing={
                    <SelectPopover
                        items={[
                            {
                                id: "mobole_data",
                                label: "Mobile Data",
                                iconName: "signal",
                                classNames: {
                                    container: className
                                },
                            },
                            {
                                id: "wifi",
                                label: "WiFi",
                                iconName: "wifi",
                                classNames: {
                                    container: className
                                }
                            }
                        ]}
                        containerClassName="border-white/20"
                        triggerClassName="px-2 py-1.5"
                        itemStyle={{
                            labelClassName: "text-[10px]"
                        }}
                        iconSize={12}
                        activeIsOpenTextClassName='text-xs font-poppins-medium'
                    />
                }
            />
        </Container>
    );
}
