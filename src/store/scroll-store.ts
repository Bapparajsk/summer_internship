import { create } from "zustand";
import { makeMutable } from "react-native-reanimated";

export type TabName =
    | "index"
    | "explore"
    | "progress"
    | "profile";

type ScrollStore = {
    activeTab: TabName;

    scrollY: Record<
        TabName,
        ReturnType<typeof makeMutable<number>>
    >;

    setActiveTab: (tab: TabName) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
    activeTab: "index",

    scrollY: {
        index: makeMutable(0),
        explore: makeMutable(0),
        progress: makeMutable(0),
        profile: makeMutable(0),
    },

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },
}));