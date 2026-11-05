
import { View, Text } from "react-native";
import { Container } from "./container";
import { PressableFeedback } from "heroui-native";
import { Entypo, Feather, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";

type SecurityRowProps = {
    title: string;
    icon: React.ReactNode;
    metadata?: string;
    onPress: () => void;
};

function SecurityRow({
    title,
    icon,
    metadata,
    onPress,
}: SecurityRowProps) {
    return (
        <PressableFeedback
            onPress={onPress}
            className="h-16 flex-row items-center justify-between px-3 py-3 z-0"
        >
            <PressableFeedback.Ripple
                animation={{
                    backgroundColor: { value: '#ffffff98' },
                    opacity: { value: [0, 0.1, 0] },
                    progress: { baseDuration: 600 },
                }}
            />
            <View className="flex-row items-center gap-3">
                <View className="h-9 w-9 items-center justify-center rounded-xl bg-white/8 border border-border ">
                    {icon}
                </View>

                <Text className="font-poppins-medium text-[14px] text-text-primary">
                    {title}
                </Text>
            </View>

            <View className="flex-row items-center gap-2">
                {metadata && (
                    <Text className="font-poppins-light text-[11px] text-text-secondary">
                        {metadata}
                    </Text>
                )}
                <Entypo name="chevron-right" size={18} color="#8FA5B8" />
            </View>
        </PressableFeedback>
    );
}

export function PrivacySecuritySection() {

    return (
        <Container title="Privacy & Security" >
            <SecurityRow
                title="Change Password"
                icon={<MaterialIcons name="lock-outline" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />

            <View className="h-px bg-border" />

            <SecurityRow
                title="Account Privacy"
                icon={<Octicons name="shield-check" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />

            <View className="h-px bg-border" />

            <SecurityRow
                title="Blocked Users"
                metadata="0 users"
                icon={<Feather name="user-x" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />

            <View className="h-px bg-border" />

            <SecurityRow
                title="Active Sessions"
                metadata="2 devices"
                icon={<MaterialCommunityIcons name="monitor-cellphone" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />

            {/* Destructive action — separated */}
            {/* <Pressable
                onPress={handleDeleteAccount}
                className="mt-3 min-h-[58px] flex-row items-center justify-between rounded-2xl border border-danger/20 bg-danger-soft px-4 active:opacity-70"
            >
                <View className="flex-row items-center gap-3">
                    <Trash2 size={18} color="#F87171" />

                    <View className="gap-0.5">
                        <Text className="font-poppins-medium text-[13px] text-danger">
                            Delete Account
                        </Text>
                        <Text className="font-poppins-light text-[10px] text-text-secondary">
                            Permanently remove your account
                        </Text>
                    </View>
                </View>

                <ChevronRight size={18} color="#F87171" />
            </Pressable> */}
        </Container>
    );
}
