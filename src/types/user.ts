export type AcademicInformation = {
    id: string;
    user_id: string;

    degree: string;
    department: string;
    current_semester: number;
    engineering_roll: string | null;
};

export type UserAchievementStats = {
    id: string;
    user_id: string;

    streak: number;
    rank: string | null;
    achievements: number;

    createdAt: string;
    updatedAt: string;
};

export type CollegeInformation = {
    id: string;
    user_id: string;

    college_name: string;
    principal_name: string | null;
    location: string;
    logo_url: string | null;
    website: string | null;
};

export type QuizExplorer = {
    id: string;
    user_id: string;

    level: number;
    solved: number;
    accuracy: number;
    currentXP: number;
    nextLevelXP: number;

    createdAt: string;
    updatedAt: string;
};

export type User = {
    id: string;
    avatar: string;
    clerk_user_id: string;
    status: string;
    description: string | null;

    createdAt: string;
    updatedAt: string;

    academic_information: AcademicInformation | null;
    college_information: CollegeInformation | null;
    achievement_stats: UserAchievementStats | null;
    quiz_explorer: QuizExplorer | null;
};