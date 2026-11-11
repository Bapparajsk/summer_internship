import { IconName } from "@/components/lib/icon";
import { ProfileEmojiName } from "./emoji";


export type Status = "Excellent" | "Good" | "Average" | "Poor" | "Failing";

export type StatusConfig = {
    bg: string;
    border: string;
    text: string;
    icon: IconName
}

export type ProfileHeroProps = {
    name: string;
    role: string;
    program: string;
    semester: string;

    avatar: ProfileEmojiName;

    status: Status;

    cgpa: string;
    streak: number;
    rank: string;
    achievements: number;
};