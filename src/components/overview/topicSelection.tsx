import { useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";
import {
    Braces,
    Brain,
    Coffee,
    Database,
    GitBranch,
    Laptop,
    Network,
    ChevronRight,
} from "lucide-react-native";
import { SegmentedProgress } from "../progressBar";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const topics = [
    {
        id: "dsa",
        name: "DSA",
        questions: 420,
        progress: 82,
        icon: GitBranch,
    },
    {
        id: "cpp",
        name: "C++",
        questions: 280,
        progress: 64,
        icon: Braces,
    },
    {
        id: "java",
        name: "Java",
        questions: 310,
        progress: 48,
        icon: Coffee,
    },
    {
        id: "python",
        name: "Python",
        questions: 350,
        progress: 72,
        icon: Laptop,
    },
    {
        id: "os",
        name: "OS",
        questions: 195,
        progress: 35,
        icon: Brain,
    },
    {
        id: "dbms",
        name: "DBMS",
        questions: 240,
        progress: 56,
        icon: Database,
    },
    {
        id: "networks",
        name: "Networks",
        questions: 180,
        progress: 28,
        icon: Network,
    },
];

interface TopicCardProps {
    item: (typeof topics)[number];
    selected: boolean;
    onPress: () => void;
}

function TopicCard({
    item,
    selected,
    onPress,
}: TopicCardProps) {
    const scale = useSharedValue(1);
    const Icon = item.icon;

    const handlePressIn = () => {
        scale.value = withSpring(0.96, {
            damping: 15,
            stiffness: 350,
        });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1, {
            damping: 14,
            stiffness: 300,
        });
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            style={animatedStyle}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            className={`mr-3 h-[112px] w-[136px] overflow-hidden rounded-2xl p-3.5 ${
                selected
                    ? "border border-primary-border bg-primary-soft"
                    : "border border-border-subtle bg-surface-container"
            }`}
        >
            {/* Top */}
            <View className="flex-row items-center justify-between">
                <View
                    className={`h-9 w-9 items-center justify-center rounded-xl ${
                        selected
                            ? "bg-primary/20"
                            : "bg-surface-container-highest"
                    }`}
                >
                    <Icon
                        size={19}
                        color={selected ? "#5CC6E2" : "#8FA5B8"}
                        strokeWidth={2}
                    />
                </View>

                {selected && (
                    <View className="h-2 w-2 rounded-full bg-primary" />
                )}
            </View>

            {/* Bottom */}
            <View className="mt-auto">
                <Text
                    numberOfLines={1}
                    className={`font-poppins-semibold text-sm ${
                        selected
                            ? "text-primary"
                            : "text-text-primary"
                    }`}
                >
                    {item.name}
                </Text>

                <Text className="mt-0.5 font-poppins-medium text-[11px] text-text-tertiary">
                    {item.questions} questions
                </Text>

                {/* Progress */}
                <View className="mt-2 h-1 overflow-hidden">
                    <SegmentedProgress progress={item.progress} />
                </View>
            </View>
        </AnimatedPressable>
    );
}

export function TopicSelection() {
    const [selectedTopic, setSelectedTopic] = useState("dsa");

    return (
        <View className="gap-3">
            {/* Header */}
            <View className="flex-row items-center justify-between px-margin">
                <Text className="font-poppins-semibold text-base text-text-primary">
                    Choose a topic
                </Text>

                <Pressable
                    className="flex-row items-center gap-0.5"
                    onPress={() => {
                        // Navigate to all topics
                    }}
                >
                    <Text className="font-poppins-medium text-sm text-primary">
                        See all ({topics.length})
                    </Text>

                    <ChevronRight
                        size={16}
                        color="#5CC6E2"
                        strokeWidth={2}
                    />
                </Pressable>
            </View>

            {/* Horizontal Topics */}
            <FlatList
                horizontal
                data={topics}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                }}
                renderItem={({ item }) => (
                    <TopicCard
                        item={item}
                        selected={selectedTopic === item.id}
                        onPress={() => setSelectedTopic(item.id)}
                    />
                )}
            />
        </View>
    );
}