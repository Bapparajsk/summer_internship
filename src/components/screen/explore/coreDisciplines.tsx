import { LinearGradient } from "expo-linear-gradient";
import { PressableFeedback } from "heroui-native";
import { Text, View } from "react-native";
import { SegmentedProgress } from "../../progressBar";
import { getCommonIcon } from "../../lib/icon";

type Discipline = {
    id: string;
    title: string;
    quizzes: string;
    progress: number;
    icon: string;
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
        keyWords: ["C++", "Programming", "Best Practices"],
        tag: "new",
    },
    {
        id: "os",
        title: "OS Kernel",
        quizzes: "60+ quizzes",
        progress: 35,
        icon: "os",
        keyWords: ["Operating Systems", "Kernel", "System Programming"],
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

                {/* fechner Chip */}
                <View className="absolute top-3 right-3">
                    <View className="rounded-full bg-primary-soft px-2 py-1">
                        <Text className="font-poppins-medium text-[8px] text-primary leading-normal">
                            {item.tag}
                        </Text>
                    </View>
                </View>

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
                            className="font-poppins-semibold text-sm text-text-primary"
                        >
                            {item.title}
                        </Text>
                    </View>
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

export function TrendingSections() {
    return (
        <View className="gap-3">
            {/* 2 Column Grid */}
            <View className="flex-row flex-wrap gap-y-1.5 justify-between">
                {
                    Array.from({ length: Math.ceil(disciplines.length / 2) }, (_, i) => i * 2).map((index) => (
                        <View className="w-full flex-row justify-between" key={index}>
                            {disciplines.slice(index, index + 2).map((item) => (
                                <View className="w-[49%]" key={item.id}>
                                    <DisciplineCard item={item} />
                                </View>
                            ))}
                        </View>
                    ))
                }
            </View>
        </View>
    );
}