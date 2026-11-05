
import { AntDesign } from "@expo/vector-icons";
import { PressableFeedback } from "heroui-native";
import { Text } from "react-native";

type SignOutButtonProps = {
    onPress: () => void;
};

export function SignOutButton({ onPress }: SignOutButtonProps) {
    return (
        <PressableFeedback
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel="Sign out of QuizFlow"
            className="mt-6 h-13 flex-row items-center justify-center gap-2 rounded-xl border border-danger/20 bg-danger-soft"
        >
            <PressableFeedback.Ripple
                animation={{
                    backgroundColor: { value: '#F87171' },
                    opacity: { value: [0, 0.1, 0] },
                    progress: { baseDuration: 600 },
                }}
            />

            <AntDesign name="logout" size={18} color="#F87171" />

            <Text className="font-poppins-semibold text-[13px] text-danger">
                Sign Out
            </Text>
        </PressableFeedback>
    );
}
