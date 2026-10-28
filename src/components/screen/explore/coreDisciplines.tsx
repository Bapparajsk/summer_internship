import { LinearGradient } from "expo-linear-gradient";
import { PressableFeedback } from "heroui-native";
import { Text, View } from "react-native";
import { SegmentedProgress } from "../../ui/progressBar";
import { getCommonIcon, IconName } from "../../lib/icon";

type Discipline = {
    id: string;
    title: string;
    quizzes: string;
    progress: number;
    icon: IconName;
    keyWords: string[];
    tag: string;
};

const disciplines: Discipline[] = [
    {
        id: "cpp",
        title: "Modern C++",
        quizzes: "80+ quizzes",
        progress: 64,
        icon: "cpp",
        keyWords: ["Smart Pointers & (RAII)", "Compile-Time Evaluation", "Lambda Expressions", "Modern Type Safety Overhaul"],
        tag: "new",
    },
    {
        id: "os",
        title: "OS Kernel",
        quizzes: "60+ quizzes",
        progress: 35,
        icon: "os",
        keyWords: ["System Calls", "File System Management", "Process Management & Scheduling"],
        tag: "new",
    }
];

type DisciplineCardProps = {
    item: Discipline;
    onPress?: (item: Discipline) => void;
};

function DisciplineCard({
    item,
    onPress,
}: DisciplineCardProps) {
    const { Icon, name } = getCommonIcon(item.icon);

    return (
        <PressableFeedback
            onPress={() => onPress?.(item)}
            className="flex-1"
        >
            <View className="relative rounded-[28px] h-40 border border-border bg-white/4 overflow-hidden p-3">
                <LinearGradient
                    colors={[
                        "#5CC6E2",
                        "#5CC6E280",
                        "transparent",
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    locations={[0, 0.5, 1]}
                    className="absolute inset-0 opacity-20"
                />

                {/* Icon + Arrow */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row gap-1.5 items-center">
                        <View className="h-9 w-9 items-center justify-center rounded-lg bg-primary-soft">
                            <Icon
                                name={name}
                                size={19}
                                color="#5CC6E2"
                                strokeWidth={2}
                            />
                        </View>
                        <Text
                            numberOfLines={1}
                            className="font-poppins-semibold text-xs text-text-primary"
                        >
                            {item.title}
                        </Text>
                    </View>
                </View>

                <View className="my-2">
                    <Text numberOfLines={4} className="font-poppins-medium text-[10px] text-text-primary">
                        {item.keyWords.join(", ")}.
                    </Text>
                </View>

                {/* Content */}
                <View className="mt-auto">
                    <View className="flex-row items-center justify-between">
                        <Text className="font-poppins-medium text-[10px] text-text-secondary">
                            {item.quizzes.trim().split(" ")[1]}
                        </Text>
                        <Text className="font-poppins-medium text-[10px] text-text-secondary">
                            {item.quizzes.trim().split(" ")[0]}
                        </Text>
                    </View>
                    {/* Progress */}
                    <View className="h-1 w-full overflow-hidden">
                        <SegmentedProgress
                            progress={item.progress}
                        />
                    </View>
                </View>

            </View>
        </PressableFeedback>
    );
}

export function TrendingSections() {
    return (
        <View className="gap-3">
            {/* 2 Column Grid */}
            <View className="flex-row gap-y-1.5 justify-between">
                {disciplines.map((item) => (
                    <View className="w-[49%]" key={item.id}>
                        <DisciplineCard item={item} />
                    </View>
                ))}
            </View>
        </View>
    );
}