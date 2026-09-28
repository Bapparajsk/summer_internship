import { FlatList, Text, View } from "react-native";
import { SegmentedProgress } from "../progressBar";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { getCommonIcon } from "../lib/icon";
import { SectionHeader } from "../header/sectionHeader";

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

const TopicCard = ({
    item
}: TopicCardProps) => {
    const { Icon, name } = getCommonIcon(item.id);


    return (
        <PressableFeedback
            className={`mr-3 h-24 w-34 overflow-hidden rounded-2xl p-3.5 border border-border-subtle bg-surface-container`}
        >
            <PressableFeedback.Ripple
                animation={{
                    backgroundColor: { value: '#8FA5B8' },
                    opacity: { value: [0, 0.1, 0] },
                    progress: { baseDuration: 600 },
                }}
            />
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

export const TopicSelection = () => {

    return (
        <View className="gap-3">

            <SectionHeader
                title="Choose a topic"
                rightText={`See all (${topics.length + 10})`}
            />

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