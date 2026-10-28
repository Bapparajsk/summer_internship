import { Fragment, useState } from "react";
import { Text, View } from "react-native";
import {
    AlertTriangle,
    Clock3,
    LogIn,
    UserRound,
} from "lucide-react-native";
import { Button, CloseButton } from "@/components/ui/button";
import { Chip, cn, Dialog } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";

export type PlayerDetails = {
    id: string;
    name: string;
    isReady: boolean;
    joinedAt: string;
};

type Props = {
    player: PlayerDetails;
    visible: boolean;
    onClose: () => void;
    onRemove: (player: PlayerDetails) => void;
};

export function PlayerDetailsSheet({
    player,
    visible,
    onClose,
    onRemove,
}: Props) {
    const [confirmVisible, setConfirmVisible] = useState(false);

    const closeSheet = () => {
        setConfirmVisible(false);
        onClose();
    };

    const confirmRemoval = () => {
        setConfirmVisible(false);
        onRemove(player);
        onClose();
    };

    return (
        <Fragment>
            <View>
                {/* Header */}
                <View className="mb-4 flex-row items-start justify-between">
                    <View className="flex-1">
                        <Text className="font-poppins-semibold text-xl text-text-primary">
                            Player Details
                        </Text>
                        <Text className="text-xs font-poppins-medium text-text-secondary">
                            Manage this player&apos;s room access.
                        </Text>
                    </View>

                    <CloseButton
                        onPress={closeSheet}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Close player details"
                    />
                </View>

                {/* Player profile */}
                <View className="mb-3 flex-row items-center gap-3 rounded-2xl bg-surface-container p-3">
                    <View className="size-12 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-surface-container-highest">
                        <UserRound size={27} color="#8FA5B8" />
                    </View>

                    <View className="min-w-0 flex-1">
                        <View className="flex-row items-center gap-x-1">
                            <Text
                                numberOfLines={1}
                                className="font-poppins-semibold text-base text-text-primary"
                            >
                                {player.name}
                            </Text>
                            <Chip variant="soft" color="success" size="sm" className="border border-success/50">
                                <View className="size-1.5 rounded-full bg-success" />
                                <Chip.Label className="text-[10px] font-poppins-semibold leading-normal">
                                    Online
                                </Chip.Label>
                            </Chip>
                            <Chip
                                size="sm"
                                className={cn("border border-border",
                                    player.isReady ? "bg-primary-soft border-primary-border" : "bg-surface-container-high"
                                )}
                            >
                                <Ionicons
                                    name={player.isReady ? "checkmark-sharp" : "timer-outline"}
                                    size={13}
                                    color={player.isReady ? "#5CC6E2" : "#8FA5B8"}
                                />
                                <Text
                                    className={cn("text-[10px] leading-normal font-poppins-semibold",
                                        player.isReady ? "text-primary" : "text-text-secondary"
                                    )}
                                >
                                    {player.isReady ? "Ready" : "Waiting"}
                                </Text>
                            </Chip>
                        </View>

                        <Text
                            numberOfLines={1}
                            className="text-[10px] font-poppins-medium text-text-secondary lowercase"
                        >
                            @{player.name}
                        </Text>
                    </View>
                </View>

                {/* Session information */}
                <View className="mb-5 flex-row items-center justify-between rounded-xl bg-surface-container-high/60 px-3 py-3">
                    <View className="flex-row items-center gap-2">
                        <Clock3 size={17} color="#8FA5B8" />
                        <Text className="text-xs font-poppins-medium text-text-secondary">
                            Joined room
                        </Text>
                    </View>

                    <View className="flex-row items-center gap-1.5">
                        <Text className="font-poppins-medium text-xs text-text-primary">
                            {player.joinedAt}
                        </Text>
                        <LogIn size={15} color="#8FA5B8" />
                    </View>
                </View>
                {/* Remove action */}
                <Button
                    onPress={() => setConfirmVisible(true)}
                    title={`Remove ${player.name}`}
                    variant="danger"
                    leftIcon="person-remove-outline"
                />
                <Text className="mt-2 text-center font-poppins-medium text-[10px] leading-4 text-text-tertiary">
                    This player will lose access to the room.
                </Text>
            </View>
            <Dialog isOpen={confirmVisible} onOpenChange={confirmRemoval}>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-black/80" />
                    <Dialog.Content>

                        <View className="mb-3 h-12 w-12 items-center justify-center self-center rounded-full bg-danger-soft">
                            <AlertTriangle
                                size={25}
                                color="#F87171"
                            />
                        </View>

                        <Text className="text-center font-poppins-semibold text-lg text-text-primary">
                            Remove {player.name}?
                        </Text>

                        <Text className="mt-2 text-center text-xs font-poppins-medium leading-5 text-text-secondary">
                            This player will be disconnected and may need valid room access to rejoin.
                        </Text>

                        <View className="mt-5 gap-2">

                            <View className="w-full flex-row gap-y-2">
                                <View className="w-1/2 pr-1">
                                    <Button
                                        onPress={confirmRemoval}
                                        title="Remove"
                                        variant="danger"
                                        leftIcon="remove-circle-outline"
                                    />
                                </View>
                                <View className="w-1/2 pl-1">
                                    <Button
                                        title="Cancel"
                                        variant="outline"
                                        onPress={() => setConfirmVisible(false)}
                                    />
                                </View>
                            </View>
                        </View>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </Fragment>
    );
}
