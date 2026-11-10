import { SelectOption } from "@/components/select";
import { Status, StatusConfig } from "./types";
import { Href } from "expo-router";

const className = "px-2 py-1.5 border border-border mb-0.5 bg-blue-400/5";


export const options = [
    { id: "edit-profile", label: "Edit Profile", iconName: "edit", endIcon: "chevron-right", classNames: { container: className } },
    { id: "profile-image", label: "Update Image", iconSize: 14, iconName: "image", endIcon: "chevron-right", classNames: { container: className } },
    { id: "app-settings", label: "App Settings", iconSize: 14, iconName: "cog-outline", endIcon: "chevron-right", classNames: { container: className } },
    {
        id: "log-out",
        label: "Log Out",
        iconName: "logout",
        classNames: {
            container: `${className} bg-danger-soft px-3 mb-0`,
            label: "text-red-500",
            startIconColor: "#fb2c36",
        },
    },
] satisfies SelectOption[];

type OptionId = typeof options[number]["id"];

export const optionsHref: Partial<Record<OptionId, Href>> = {
    "edit-profile": "/setting/editProfile",
    "app-settings": "/setting",
};

export const statusConfig: Record<Status, StatusConfig> = {
    Excellent: {
        bg: "#10B9812F",
        border: "#10B98166",
        text: "#10B981",
        icon: "check-circle",
    },
    Good: {
        bg: "#3B82F61F",
        border: "#3B82F666",
        text: "#3B82F6",
        icon: "check-circle",
    },
    Average: {
        bg: "#F59E0B1F",
        border: "#F59E0B66",
        text: "#F59E0B",
        icon: "minus-circle",
    },
    Poor: {
        bg: "#F973161F",
        border: "#F9731666",
        text: "#F97316",
        icon: "alert",
    },
    Failing: {
        bg: "#EF44441F",
        border: "#EF444466",
        text: "#EF4444",
        icon: "x-circle",
    }
}