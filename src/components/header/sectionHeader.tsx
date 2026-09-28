import React from "react";
import { Text, View } from "react-native";
import { Href, Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";

export type SectionHeaderProps = {
    href?: Href;
    title: string;
    startIcon?: React.ReactNode;
    rightText?: string;
    showRightIcon?: boolean;
    rightIcon?: React.ReactNode;
};

export const SectionHeader = ({
    href,
    title,
    startIcon,
    rightText,
    showRightIcon = true,
    rightIcon,
}: SectionHeaderProps) => {
    const content = (
        <View className="flex-row items-center justify-between px-margin">
            {/* Left */}
            <View className="flex-row items-center gap-2">
                {startIcon}

                <Text className="font-poppins-semibold text-base text-text-primary">
                    {title}
                </Text>
            </View>

            {/* Right */}
            {rightText && (
                <View className="flex-row items-center">
                    {href ? (
                        <Link href={href} asChild>
                            <View className="flex-row items-center gap-1">
                                <Text className="font-poppins-medium text-sm text-primary">
                                    {rightText}
                                </Text>

                                {showRightIcon &&
                                    (rightIcon ?? (
                                        <FontAwesome6
                                            name="angle-right"
                                            size={14}
                                            color="#5CC6E2"
                                        />
                                    ))}
                            </View>
                        </Link>
                    ) : (
                        <View className="flex-row items-center gap-1">
                            <Text className="font-poppins-medium text-sm text-primary">
                                {rightText}
                            </Text>

                            {showRightIcon &&
                                (rightIcon ?? (
                                    <FontAwesome6
                                        name="angle-right"
                                        size={14}
                                        color="#5CC6E2"
                                    />
                                ))}
                        </View>
                    )}
                </View>
            )}
        </View>
    );

    return content;
};