import { LinearGradient } from "expo-linear-gradient";
import { PressableFeedback } from "heroui-native";
import { ArrowUpRight, Brain, Braces, Coffee, Database, GitBranch, Globe, Network, Terminal } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";


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
};

const disciplines: Discipline[] = [
    {
        id: "data-structures",
        title: "Data Structures",
        quizzes: "120+ quizzes",
        progress: 82,
        icon: GitBranch,
    },
    {
        id: "algorithms",
        title: "Algorithms",
        quizzes: "95+ quizzes",
        progress: 74,
        icon: Brain,
    },
    {
        id: "cpp",
        title: "Modern C++",
        quizzes: "80+ quizzes",
        progress: 64,
        icon: Braces,
    },
    {
        id: "java",
        title: "Java & JVM",
        quizzes: "75+ quizzes",
        progress: 48,
        icon: Coffee,
    },
    {
        id: "python",
        title: "Python",
        quizzes: "90+ quizzes",
        progress: 72,
        icon: Terminal,
    },
    {
        id: "os",
        title: "OS Kernel",
        quizzes: "60+ quizzes",
        progress: 35,
        icon: Globe,
    },
    {
        id: "dbms",
        title: "Databases",
        quizzes: "55+ quizzes",
        progress: 56,
        icon: Database,
    },
    {
        id: "networks",
        title: "Networking",
        quizzes: "50+ quizzes",
        progress: 28,
        icon: Network,
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
            className="flex-1 w-full relative"
        >
            <LinearGradient
                colors={[
                    "#262A31",
                    "#1C2026",
                    "transparent",
                ]}
                locations={[0, 0.5, 1]}
                className="absolute inset-0"
            />
            <View className="min-h-33 rounded-xl border border-border-subtle bg-surface-container-low p-3.5">
                {/* Icon + Arrow */}
                <View className="flex-row items-center justify-between">
                    <View className="h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                        <Icon
                            size={19}
                            color="#5CC6E2"
                            strokeWidth={2}
                        />
                    </View>

                    <ArrowUpRight
                        size={17}
                        color="rgba(255,255,255,0.40)"
                        strokeWidth={2}
                    />
                </View>

                {/* Content */}
                <View className="mt-3">
                    <Text
                        numberOfLines={1}
                        className="font-poppins-semibold text-sm text-text-primary"
                    >
                        {item.title}
                    </Text>

                    <Text className="mt-0.5 font-mono text-[10px] text-text-tertiary">
                        {item.quizzes}
                    </Text>
                </View>

                {/* Progress */}
                <View className="mt-3 h-1 overflow-hidden rounded-full bg-surface-container-high">
                    <View
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${item.progress}%` }}
                    />
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
            {/* Section Header */}
            <View className="flex-row items-center justify-between">
                <Text className="font-poppins-semibold text-base text-text-primary">
                    Core Disciplines
                </Text>

                <Pressable
                    onPress={onSeeAll}
                    className="flex-row items-center gap-0.5"
                    hitSlop={8}
                >
                    <Text className="font-poppins-medium text-xs text-primary">
                        See all {disciplines.length}
                    </Text>

                    <ArrowUpRight
                        size={15}
                        color="#5CC6E2"
                        strokeWidth={2}
                    />
                </Pressable>
            </View>

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