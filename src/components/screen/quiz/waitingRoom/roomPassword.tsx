import { Octicons } from '@expo/vector-icons'
import { View, Text } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'
import * as Clipboard from "expo-clipboard";
import { useCallback, useEffect, useRef, useState } from 'react';
import { PressableFeedback } from 'heroui-native';

export type RoomPasswordProps = {
    passkey: string;
    enabled: boolean;
}

export const RoomPassword = ({ enabled, passkey }: RoomPasswordProps) => {
    const [showPasskey, setShowPasskey] = useState(false);
    const [copied, setCopied] = useState(false);

    const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const copyText = useCallback(async (value: string) => {
        try {
            await Clipboard.setStringAsync(value);

            setCopied(true);

            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }

            resetTimer.current = setTimeout(() => {
                setCopied(false);
                resetTimer.current = null;
            }, 3000);
        } catch (error) {
            console.error("Failed to copy passkey:", error);
        }
    }, []);

    useEffect(() => {
        return () => {
            if (resetTimer.current) {
                clearTimeout(resetTimer.current);
            }
        };
    }, []);

    return (
        <View className="gap-2.5">
            <Animated.View
                className={`rounded-xl border p-3 ${enabled
                    ? "border-primary/40 bg-primary-soft"
                    : "border-border-subtle bg-surface-container-lowest opacity-50"
                    }`}

                layout={LinearTransition.springify().stiffness(120).damping(20).mass(0.5)}
            >
                <View className="flex-row items-start gap-3">
                    <View
                        className={`h-5 w-5 items-center justify-center rounded-full ${enabled
                            ? "bg-primary"
                            : "border border-text-tertiary"
                            }`}
                    >
                        {enabled && (
                            <Octicons name="check" size={13} color="#0D1117" />
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
                    <Octicons name="passkey-fill" size={19} color={enabled ? "#5CC6E2" : "#8FA5B8"} />
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

                        <PressableFeedback
                            onPress={() => setShowPasskey((v) => !v)}
                            hitSlop={8}
                            accessibilityLabel={
                                showPasskey ? "Hide passkey" : "Show passkey"
                            }
                        >
                            {showPasskey ? (
                                <Octicons name="eye-closed" size={17} color="#8FA5B8" />
                            ) : (
                                <Octicons name="eye" size={17} color="#8FA5B8" />
                            )}
                        </PressableFeedback>

                        <View className="mx-3 h-6 w-px bg-border" />

                        <PressableFeedback
                            onPress={() => copyText(passkey)}
                            hitSlop={8}
                            accessibilityLabel="Copy passkey"
                        >
                            <Octicons name="copy" size={17} color={copied ? "#4ADE80" : "#8FA5B8"} />
                        </PressableFeedback>
                    </View>
                )}

                {copied && (
                    <Text className="mt-1 text-right text-[10px] font-poppins-medium text-success">
                        Copied to clipboard
                    </Text>
                )}
            </Animated.View>
        </View>
    )
}