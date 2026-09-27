import { ScrollContextProvider } from "@/context/scroll";
import { PropsWithChildren } from "react";
import { SharedValue } from "react-native-reanimated";

export function ScrollProvider({
    scrollY,
    children,
}: PropsWithChildren<{
    scrollY: SharedValue<number>;
}>) {
    return (
        <ScrollContextProvider value={{ scrollY }}>
            {children}
        </ScrollContextProvider>
    );
}