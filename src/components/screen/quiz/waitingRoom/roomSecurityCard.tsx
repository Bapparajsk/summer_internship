
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import {
    LockKeyhole,
    Check,
    KeyRound,
    Eye,
    EyeOff,
    Copy,
    QrCode,
    Info,
    ChevronDown,
    ChevronUp,
} from "lucide-react-native";
import * as Clipboard from "expo-clipboard";
import { cn, Switch } from "heroui-native";
import Animated, { ZoomIn } from "react-native-reanimated";
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";

type SecurityMode = "password" | "code";

type Props = {
    roomCode?: string;
    passkey?: string;
    inviteUrl?: string;
    initialEnabled?: boolean;
    initialMode?: SecurityMode;
    onEnabledChange?: (enabled: boolean) => void;
    onModeChange?: (mode: SecurityMode) => void;
};

export function RoomSecurityCard({
    roomCode = "QF-82K9",
    passkey = "XP-7294",
    inviteUrl = `https://quizflow.app/join/${roomCode}`,
    initialEnabled = true,
    initialMode = "password",
    onEnabledChange,
    onModeChange,
}: Props) {
    const [enabled, setEnabled] = useState(initialEnabled);
    const [mode, setMode] = useState<SecurityMode>(initialMode);
    const [showPasskey, setShowPasskey] = useState(false);
    const [showQr, setShowQr] = useState(false);
    const [copied, setCopied] = useState(false);


    const changeEnabled = () => {
        const next = !enabled;
        setEnabled(next);
        onEnabledChange?.(next);
    };

    const changeMode = (next: SecurityMode) => {
        setMode(next);
        onModeChange?.(next);
    };

    const copyText = async (value: string) => {
        await Clipboard.setStringAsync(value);
        setCopied(true);
    };

    const activePassword = enabled && mode === "password";

    return (
        <View
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
                            "border-primary/20 bg-primary-soft" : enabled
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
                <Octicons name="lock" size={15} color={enabled ? "#4ADE80" : "#8FA5B8"}/>
            </View>

            {/* Access methods */}
            <View className="gap-2.5">
                <Pressable
                    disabled={!enabled}
                    onPress={() => changeMode("password")}
                    className={`rounded-xl border p-3 ${activePassword
                        ? "border-primary/40 bg-primary-soft"
                        : "border-border-subtle bg-surface-container-lowest"
                        } ${enabled ? "" : "opacity-50"}`}
                >
                    <View className="flex-row items-start gap-3">
                        <View
                            className={`h-5 w-5 items-center justify-center rounded-full ${activePassword
                                ? "bg-primary"
                                : "border border-text-tertiary"
                                }`}
                        >
                            {activePassword && (
                                <Check size={13} color="#0D1117" />
                            )}
                        </View>

                        <View className="min-w-0 flex-1">
                            <Text className="font-poppins-semibold text-sm text-text-primary">
                                Password Protected
                            </Text>
                            <Text className="mt-1 text-[10px] leading-5 font-poppins-medium text-text-secondary">
                                Require the room passkey to join
                            </Text>
                        </View>

                        <KeyRound
                            size={19}
                            color={activePassword ? "#5CC6E2" : "#8FA5B8"}
                        />
                    </View>

                    {enabled && (
                        <View className="mt-3 flex-row items-center rounded-[14px] bg-surface-container-lowest px-3 py-3">
                            <View className="min-w-0 flex-1">
                                <Text className="text-[10px] uppercase tracking-widest font-poppins-medium text-text-tertiary">
                                    Room passkey
                                </Text>
                                <Text className="font-poppins-semibold text-xs tracking-widest text-primary">
                                    {showPasskey ? passkey : "••••••••"}
                                </Text>
                            </View>

                            <Pressable
                                onPress={() => setShowPasskey((v) => !v)}
                                hitSlop={8}
                                accessibilityLabel={
                                    showPasskey ? "Hide passkey" : "Show passkey"
                                }
                            >
                                {showPasskey ? (
                                    <EyeOff size={17} color="#8FA5B8" />
                                ) : (
                                    <Eye size={17} color="#8FA5B8" />
                                )}
                            </Pressable>

                            <View className="mx-3 h-6 w-px bg-border" />

                            <Pressable
                                onPress={() => copyText(passkey)}
                                hitSlop={8}
                                accessibilityLabel="Copy passkey"
                            >
                                <Copy
                                    size={17}
                                    color={copied ? "#4ADE80" : "#8FA5B8"}
                                />
                            </Pressable>
                        </View>
                    )}
                </Pressable>
            </View>

            {/* QR access */}
            <View className="overflow-hidden rounded-xl border border-border bg-surface-container-lowest">
                <Pressable
                    onPress={() => setShowQr((v) => !v)}
                    className="flex-row items-center gap-3 p-3"
                >
                    <View className="h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high">
                        <QrCode size={19} color="#5CC6E2" />
                    </View>

                    <View className="min-w-0 flex-1">
                        <Text className="font-poppins-medium text-sm text-text-primary">
                            Quick Join QR Code
                        </Text>
                        <Text className="mt-0.5 text-xs text-text-secondary">
                            Scan to open the room invite
                        </Text>
                    </View>

                    {showQr ? (
                        <ChevronUp size={18} color="#8FA5B8" />
                    ) : (
                        <ChevronDown size={18} color="#8FA5B8" />
                    )}
                </Pressable>

                {showQr && (
                    <View className="items-center border-t border-border p-4">
                        <View className="rounded-2xl bg-white p-3">
                            <QRCode
                                value={inviteUrl}
                                size={164}
                                color="#0D1117"
                                backgroundColor="#FFFFFF"
                            />
                        </View>

                        <Text className="mt-3 text-center font-poppins-medium text-sm text-text-primary">
                            Scan to join QuizFlow
                        </Text>
                        <Text className="mt-1 text-center text-xs text-text-secondary">
                            {roomCode}
                        </Text>

                        <Pressable
                            onPress={() => copyText(inviteUrl)}
                            className="mt-3 flex-row items-center gap-2 rounded-lg bg-primary-soft px-4 py-2.5"
                        >
                            <Copy size={15} color="#5CC6E2" />
                            <Text className="font-poppins-medium text-xs text-primary">
                                Copy invite link
                            </Text>
                        </Pressable>
                    </View>
                )}
            </View>

            {/* Footer */}
            <View className="flex-row items-start gap-2 px-1">
                <Info size={14} color="#8FA5B8" />
                <Text className="flex-1 text-[11px] leading-4 text-text-secondary">
                    Changes affect new join requests after your server applies them.
                </Text>
            </View>

            {copied && (
                <Text className="text-right text-xs text-success">
                    Copied to clipboard
                </Text>
            )}
        </View>
    );
}
