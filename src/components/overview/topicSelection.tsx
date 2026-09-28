import { FlatList, Pressable, Text, View } from "react-native";
import { SegmentedProgress } from "../progressBar";
import { PressableFeedback } from "heroui-native";
import { getCommonIcon, FontAwesome6 } from "../lib/icon";

const topics = [
    {
        id: "dsa",
        name: "DSA",
        questions: 420,
        progress: 82,
        iconName: "graphql"
    },
    {
        id: "cpp",
        name: "C++",
        questions: 280,
        progress: 64,
    },
    {
        id: "java",
        name: "Java",
        questions: 310,
        progress: 48,
    },
    {
        id: "python",
        name: "Python",
        questions: 350,
        progress: 72,
    },
    {
        id: "os",
        name: "OS",
        questions: 195,
        progress: 35,
    },
    {
        id: "dbms",
        name: "DBMS",
        questions: 240,
        progress: 56,
    },
    {
        id: "networks",
        name: "Networks",
        questions: 180,
        progress: 28,
    },
];

interface TopicCardProps {
    item: (typeof topics)[number];
}

function TopicCard({
    item
}: TopicCardProps) {
    const { Icon, name } = getCommonIcon(item.id);


    return (
        <PressableFeedback
            className={`mr-3 h-24 w-34 overflow-hidden rounded-2xl p-3.5 border border-border-subtle bg-surface-container`}
        >
            {/* Top */}
            <View className="flex-row items-center gap-2">
                <View
                    className={`h-9 w-9 items-center justify-center rounded-xl bg-surface-container-highest`}
                >
                    <Icon
                        size={19}
                        color={"#8FA5B8"}
                        strokeWidth={2}
                        name={name}
                    />

                </View>
                <View>
                    <Text
                        numberOfLines={1}
                        className={`font-poppins-semibold text-sm text-text-primary`}
                    >
                        {item.name}
                    </Text>
                </View>

            </View>

            {/* Bottom */}
            <View className="mt-auto">

                <View className="flex-row items-center justify-between">
                    <Text className="font-poppins-medium self-end text-[11px] text-text-tertiary">
                        Questions
                    </Text>
                    <Text className="font-poppins-medium self-end text-[11px] text-text-tertiary">
                        {item.questions}
                    </Text>
                </View>

                {/* Progress */}
                <View className="h-1 mt-0.5 overflow-hidden">
                    <SegmentedProgress progress={item.progress} />
                </View>
            </View>
        </PressableFeedback>
    );
}

export function TopicSelection() {

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
                        See all ({topics.length + 10})
                    </Text>
                    <FontAwesome6 name="angle-right" size={16} color="#5CC6E2" />
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
                    />
                )}
            />
        </View>
    );
}