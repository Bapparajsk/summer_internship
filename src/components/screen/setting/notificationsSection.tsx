
import { useState } from "react";
import { View, Text, } from "react-native";
import { SettingRowWithSwitch } from "./settingRowWithSwitch";
import { Container } from "./container";
import { Switch } from "heroui-native";
import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";


export function NotificationsSection() {
    const [master, setMaster] = useState(true);

    const [settings, setSettings] = useState({
        invitations: true,
        liveQuiz: true,
        achievements: true,
        dailyReminder: true,
    });

    const updateSetting = (
        key: keyof typeof settings,
        value: boolean
    ) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const items = [
        {
            key: "invitations",
            title: "Quiz Invitations",
            description: "When friends invite you to a room",
            icon:<MaterialIcons name="group-add" size={18} color="#8FA5B8" />,
        },
        {
            key: "liveQuiz",
            title: "Live Quiz Reminders",
            description: "Upcoming scheduled quiz sessions",
            icon: <Octicons name="zap" size={18} color="#8FA5B8"/>,
        },
        {
            key: "dailyReminder",
            title: "Daily Learning Reminder",
            description: "Daily learning reminder at 8:00 PM",
            icon: <Octicons name="clock" size={18} color="#8FA5B8" />,
        },
    ] as const;

    return (
        <Container title="Notifications">
            {/* Master toggle */}
            <View className="h-19 flex-row items-center justify-between px-3 py-3">
                <View className="flex-1 flex-row items-center gap-3">
                    <View className="h-9 w-9 items-center justify-center rounded-xl bg-primary-soft border border-primary-soft">
                        <MaterialCommunityIcons name="bell-ring-outline" size={18} color="#5CC6E2" />
                    </View>

                    <View className="flex-1 gap-0.5">
                        <Text className="font-poppins-semibold text-[14px] text-text-primary">
                            Push Notifications
                        </Text>
                        <Text className="font-poppins-light text-[11px] text-text-secondary">
                            Manage all notification alerts
                        </Text>
                    </View>
                </View>

                <Switch isSelected={master} onSelectedChange={setMaster}>
                    <Switch.Thumb />
                </Switch>
            </View>

            <View className="h-px bg-border" />

            <View className="w-full h-auto p-2">
                <View className="border border-border rounded-[24px]">
                    {items.map((item, index) => (
                        <View key={item.key}>
                            <SettingRowWithSwitch
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                                value={settings[item.key]}
                                enabled={master}
                                onValueChange={(value) =>
                                    updateSetting(item.key, value)
                                }
                            />

                            {index !== items.length - 1 && (
                                <View className="h-px bg-border" />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        </Container>
    );
}
