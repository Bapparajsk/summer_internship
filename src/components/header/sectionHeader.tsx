import React from "react";
import { Text, View } from "react-native";
import { Href, Link } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { cn } from "heroui-native";
import If from "../lib/if";

export type SectionHeaderProps = {
    href?: Href;
    title: string | React.ReactNode;
    startIcon?: React.ReactNode;
    startEndIcon?: React.ReactNode;
    rightText?: string;
    showRightIcon?: boolean;
    rightIcon?: React.ReactNode;
    className?: string;
};

export const SectionHeader = ({
    href,
    title,
    startIcon,
    startEndIcon,
    rightText = "See all",
    showRightIcon = true,
    rightIcon,
    className
}: SectionHeaderProps) => {
    const content = (
        <View className={cn("flex-row items-center justify-between", className)}>
            {/* Left */}
            <View className="flex-row items-center gap-2">
                {startIcon}

                <If condition={(typeof title === "string")}>
                    <If.Then>
                        <Text className="font-poppins-semibold text-base text-text-primary">
                            {title}
                        </Text>
                    </If.Then>
                    <If.Else>
                        {title}
                    </If.Else>
                </If>
                {startEndIcon}
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