import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { BottomSheet, cn, PressableFeedback } from "heroui-native";
import { useState } from "react";
import { Text, View } from "react-native";
import { PlayerDetails, PlayerDetailsSheet } from "./playerDetailsSheet";

export type LiveUser = PlayerDetails & {
    isYou?: boolean;
};

type LiveUserListProps = {
    users: LiveUser[];
    title?: string;
    isHost: boolean
};

const fallbackPlayer: PlayerDetails = {
    id: "123",
    name: "raj",
    isReady: true,
    joinedAt: "Just now"
}

export function LiveUserList({
    users,
    title = "Players in lobby",
    isHost = false
}: LiveUserListProps) {

    const [selectedUser, setSelectedUser] = useState<LiveUser | null>(null);

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
        <View className="gap-4 rounded-[34px] border border-border bg-white/3 py-4 px-2">
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
                                // Call your API, then update the participant list.
                                console.log("Remove player:", player.id);
                            }}
                        />
                    </BottomSheet.Content>
                </BottomSheet.Portal>
            </BottomSheet>
        </View>
    );
}
