import { Fragment, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import {
    Copy,
    Eye,
    EyeOff,
    RefreshCw,
    Lock,
    Check,
} from 'lucide-react-native';
import { cn, PressableFeedback, Switch } from 'heroui-native';
import { EvilIcons, Octicons } from '@expo/vector-icons';
import Animated, { Easing, FadeInUp, FadeOutUp, LinearTransition } from "react-native-reanimated"

export type Mode = "public" | "private";

type Props = {
    password: string;
    onPasswordChange: (value: string) => void;
    onGenerate: () => void;
};

export const RoomAccessCode = ({
    password,
    onPasswordChange,
    onGenerate,
}: Props) => {

    const [mode, setMode] = useState<Mode>("public");
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);


    const handleCopy = async () => {
        if (!password.trim()) return;

        await Clipboard.setStringAsync(password);
        setCopied(true);

        // Reset feedback when the user interacts again.
        setTimeout(() => setCopied(false), 1600);
    };

    return (
        <View className="gap-2">
            {/* Header */}
            <View className="gap-1">
                <View className='flex-row items-center justify-between'>
                    <View className="flex-row gap-1 items-center">
                        <Text className="font-poppins-medium text-sm text-text-primary">
                            Room Access Code
                        </Text>

                        <Animated.View
                            layout={LinearTransition.springify().mass(0.8).stiffness(220).damping(40)}
                            className={cn("flex-row items-center gap-1 rounded-full px-2 py-1 border",
                                {
                                    "bg-primary-soft border-primary-border": mode === "private",
                                    "bg-secondary/20 border-border": mode === "public"
                                }
                            )}
                        >
                            {/* {mode === "public" ? <Lock size={11} color="#5CC6E2" />} */}
                            <Octicons
                                name={mode === "private" ? "lock" : "unlock"}
                                size={12}
                                color={mode === "private" ? "#5CC6E2" : "#8FA5B8"} />
                            <Text
                                className={cn("text-[8px] font-poppins-medium leading-normal capitalize",
                                    {
                                        "text-primary": mode === "private",
                                        "text-secondary": mode === "public",
                                    }
                                )}
                            >
                                {mode}
                            </Text>
                        </Animated.View>
                    </View>
                    <Switch
                        isSelected={mode === "private"}
                        onSelectedChange={(isSelected) => {
                            setMode(isSelected ? "private" : "public")
                        }}
                    >
                        {() => (
                            <>
                                <Switch.Thumb>
                                    {({ isSelected }) => (isSelected ? <EvilIcons name="lock" size={24} color="black" /> : <EvilIcons name="unlock" size={24} color="black" />)}
                                </Switch.Thumb>
                            </>
                        )}
                    </Switch>
                </View>

                <Text className="text-[10px] font-poppins-medium leading-5 text-text-secondary">
                    Share this code with participants so they can join your room.
                </Text>
            </View>

            {/* Code container */}
            {mode === "private" && (
                <Animated.View
                    entering={FadeInUp.duration(250).easing(Easing.out(Easing.cubic))}
                    className="gap-2.5"
                >
                    <View
                        className="rounded-xl border border-border bg-white/5 p-3 overflow-hidden relative"
                    >
                        <View className="mb-2 flex-row items-center justify-between">
                            <Text className="text-[10px] font-poppins-semibold tracking-widest text-text-tertiary">
                                YOUR ACCESS CODE
                            </Text>

                            <View className="flex-row items-center gap-1">
                                <Lock size={11} color="#8FA5B8" />
                                <Text className="text-[8px] font-poppins-medium leading-normal text-text-tertiary">
                                    Protected
                                </Text>
                            </View>
                        </View>

                        <View className="flex-row items-center justify-between">
                            <TextInput
                                value={password}
                                onChangeText={onPasswordChange}
                                editable={false}
                                secureTextEntry={!visible}
                                selectTextOnFocus
                                className="flex-1 font-mono text-2xl font-bold tracking-[3px] text-primary"
                            />

                            <View className="flex-row items-center gap-1">
                                <Pressable
                                    onPress={() => setVisible((prev) => !prev)}
                                    hitSlop={8}
                                    className="h-10 w-10 items-center justify-center rounded-lg active:bg-surface-container-high"
                                    accessibilityLabel={visible ? 'Hide access code' : 'Show access code'}
                                >
                                    {visible ? (
                                        <EyeOff size={19} color="#8FA5B8" />
                                    ) : (
                                        <Eye size={19} color="#8FA5B8" />
                                    )}
                                </Pressable>

                                <Pressable
                                    onPress={handleCopy}
                                    hitSlop={8}
                                    className="h-10 w-10 items-center justify-center rounded-lg bg-primary-soft active:opacity-70"
                                    accessibilityLabel="Copy access code"
                                >
                                    {copied ? (
                                        <Check size={18} color="#5CC6E2" />
                                    ) : (
                                        <Copy size={18} color="#5CC6E2" />
                                    )}
                                </Pressable>
                            </View>
                        </View>

                        {copied && (
                            <Text className="mt-1 text-[10px] font-poppins-medium text-success">
                                Access code copied
                            </Text>
                        )}
                    </View>

                    {/* Generate action */}
                    <PressableFeedback
                        onPress={onGenerate}
                        className={"h-11 flex-row items-center justify-center gap-2 rounded-xl border border-border bg-surface-container-high"}
                    >
                        <RefreshCw size={15} color="#5CC6E2" />
                        <Text className="font-poppins-medium text-xs text-text-primary">
                            Generate New Code
                        </Text>
                    </PressableFeedback>
                </Animated.View>
            )}


        </View>
    );
};