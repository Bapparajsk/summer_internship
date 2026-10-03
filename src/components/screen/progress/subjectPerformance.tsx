import { Text, View } from "react-native";
import { SegmentedProgress } from "@/components/progressBar";
import { getCommonIcon, IconName } from "@/components/lib/icon";

type Subject = {
    id: string;
    name: string;
    score: number;
    icon: IconName;
};

const subjects: Subject[] = [
    {
        id: "cpp",
        name: "Modern C++",
        score: 88,
        icon: "cpp",
    },
    {
        id: "dsa",
        name: "Data Structures",
        score: 76,
        icon: "dsa",
    },
    {
        id: "dbms",
        name: "Databases",
        score: 79,
        icon: "dbms",
    },
    {
        id: "algorithms",
        name: "Algorithms",
        score: 74,
        icon: "networks",
    },
    {
        id: "os",
        name: "Operating Systems",
        score: 65,
        icon: "os",
    },
];

function getPerformanceColor(score: number) {
    if (score <= 40) {
        return "#F87171";
    }

    if (score <= 70) {
        return "#FBBF24";
    }

    if (score <= 85) {
        return "#5CC6E2";
    }

    return "#7BE2FF";
}

function getPerformanceSoftColor(score: number) {
    if (score <= 40) {
        return "rgba(248, 113, 113, 0.12)";
    }

    if (score <= 70) {
        return "rgba(251, 191, 36, 0.12)";
    }

    if (score <= 85) {
        return "rgba(92, 198, 226, 0.12)";
    }

    return "rgba(123, 226, 255, 0.14)";
}

function SubjectRow({
    subject,
}: {
    subject: Subject;
}) {
    const {Icon, name: iconName} = getCommonIcon(subject.icon);

    const color = getPerformanceColor(subject.score);
    const softColor = getPerformanceSoftColor(subject.score);

    return (
        <View className="gap-1.5">
            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center gap-2">
                    <View
                        className="h-6 w-6 items-center justify-center rounded-md"
                        style={{
                            backgroundColor: softColor,
                        }}
                    >
                        <Icon
                            size={12}
                            color={color}
                            name={iconName}
                            strokeWidth={2}
                        />
                    </View>

                    <Text
                        numberOfLines={1}
                        className="flex-1 font-poppins-medium text-xs text-text-primary"
                    >
                        {subject.name}
                    </Text>
                </View>

                <Text
                    className="ml-3 font-poppins-medium text-[11px] leading-normal"
                    style={{ color }}
                >
                    {subject.score}%
                </Text>
            </View>

            {/* Progress */}
            <View className="mt-1 h-1.5 overflow-hidden">
                <SegmentedProgress
                    progress={subject.score}
                    primaryColor={color}
                />
            </View>
        </View>
    );
}

export const SubjectPerformance = () => {
    return (
        <View className="rounded-[34px] border border-border bg-white/4 p-4 py-6">
            {/* Section header */}
            <View className="mb-4 flex-row items-center justify-between">
                <View className="flex-1">
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Subject performance
                    </Text>

                    <Text className="mt-0.5 font-poppins-medium text-[11px] text-text-secondary">
                        Core Computer Science modules
                    </Text>
                </View>

                <View className="ml-3 rounded-full bg-surface-container-high px-2 py-1">
                    <Text className="font-poppins-medium text-[9px] leading-normal text-text-secondary">
                        {subjects.length} Tracks
                    </Text>
                </View>
            </View>

            {/* Subjects */}
            <View className="gap-4">
                {subjects.map((subject) => (
                    <SubjectRow
                        key={subject.id}
                        subject={subject}
                    />
                ))}
            </View>
        </View>
    );
}