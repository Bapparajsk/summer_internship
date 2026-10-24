import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheet, cn, PressableFeedback, useToast } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { PlayerDetails, PlayerDetailsSheet } from "./playerDetailsSheet";
import Animated, { LinearTransition } from "react-native-reanimated";

export type LiveUser = PlayerDetails & {
    isYou?: boolean;
};

type LiveUserListProps = {
    title?: string;
    isHost: boolean
};

const fallbackPlayer: PlayerDetails = {
    id: "123",
    name: "raj",
    isReady: true,
    joinedAt: "Just now"
}

const temp_users: LiveUser[] = [
    {
        id: "1",
        name: "Bapparaj",
        joinedAt: "Just now",
        isYou: true,
        isReady: true
    },
    {
        id: "2",
        name: "Rana",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "3",
        name: "Ayon",
        joinedAt: "Just now",
        isReady: false
    },
    {
        id: "11",
        name: "Subhasis",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "12",
        name: "Rohit",
        joinedAt: "Just now",
        isReady: true
    },
    {
        id: "13",
        name: "Akash",
        joinedAt: "Just now",
        isReady: true
    },
];

export function LiveUserList({
    title = "Players in lobby",
    isHost = false,
}: LiveUserListProps) {

    const [users, setUsers] = useState<LiveUser[]>(temp_users);
    const [selectedUser, setSelectedUser] = useState<LiveUser | null>(null);
    const { toast } = useToast();

    const handleOpenPlayerSheet = (user: LiveUser) => {
        if (!isHost || user.isYou) return;
        setSelectedUser(user);
    };

    const handleSheetOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
            setSelectedUser(null);
        }
    };

    return (
        <Animated.View
            layout={LinearTransition.springify().stiffness(200).mass(0.5).damping(20)}
            className="gap-4 rounded-[34px] border border-border bg-white/3 py-4 px-2"
        >
            {/* Header */}
            <View className="flex-row items-center justify-between px-2">
                <View className="flex-row items-center gap-2">
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        {title}
                    </Text>
                </View>

                <View className="flex-row gap-x-0.5 items-center rounded-full bg-primary-soft px-2.5 py-1 ">
                    <FontAwesome5 name="users" size={12} color="#5CC6E2" />
                    <Text className="font-poppins-medium text-xs text-primary">
                        {users.length}
                    </Text>
                </View>
            </View>

            {/* User list */}
            <View className="">
                {users.map((user) => (
                    <PressableFeedback
                        key={user.id}
                        className={cn("flex-row items-center gap-3 py-1.5 px-2", {
                            "bg-white/8 rounded-2xl border border-border": user.isYou
                        })}

                        onPress={() => handleOpenPlayerSheet(user)}
                        isDisabled={!isHost || user.isYou}
                        animation={isHost && !user.isYou ? undefined : "disable-all"}
                    >
                        {/* Avatar */}
                        <View className="size-8 items-center justify-center overflow-hidden rounded-full border border-border bg-surface-container-high">
                            <FontAwesome name="user" size={16} color="#8FA5B8" />
                        </View>

                        {/* Name */}
                        <View className="min-w-0 flex-1">
                            <View className="flex-row items-center gap-2">
                                <Text
                                    numberOfLines={1}
                                    className="shrink font-poppins-medium text-xs text-text-primary"
                                >
                                    {user.name}
                                </Text>

                                {user.isYou && (
                                    <Text className="font-poppins-medium text-[8px] leading-normal text-primary">
                                        You
                                    </Text>
                                )}
                            </View>

                            <Text className="font-poppins-medium text-[10px] leading-normal text-text-tertiary">
                                Joined the lobby
                            </Text>
                        </View>

                        {/* Join time */}
                        <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                            {user.joinedAt}
                        </Text>
                    </PressableFeedback>
                ))}

                {users.length === 0 && (
                    <Text className="py-4 text-center text-sm text-text-tertiary">
                        Waiting for players to join...
                    </Text>
                )}
            </View>
            <BottomSheet isOpen={Boolean(selectedUser)} onOpenChange={handleSheetOpenChange}>
                <BottomSheet.Portal>
                    <BottomSheet.Overlay />
                    <BottomSheet.Content>
                        <PlayerDetailsSheet
                            visible={selectedUser !== null}
                            player={selectedUser ?? fallbackPlayer}
                            onClose={() => handleSheetOpenChange(false)}
                            onRemove={(player) => {
                                setUsers((previous) =>
                                    previous.filter((user) => user.id !== player.id),
                                );

                                // toast.show({
                                //     variant: 'success',
                                //     label: 'You have upgraded your plan',
                                //     description: 'You can continue using HeroUI Chat',
                                //     // icon: <Icon name="check" />,
                                //     actionLabel: 'Close',
                                //     onActionPress: ({ hide }) => hide(),
                                // });
                            }}
                        />
                    </BottomSheet.Content>
                </BottomSheet.Portal>
            </BottomSheet>
        </Animated.View>
    );
}
