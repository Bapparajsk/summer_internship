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
    showRightText?: boolean;
    rightIcon?: React.ReactNode;
    className?: string;
};

const RightContent = ({ rightText, showRightIcon, rightIcon }: Pick<SectionHeaderProps, 'rightText' | 'showRightIcon' | 'rightIcon'>) => {
    return (
        <View className="flex-row items-center gap-0.5">
            <Text className="font-poppins-medium text-xs text-primary">
                {rightText}
            </Text>

            <If condition={Boolean(showRightIcon)}>
                <If.Then>
                    {(rightIcon ?? (
                        <FontAwesome6
                            name="angle-right"
                            size={12}
                            color="#5CC6E2"
                        />
                    ))}
                </If.Then>
            </If>
        </View>
    );
}

export const SectionHeader = ({
    href,
    title,
    startIcon,
    startEndIcon,
    rightText = "See all",
    showRightIcon = true,
    showRightText = true,
    rightIcon,
    className
}: SectionHeaderProps) => {
    const content = (
        <View className={cn("flex-row items-center justify-between", className)}>
            {/* Left */}
            <View className="flex-row items-center gap-1">
                {startIcon}

                <If condition={(typeof title === "string")}>
                    <If.Then>
                        <Text className="font-poppins-semibold text-sm text-text-primary">
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

            <If condition={Boolean(showRightText && rightText)}>
                <If.Then>
                    <View className="flex-row items-center">
                        <If condition={Boolean(href)}>
                            <If.Then>
                                <Link href={href as Href} asChild>
                                    <RightContent
                                        rightText={rightText}
                                        showRightIcon={showRightIcon}
                                        rightIcon={rightIcon}
                                    />
                                </Link>
                            </If.Then>
                            <If.Else>
                                <RightContent
                                    rightText={rightText}
                                    showRightIcon={showRightIcon}
                                    rightIcon={rightIcon}
                                />
                            </If.Else>
                        </If>

                    </View>
                </If.Then>
            </If>
        </View>
    );

    return content;
};