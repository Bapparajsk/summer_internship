
import { useCallback } from "react";
import { useClerk } from "@clerk/expo";

export function useLogout() {
    const { signOut } = useClerk();

    const logout = useCallback(async () => {
        try {
            await signOut();
            return true;
        } catch (error) {
            console.error("[Logout Error]:", error);
            throw error;
        }
    }, [signOut]);

    return { logout };
}
