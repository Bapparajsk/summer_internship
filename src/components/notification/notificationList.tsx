import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";


import { NotificationCard } from "./notificationCard";
import { NotificationItem } from "./type";
import { notifications } from "./tempData";

interface NotificationListProps {
    onNotificationPress?: (
        notification: NotificationItem,
    ) => void;
}

export function NotificationList({
    onNotificationPress,
}: NotificationListProps) {
    const today = notifications.filter(
        (notification) => notification.time !== "Yesterday",
    );

    const yesterday = notifications.filter(
        (notification) => notification.time === "Yesterday",
    );

    const sections = [
        {
            id: "today",
            title: "Today",
            data: today,
        },
        {
            id: "yesterday",
            title: "Yesterday",
            data: yesterday,
        },
    ].filter((section) => section.data.length > 0);

    const renderItem = ({
        item,
    }: {
        item: NotificationItem;
    }) => (
        <View className="mb-2.5">
            <NotificationCard
                notification={item}
                onPress={onNotificationPress}
            />
        </View>
    );

    return (
        <FlashList
            data={sections.flatMap((section) => [
                {
                    type: "header" as const,
                    id: `header-${section.id}`,
                    title: section.title,
                },
                ...section.data.map((item) => ({
                    type: "notification" as const,
                    id: item.id,
                    notification: item,
                })),
            ])}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
                if (item.type === "header") {
                    return (
                        <View className="mb-2 mt-5">
                            <Text className="font-poppins-semibold text-xs uppercase tracking-[1px] text-text-primary">
                                {item.title}
                            </Text>

                            {item.title === "Today" && (
                                <Text className="mt-0.5 font-poppins-light text-[10px] text-text-tertiary">
                                    Recent
                                </Text>
                            )}
                        </View>
                    );
                }

                return renderItem({
                    item: item.notification,
                });
            }}
            contentContainerStyle={{
                paddingBottom: 32,
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<AllCaughtUp />}
        />
    );
}

function AllCaughtUp() {
    return (
        <View className="items-center py-10">
            <View className="mb-3 h-10 w-10 items-center justify-center rounded-full bg-surface-container">
                <Text className="text-sm text-text-tertiary">✓</Text>
            </View>

            <Text className="font-poppins-semibold text-xs text-text-primary">
                All caught up
            </Text>

            <Text className="mt-1 text-center font-poppins-light text-[10px] text-text-tertiary">
                No pending quiz assignments or unread alerts.
            </Text>
        </View>
    );
}