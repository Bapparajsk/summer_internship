
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { Chip, cn, Switch, Tabs } from "heroui-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

type Keys = "1" | "2" | "3";

type Props = {
    initialEnabled?: boolean;
    initialCharges?: Keys;
    onEnabledChange?: (enabled: boolean) => void;
    onChargesChange?: (charges: Keys) => void;
};

export function LifelineCard({
    initialEnabled = true,
    initialCharges = "2",
    onEnabledChange,
    onChargesChange,
}: Props) {
    const [enabled, setEnabled] = useState(initialEnabled);
    const [limitPerRound, setLimitPerRound] = useState(true);
    const [activeTab, setActiveTab] = useState<Keys>(initialCharges);

    const toggleEnabled = () => {
        const next = !enabled;
        setEnabled(next);
        onEnabledChange?.(next);
    };

    return (
        <View className={cn("rounded-[34px] border border-border bg-surface-container-low p-3", !enabled && "opacity-50")}>
            {/* Header */}
            <View className="flex-row items-center gap-3">
                <View className="h-10 w-10 items-center justify-center rounded-xl bg-primary-soft">
                    <Ionicons name="sparkles-outline" size={21} color="#5CC6E2" />
                </View>

                <View className="min-w-0 flex-1">
                    <View className="flex-row flex-wrap items-center gap-2">
                        <Text className="font-poppins-semibold text-base text-text-primary">
                            50/50 Lifeline
                        </Text>
                        <Chip variant="soft" size="sm">
                            <Chip.Label className="text-[10px] leading-normal font-poppins-semibold">POWER-UP</Chip.Label>
                        </Chip>
                    </View>
                    <Text className="text-[10px] font-poppins-medium leading-4 text-text-secondary">
                        Remove two incorrect answers during a question.
                    </Text>
                </View>

                <Switch
                    isSelected={enabled}
                    onSelectedChange={toggleEnabled}
                    className="w-14 h-[28px]"
                    animation={{
                        backgroundColor: {
                            value: ['#172554', '#5CC6E2'],
                        },
                    }}
                >
                    <Switch.Thumb
                        className="size-5.5"
                        animation={{
                            left: {
                                value: 4,
                                springConfig: {
                                    damping: 30,
                                    stiffness: 300,
                                    mass: 1,
                                },
                            },
                        }}
                    />
                    <Switch.EndContent className="mr-1.75">
                        {enabled && (
                            <Animated.View key="moon" entering={ZoomIn.springify()}>
                                <MaterialCommunityIcons name="key-star" size={12} color="black" />
                            </Animated.View>
                        )}
                    </Switch.EndContent>
                </Switch>
            </View>

            {enabled && (
                <View className="mt-4 gap-4 rounded-xl bg-surface-container-lowest p-3">
                    {/* Charges */}
                    <View>
                        <View className="mb-2 flex-row items-center justify-between">
                            <Text className="font-poppins-medium text-sm text-text-primary">
                                Uses per player
                            </Text>
                            <Text className="text-[10px] font-poppins-semibold text-primary">
                                {activeTab} {activeTab === "1" ? "use" : "uses"}
                            </Text>
                        </View>

                        <Tabs value={activeTab} onValueChange={(value) => {
                            setActiveTab(value as Keys)
                        }}>
                            <Tabs.List className="w-full gap-0 bg-primary-soft border border-primary-border">
                                <Tabs.Indicator className="bg-primary" />
                                {[1, 2, 3].map((item) => (
                                    <Tabs.Trigger key={`waiting-room-setting-lifeline-${item}`} value={String(item)} className="w-1/3">
                                        {({ isSelected }) => (
                                            <Tabs.Label className={cn("font-poppins-medium text-sm", isSelected && "text-black")}>{item}</Tabs.Label>
                                        )}
                                    </Tabs.Trigger>
                                ))}


                            </Tabs.List>
                        </Tabs>
                    </View>

                    {/* Usage limit */}
                    <Pressable
                        onPress={() => setLimitPerRound((value) => !value)}
                        className="flex-row items-center gap-3"
                    >
                        <View
                            className={`h-5 w-5 items-center justify-center rounded-md ${limitPerRound
                                ? "bg-primary"
                                : "border border-text-tertiary"
                                }`}
                        >
                            {limitPerRound && (
                                <Octicons name="check" size={13} color="#0D1117" />
                            )}
                        </View>

                        <View className="flex-1">
                            <Text className="font-poppins-medium text-sm text-text-primary">
                                Limit to once per round
                            </Text>
                            <Text className="mt-0.5 text-[10px] font-poppins-medium text-text-secondary">
                                {limitPerRound
                                    ? "Max 1 use per round"
                                    : "No per-round limit"}
                            </Text>
                        </View>

                        <Octicons
                            name="zap"
                            size={17}
                            color={limitPerRound ? "#5CC6E2" : "#8FA5B8"}
                        />
                    </Pressable>

                    {/* Penalty */}
                    <View className="flex-row items-start gap-2 rounded-lg bg-danger-soft px-3 py-2.5">
                        <MaterialCommunityIcons
                            name="shield-alert-outline"
                            size={16}
                            color="#F87171"
                            style={{ marginTop: 1 }}
                        />
                        <Text className="flex-1 text-xs leading-4 font-poppins-semibold text-text-secondary">
                            <Text className="text-danger">
                                Streak penalty:{" "}
                            </Text>
                            <Text className="text-[10px] leading-normal">
                                Using a lifeline deducts 50 points from the streak multiplier.
                            </Text>
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}
