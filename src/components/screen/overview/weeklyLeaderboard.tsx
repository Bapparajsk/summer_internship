import { Image, Text, View } from "react-native";
import { Card } from "heroui-native/card";
import { LinearGradient } from "expo-linear-gradient";
import { cn, PressableFeedback } from "heroui-native";
import { SectionHeader } from "../../header/sectionHeader";
import { Octicons } from "../../lib/icon";
import If from "@/components/lib/if";

interface LeaderboardUser {
    rank: number;
    name: string;
    initials?: string;
    avatar?: string;
    xp: number;
    change?: number;
    isCurrentUser?: boolean;
}

const leaderboard: LeaderboardUser[] = [
    {
        rank: 1,
        name: "Alex Lind",
        initials: "AL",
        xp: 2840,
    },
    {
        rank: 2,
        name: "Elena Vance",
        initials: "EV",
        xp: 2610,
    },
    {
        rank: 14,
        name: "You",
        xp: 2340,
        change: 340,
        isCurrentUser: true,
        initials: "BR",
    },
];

const UserAvatar = ({
    user,
}: {
    user: LeaderboardUser;
}) => {
    if (user.avatar) {
        return (
            <Image
                source={{ uri: user.avatar }}
                className="h-8 w-8 rounded-full"
            />
        );
    }

    return (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest">
            <Text className="font-poppins-semibold text-[10px] leading-normal text-text-secondary">
                {user.initials}
            </Text>
        </View>
    );
}

const XpLable = ({ lable }: { lable: string }) => {
    return (
        <Text className="font-poppins-semibold text-[10px] font-semibold text-primary">
            {lable} XP
        </Text>
    )
}

const LeaderboardRow = ({
    user,
}: {
    user: LeaderboardUser;
}) => {


    return (
        <PressableFeedback
            className={cn("flex-row items-center justify-between rounded-xl px-2.5 py-2 border border-border",
                {
                    "border-primary-border bg-primary-soft": user.isCurrentUser,
                    "bg-surface-container-high/60": !user.isCurrentUser
                }
            )}
        >
            <PressableFeedback.Ripple
                animation={{
                    backgroundColor: { value: user.isCurrentUser ? '#5CC6E2' : '#8FA5B8' },
                    opacity: { value: [0, 0.1, 0] },
                    progress: { baseDuration: 600 },
                }}
            />
            {/* Left */}
            <View className="flex-1 flex-row items-center gap-x-1">
                <Text
                    className={cn("w-7 text-center font-poppins-semibold text-[10px]", {
                        "text-primary": user.isCurrentUser,
                        "text-text-tertiary": !user.isCurrentUser
                    })}
                >
                    #{user.rank}
                </Text>

                <UserAvatar user={user} />

                <Text
                    numberOfLines={1}
                    className={cn("flex-1 font-poppins-semibold text-xs", {
                        "text-primary": user.isCurrentUser,
                        "text-text-primary": !user.isCurrentUser
                    })}
                >
                    {user.isCurrentUser ? "You" : user.name}
                </Text>
            </View>

            {/* Right */}
            <View className="flex-row items-center gap-1">
                <If condition={Boolean(user.change)}>
                    <If.Then>
                        <View className="flex-row gap-1">
                            <XpLable lable={`+${user.change}`} />
                            <Octicons name="arrow-up" size={14} color="#5CC6E2" />
                        </View>
                    </If.Then>
                    <If.Else>
                        <XpLable lable={user.xp.toLocaleString()} />
                    </If.Else>
                </If>
            </View>
        </PressableFeedback>
    );
}

export const WeeklyLeaderboard = () => {
    return (
        <View className="gap-3">
            {/* Header */}
            <SectionHeader
                title={"Weekly leaderboard"}
                startEndIcon={
                    <Octicons name="trophy" size={17} color="#8FA5B8" />
                }
            />

            {/* Card */}
            <Card className="rounded-[30px] border border-border bg-white/4">
                <Card.Body className="gap-3">
                    {/* League header */}
                    <View className="flex-row items-center justify-between border-b border-border-subtle pb-3">
                        <View className="flex-row items-center gap-1.5">
                            <View className="size-1.5 rounded-full bg-primary" />

                            <Text className="font-poppins-semibold text-[10px] uppercase tracking-wider text-text-secondary">
                                Diamond League
                            </Text>
                        </View>

                        <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                            Ends in 2d 14h
                        </Text>
                    </View>

                    {/* Users */}
                    <View className="gap-2">
                        {leaderboard.map((user) => (
                            <LeaderboardRow
                                key={user.rank}
                                user={user}
                            />
                        ))}
                    </View>

                </Card.Body>
            </Card>
        </View>
    );
}