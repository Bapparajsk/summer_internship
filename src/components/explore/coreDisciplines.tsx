import { LinearGradient } from "expo-linear-gradient";
import { PressableFeedback } from "heroui-native";
import { ArrowUpRight, Brain, Braces, Coffee, Database, GitBranch, Globe, Network, Terminal } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { SegmentedProgress } from "../progressBar";
import { SectionHeader } from "../header/sectionHeader";
import { Feather } from "@expo/vector-icons";

type Discipline = {
    id: string;
    title: string;
    quizzes: string;
    progress: number;
    icon: React.ComponentType<{
        size?: number;
        color?: string;
        strokeWidth?: number;
    }>;
    keyWords: string[];
};

const disciplines: Discipline[] = [
    {
        id: "data-structures",
        title: "Data Structures",
        quizzes: "120+ quizzes",
        progress: 82,
        icon: GitBranch,
        keyWords: ["Logic", "Data Structures"],
    },
    {
        id: "algorithms",
        title: "Algorithms",
        quizzes: "95+ quizzes",
        progress: 74,
        icon: Brain,
        keyWords: ["Algorithms", "Problem Solving"],
    },
    {
        id: "cpp",
        title: "Modern C++",
        quizzes: "80+ quizzes",
        progress: 64,
        icon: Braces,
        keyWords: ["C++", "Programming", "Best Practices"],
    },
    {
        id: "java",
        title: "Java & JVM",
        quizzes: "75+ quizzes",
        progress: 48,
        icon: Coffee,
        keyWords: ["Java", "Programming", "JVM"],
    },
    {
        id: "python",
        title: "Python",
        quizzes: "90+ quizzes",
        progress: 72,
        icon: Terminal,
        keyWords: ["Python", "Programming", "Data Science"],
    },
    {
        id: "os",
        title: "OS Kernel",
        quizzes: "60+ quizzes",
        progress: 35,
        icon: Globe,
        keyWords: ["Operating Systems", "Kernel", "System Programming"],
    },
    {
        id: "dbms",
        title: "Databases",
        quizzes: "55+ quizzes",
        progress: 56,
        icon: Database,
        keyWords: ["Databases", "Database Management", "Design Principles"],
    },
    {
        id: "networks",
        title: "Networking",
        quizzes: "50+ quizzes",
        progress: 28,
        icon: Network,
        keyWords: ["Computer Networks", "Protocols", "Communication Systems"],
    },
];

type DisciplineCardProps = {
    item: Discipline;
    onPress?: (item: Discipline) => void;
};

function DisciplineCard({
    item,
    onPress,
}: DisciplineCardProps) {
    const Icon = item.icon;

    return (
        <PressableFeedback
            onPress={() => onPress?.(item)}
            className="flex-1 w-full"
        >

            <View className="relative min-h-33 rounded-[34px] border border-border bg-white/4 overflow-hidden p-3.5">
                <LinearGradient
                    colors={[
                        "#262A31",
                        "#1C2026",
                        "transparent",
                    ]}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    locations={[0, 0.5, 1]}
                    className="absolute inset-0"
                />
                {/* Icon + Arrow */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row gap-1.5 items-center">
                        <View className="h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                            <Icon
                                size={19}
                                color="#5CC6E2"
                                strokeWidth={2}
                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            className="font-poppins-semibold text-sm text-text-primary"
                        >
                            {item.title}
                        </Text>
                    </View>


                    <ArrowUpRight
                        size={17}
                        color="rgba(255,255,255,0.40)"
                        strokeWidth={2}
                    />
                </View>

                <View className="my-2">
                    <Text numberOfLines={2} className="font-poppins-medium text-xs text-text-primary">
                        {item.keyWords.join(", ")}
                    </Text>
                </View>

                {/* Content */}
                <View className="mt-auto">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-poppins-medium text-xs text-text-secondary">
                            {item.quizzes.trim().split(" ")[1]}
                        </Text>
                        <Text className="font-poppins-medium text-xs text-text-secondary">
                            {item.quizzes.trim().split(" ")[0]}
                        </Text>
                    </View>
                    {/* Progress */}
                    <View className="mt-1 h-1.5 w-full overflow-hidden">
                        <SegmentedProgress
                            progress={item.progress}
                        />
                    </View>
                </View>

            </View>
        </PressableFeedback>
    );
}

type CoreDisciplinesProps = {
    onSeeAll?: () => void;
    onDisciplinePress?: (item: Discipline) => void;
};

export function CoreDisciplines({
    onSeeAll,
    onDisciplinePress,
}: CoreDisciplinesProps) {
    return (
        <View className="gap-3">
            {/* 2 Column Grid */}
            <View className="flex-row flex-wrap gap-y-1.5 justify-between">
                {
                    Array.from({ length: Math.ceil(disciplines.length / 2) }, (_, i) => i * 2).map((index) => (
                        <View className="w-full flex-row justify-between" key={index}>
                            {disciplines.slice(index, index + 2).map((item) => (

                                <View className="w-[49%]" key={item.id}>

                                    <DisciplineCard
                                        item={item}
                                        onPress={onDisciplinePress}
                                    />
                                </View>
                            ))}
                        </View>
                    ))
                }
            </View>
        </View>
    );
}