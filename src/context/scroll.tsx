import {
    createContext,
    useContext,
} from "react";
import { SharedValue } from "react-native-reanimated";

export type ScrollContextValue = {
    scrollY: SharedValue<number>;
};

const ScrollContext = createContext<ScrollContextValue | null>(null);

export const ScrollContextProvider = ScrollContext;

export function useScroll() {
    const context = useContext(ScrollContext);

    if (!context) {
        throw new Error("useScroll must be inside ScrollProvider");
    }

    return context;
}