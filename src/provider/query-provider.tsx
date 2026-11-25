import { PropsWithChildren, useEffect } from "react";
import { AppState, Platform } from "react-native";

import {
    QueryClientProvider,
    focusManager,
    onlineManager,
} from "@tanstack/react-query";

import NetInfo from "@react-native-community/netinfo";

import { queryClient } from "@/lib/query-client";

function QueryLifecycle() {
    useEffect(() => {
        if (Platform.OS !== "web") {
            const subscription = AppState.addEventListener(
                "change",
                (state) => {
                    focusManager.setFocused(state === "active");
                }
            );

            return () => subscription.remove();
        }
    }, []);

    return null;
}

export function QueryProvider({
    children,
}: PropsWithChildren) {
    useEffect(() => {
        onlineManager.setEventListener((setOnline) => {
            return NetInfo.addEventListener((state) => {
                setOnline(
                    !!state.isConnected &&
                    state.isInternetReachable !== false
                );
            });
        });
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <QueryLifecycle />
            {children}
        </QueryClientProvider>
    );
}