import { View, Text } from "react-native";
import { Container } from "./container";
import { PressableFeedback } from "heroui-native";
import { Entypo, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

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

    const router = useRouter();

    return (
        <Container title="Privacy & Security" >
            <SecurityRow
                title="Change Password"
                icon={<MaterialIcons name="lock-outline" size={18} color="#8FA5B8" />}
                onPress={() => { router.push("/setting/changePassword") }}
            />

            <View className="h-px bg-border" />

            <SecurityRow
                title="Account Privacy"
                icon={<Octicons name="shield-check" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />

            <View className="h-px bg-border" />

            <SecurityRow
                title="Active Sessions"
                metadata="2 devices"
                icon={<MaterialCommunityIcons name="monitor-cellphone" size={18} color="#8FA5B8" />}
                onPress={() => { }}
            />
        </Container>
    );
}
