import { MaterialIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { Card } from "heroui-native/card";
import { Skeleton } from "heroui-native";
import { useUser } from "@/hooks/queries/use-user";
import { SegmentedProgress } from "../../ui/progressBar";
import { FontAwesome6, Ionicons } from "../../lib/icon";
import { toRoman } from "@/utils/toRoman";

const cardClassName = "rounded-[34px] border border-border bg-white/4";

export const ProfileQuizExplorerCard = () => {
    const { data: user, isLoading, isError } = useUser();
    const quizExplorer = user?.quiz_explorer;

    if (isLoading) {
        return (
            <Card className={cardClassName}>
                <Card.Body>
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <View className="gap-1">
                                <Skeleton className="h-4 w-28 rounded-full" />
                                <Skeleton className="h-3 w-20 rounded-full" />
                            </View>
                        </View>
                        <Skeleton className="h-6 w-17 rounded-full" />
                    </View>
                    <Skeleton className="my-3 h-16 w-full rounded-xl" />
                    <Skeleton className="mb-2 h-4 w-full rounded-full" />
                    <Skeleton className="h-2.5 w-full rounded-full" />
                    <Skeleton className="mt-2 h-4 w-full rounded-full" />
                </Card.Body>
            </Card>
        );
    }

    if (isError && !user) {
        return (
            <Card className={cardClassName}>
                <Card.Body>
                    <View className="min-h-36 items-center justify-center gap-2">
                        <MaterialIcons name="error-outline" size={24} color="#F87171" />
                        <Text className="text-center font-poppins-medium text-xs text-danger">
                            Could not load Quiz Explorer stats
                        </Text>
                    </View>
                </Card.Body>
            </Card>
        );
    }

    if (!quizExplorer) {
        return (
            <Card className={cardClassName}>
                <Card.Body>
                    <View className="min-h-36 items-center justify-center gap-2">
                        <FontAwesome6 name="award" size={21} color="#718096" />
                        <Text className="text-center font-poppins-medium text-xs text-text-secondary">
                            Quiz Explorer stats are not available yet
                        </Text>
                    </View>
                </Card.Body>
            </Card>
        );
    }

    const { level, solved, accuracy, currentXP, nextLevelXP } = quizExplorer;
    const progress = nextLevelXP > 0
        ? Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100))
        : 0;
    const remainingXP = Math.max(0, nextLevelXP - currentXP);

    return (
        <Card className={cardClassName}>
            <Card.Body>
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="h-10 w-10 items-center justify-center rounded-xl border border-primary-border bg-surface-container-high">
                            <FontAwesome6 name="award" size={21} color="#5CC6E2" />
                        </View>

                        <View>
                            <Text className="font-poppins-semibold text-sm text-text-primary">
                                Quiz Explorer
                            </Text>
                            <Text className="mt-0.5 font-poppins-medium text-[10px] text-text-secondary">
                                Rank Tier {toRoman(level)}
                            </Text>
                        </View>
                    </View>

                    <View className="rounded-full border border-primary-border bg-primary-soft px-3 py-1">
                        <Text className="font-poppins-semibold text-[10px] leading-normal text-primary">
                            LEVEL. {level}
                        </Text>
                    </View>
                </View>

                <View className="my-3 flex-row overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest/60">
                    <View className="flex-1 items-center py-2.5">
                        <Text className="font-poppins-semibold text-lg tracking-tight text-text-primary">
                            {solved.toLocaleString()}
                        </Text>
                        <Text className="font-poppins-semibold text-[8px] text-text-tertiary">
                            QUESTIONS SOLVED
                        </Text>
                    </View>

                    <View className="my-2 w-px bg-border-subtle" />

                    <View className="flex-1 items-center py-2.5">
                        <Text className="font-poppins-semibold text-lg tracking-tight text-primary">
                            {accuracy}%
                        </Text>
                        <Text className="font-poppins-semibold text-[8px] text-text-tertiary">
                            AVERAGE ACCURACY
                        </Text>
                    </View>
                </View>

                <View className="mb-1.5 flex-row items-center justify-between">
                    <Text className="font-poppins-semibold text-xs text-text-secondary">
                        Experience
                    </Text>
                    <Text className="font-poppins-semibold text-[10px] text-text-primary">
                        {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
                    </Text>
                </View>

                <View className="h-2.5 p-0.5">
                    <SegmentedProgress
                        progress={progress}
                        primaryColor="#5CC6E2"
                        secondaryColor="#31353c"
                    />
                </View>

                <View className="mt-2 flex-row items-center justify-between">
                    <Text className="font-poppins-semibold text-[10px] text-text-tertiary">
                        {remainingXP > 0
                            ? `${remainingXP.toLocaleString()} XP to Level ${level + 1}`
                            : `Level ${level + 1} unlocked`}
                    </Text>

                    <View className="flex-row items-center gap-1">
                        <Ionicons name="trending-up" size={13} color="#5CC6E2" />
                        <Text className="font-poppins-medium text-[10px] text-primary">
                            Keep going
                        </Text>
                    </View>
                </View>
            </Card.Body>
        </Card>
    );
};
