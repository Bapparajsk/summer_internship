import { FlatList, Text, View } from "react-native";
import { SegmentedProgress } from "../../progressBar";
import { PressableFeedback } from "heroui-native/pressable-feedback";
import { getCommonIcon, IconName } from "../../lib/icon";
import { SectionHeader } from "../../header/sectionHeader";

export type Topic = {
    id: string;
    name: string;
    questions: number;
    progress: number;
    iconName: IconName;
};

const topics: Topic[] = [
    {
        id: "dsa",
        name: "DSA",
        questions: 420,
        progress: 82,
        iconName: "dsa"
    },
    {
        id: "cpp",
        name: "C++",
        questions: 280,
        progress: 64,
        iconName: "cpp"
    },
    {
        id: "java",
        name: "Java",
        questions: 310,
        progress: 48,
        iconName: "java"
    },
    {
        id: "python",
        name: "Python",
        questions: 350,
        progress: 72,
        iconName: "python"
    },
    {
        id: "os",
        name: "OS",
        questions: 195,
        progress: 35,
        iconName: "os"
    },
    {
        id: "dbms",
        name: "DBMS",
        questions: 240,
        progress: 56,
        iconName: "dbms"
    },
    {
        id: "networks",
        name: "Networks",
        questions: 180,
        progress: 28,
        iconName: "networks"
    },
];

interface TopicCardProps {
    item: Topic;
}

const TopicCard = ({
    item
}: TopicCardProps) => {
    const { Icon, name } = getCommonIcon(item.iconName);


    return (
        <PressableFeedback
            className={`mr-2 h-24 w-34 overflow-hidden rounded-[28px] p-3.5 border border-border bg-white/4`}
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
                className="px-margin"
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