import { Text, View } from "react-native";
import {
    ArrowRight,
} from "lucide-react-native";
import { notificationIcons, NotificationItem } from "./type";
import { PressableFeedback } from "heroui-native/pressable-feedback";

interface NotificationCardProps {
    notification: NotificationItem;
    onPress?: (notification: NotificationItem) => void;
}


export function NotificationCard({
    notification,
    onPress,
}: NotificationCardProps) {

    const Icon = notificationIcons[notification.type];

    const isLive = notification.type === "live";
    const isResult = notification.type === "result";
    const isUnread = !notification.read;


    return (
        <PressableFeedback
            onPress={() => onPress?.(notification)}
            className={[
                "relative overflow-hidden rounded-xl border",
                isUnread
                    ? "border-border bg-surface-container"
                    : "border-border-subtle bg-surface-container-low",
            ].join(" ")}
        >
            {/* Live accent */}
            {isLive && (
                <View className="absolute bottom-0 left-0 top-0 w-1 bg-primary" />
            )}

            <View className="flex-row gap-3 p-3.5">
                {/* Icon */}
                <View
                    className={[
                        "h-10 w-10 items-center justify-center rounded-xl",
                        isLive
                            ? "bg-primary-soft"
                            : "bg-surface-container-high",
                    ].join(" ")}
                >
                    <Icon
                        size={18}
                        color={isLive ? "#5CC6E2" : "#8FA5B8"}
                    />
                </View>

                {/* Content */}
                <View className="min-w-0 flex-1">
                    <View className="flex-row items-start justify-between gap-2">
                        <View className="flex-1">
                            <View className="flex-row items-center gap-2">
                                <Text
                                    numberOfLines={1}
                                    className={[
                                        "flex-1 font-poppins-semibold text-[13px]",
                                        isUnread
                                            ? "text-text-primary"
                                            : "text-text-secondary",
                                    ].join(" ")}
                                >
                                    {notification.title}
                                </Text>
                            </View>

                            <Text className="mt-1 font-poppins-medium text-[11px] leading-4 text-text-secondary">
                                {notification.description}
                            </Text>
                        </View>

                        <View className="flex-row items-center gap-1">
                            {isUnread && (
                                <View className="h-1.5 w-1.5 rounded-full bg-primary" />
                            )}

                            <Text className="font-poppins-medium text-[9px] text-text-secondary">
                                {notification.time}
                            </Text>
                        </View>
                    </View>

                    {/* Live */}
                    {isLive && (
                        <View className="mt-3 flex-row items-center justify-between">
                            <View className="flex-row items-center gap-2">
                                <View className="rounded-md bg-primary-soft px-2 py-1">
                                    <Text className="font-poppins-semibold text-[9px] tracking-[0.5px] leading-normal text-primary">
                                        LIVE NOW
                                    </Text>
                                </View>

                                <Text className="font-poppins-medium text-[9px] text-text-tertiary">
                                    {notification.room}
                                </Text>
                            </View>

                            <View className="flex-row items-center gap-1">
                                <Text className="font-poppins-semibold text-[10px] text-primary">
                                    {notification.action}
                                </Text>

                                <ArrowRight size={13} color="#5CC6E2" />
                            </View>
                        </View>
                    )}

                    {/* Result */}
                    {isResult && (
                        <View className="mt-3 flex-row items-center gap-2">
                            {notification.score !== undefined && (
                                <View className="rounded-md bg-primary-soft px-2 py-1">
                                    <Text className="font-poppins-semibold text-[10px] text-primary">
                                        {notification.score}%
                                    </Text>
                                </View>
                            )}

                            {notification.accuracy !== undefined && (
                                <View className="rounded-md bg-primary-soft px-2 py-1">
                                    <Text className="font-poppins-medium text-[10px] text-primary">
                                        {notification.accuracy}% accuracy
                                    </Text>
                                </View>
                            )}

                            {notification.rank !== undefined && (
                                <Text className="font-poppins-medium text-[9px] text-text-tertiary">
                                    Rank #{notification.rank}
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Streak */}
                    {notification.type === "streak" &&
                        notification.multiplier && (
                            <View className="mt-3 self-start rounded-md bg-warning-soft px-2 py-1">
                                <Text className="font-poppins-medium text-[10px] text-warning">
                                    Multiplier {notification.multiplier}
                                </Text>
                            </View>
                        )}

                    {/* Invitation */}
                    {notification.type === "invitation" && (
                        <View className="mt-3 flex-row items-center gap-3">
                            {notification.questions !== undefined && (
                                <Text className="font-poppins-medium text-[9px] text-text-tertiary">
                                    {notification.questions} questions
                                </Text>
                            )}

                            {notification.playersWaiting !== undefined && (
                                <Text className="font-poppins-medium text-[9px] text-text-tertiary">
                                    {notification.playersWaiting} waiting
                                </Text>
                            )}
                        </View>
                    )}

                    {/* Normal notification */}
                    {!isLive &&
                        !isResult &&
                        notification.type !== "streak" &&
                        notification.type !== "invitation" && (
                            <View className="mt-2 self-end">
                                <ArrowRight size={14} color="#8FA5B8" />
                            </View>
                        )}
                </View>
            </View>
        </PressableFeedback>
    );
}