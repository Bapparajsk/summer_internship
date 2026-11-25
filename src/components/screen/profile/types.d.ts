import { IconName } from "@/components/lib/icon";


export type Status = "Excellent" | "Good" | "Average" | "Poor" | "Failing";

export type StatusConfig = {
    bg: string;
    border: string;
    text: string;
    icon: IconName
}

export type ProfileHeroProps = {
    role: string;
    program: string;
    semester: string;


    cgpa: string;
    streak: number;
    rank: string;
    achievements: number;
};