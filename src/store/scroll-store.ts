import { create } from "zustand";
import {
    makeMutable,
    type SharedValue,
} from "react-native-reanimated";

type TabName = "index" | "explore" | "progress" | "profile";

type ScrollStore = {
    scrollY: Record<TabName, SharedValue<number>>;
    activeTab: TabName;

    setActiveTab: (tab: TabName) => void;
};

export const useScrollStore = create<ScrollStore>((set) => ({
    scrollY: {
        index: makeMutable(0),
        explore: makeMutable(0),
        progress: makeMutable(0),
        profile: makeMutable(0),
    },

    activeTab: "index",

    setActiveTab: (tab) => {
        set({ activeTab: tab });
    },
}));