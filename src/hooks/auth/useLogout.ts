import { useClerk } from "@clerk/expo";
import { useRouter } from "expo-router";

export function useLogout() {
    const { signOut } = useClerk();
    const router = useRouter();

    const logout = async () => {
        try {
            await signOut();
            router.replace("/(auth)/sign-in");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return { logout };
}