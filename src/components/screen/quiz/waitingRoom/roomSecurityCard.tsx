
import { useState } from "react";
import { Text, View } from "react-native";
import { cn, Switch } from "heroui-native";
import Animated, { LinearTransition, ZoomIn } from "react-native-reanimated";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { RoomQRCode } from "./roomQRCode";
import { RoomPassword } from "./roomPassword";


type Props = {
    roomCode: string;
    passkey: string;
    initialEnabled?: boolean;
    onEnabledChange?: (enabled: boolean) => void;
};

export function RoomSecurityCard({
    roomCode,
    passkey,
    initialEnabled = true,
    onEnabledChange,
}: Props) {
    const [enabled, setEnabled] = useState(initialEnabled);
    
    const changeEnabled = () => {
        const next = !enabled;
        setEnabled(next);
        onEnabledChange?.(next);
    };
    
    return (
        <Animated.View
            layout={LinearTransition.springify().stiffness(120).damping(20).mass(0.5)}
            className={cn("gap-3 rounded-[34px] border border-border p-3",
                {
                    "border-primary-border bg-primary/8": enabled
                })}
        >
            {/* Header */}
            <View className="flex-row items-center gap-3">
                <View
                    className={cn("h-11 w-11 items-center justify-center rounded-xl border border-border",
                        {
                            "border-primary/20 bg-primary-soft": enabled
                        }
                    )}
                >
                    <Octicons
                        name={enabled ? "shield-check" : "shield-x"}
                        size={22}
                        color={enabled ? "#5CC6E2" : "#ffffff90"}
                    />
                </View>

                <View className="min-w-0 flex-1">
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Room Security
                    </Text>
                    <Text className="font-poppins-medium text-[10px] leading-normal text-text-secondary">
                        Control who can join your quiz
                    </Text>
                </View>

                <Switch
                    isSelected={enabled}
                    onSelectedChange={changeEnabled}
                    animation={{
                        backgroundColor: {
                            value: ['#31353C', '#5CC6E2'],
                        },
                    }}
                    className="w-13.75 h-6.5 border border-border"
                >
                    <Switch.Thumb
                        className="h-[20px]"
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
                    <Switch.StartContent className="ml-[8px]">
                        {!enabled && (
                            <Animated.View key="shield-x" entering={ZoomIn.springify()}>
                                <Octicons name="shield-x" size={14} color="#000" />
                            </Animated.View>
                        )}
                    </Switch.StartContent>
                    <Switch.EndContent className="mr-[8px]">
                        {enabled && (
                            <Animated.View key="shield" entering={ZoomIn.springify()}>
                                <MaterialCommunityIcons name="shield-key-outline" size={14} color="#000" />
                            </Animated.View>
                        )}
                    </Switch.EndContent>
                </Switch>
            </View>

            {/* Security status */}
            <View className="flex-row items-center gap-2 rounded-lg bg-surface-container-lowest px-3 py-2">
                <View
                    className={`h-2 w-2 rounded-full ${enabled ? "bg-success" : "bg-text-tertiary"
                        }`}
                />
                <Text className="flex-1 text-[10px] leading-normal font-poppins-medium text-text-secondary">
                    {enabled
                        ? "Room protection is enabled"
                        : "Room protection is disabled"}
                </Text>
                <Octicons name="lock" size={15} color={enabled ? "#4ADE80" : "#8FA5B8"} />
            </View>

            {/* Access methods */}
            <RoomPassword enabled={enabled} passkey={passkey}/>

            {/* QR access */}
            <RoomQRCode passkey={passkey} roomCode={roomCode} enabled={enabled}/>

            {/* Footer */}
            <View className="flex-row items-start gap-2 px-1">
                <Octicons name="info" size={14} color="#8FA5B8" />
                <Text className="flex-1 text-[10px] font-poppins-medium leading-4 text-text-secondary">
                    Changes affect new join requests after your server applies them.
                </Text>
            </View>
        </Animated.View>
    );
}
