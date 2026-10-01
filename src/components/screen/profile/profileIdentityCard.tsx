import { Text, View } from "react-native";
import { Card } from "heroui-native/card";
import { SegmentedProgress } from "../../progressBar";
import { FontAwesome6, Ionicons } from "../../lib/icon";

interface ProfileIdentityCardProps {
    level?: number;
    rank?: string;
    solved?: number;
    accuracy?: number;
    currentXP?: number;
    nextLevelXP?: number;
}

export const tempProfileData: ProfileIdentityCardProps = {
  rank: "Rank Tier II",

  solved: 1248,

  level: 12,

  accuracy: 82,

  currentXP: 1248,
  nextLevelXP: 1500,
};

export const ProfileIdentityCard =({
    level = 12,
    rank = "Rank Tier II",
    solved = 1248,
    accuracy = 82,
    currentXP = 1248,
    nextLevelXP = 1500,
}: ProfileIdentityCardProps) => {
    const progress = Math.min(
        100,
        (currentXP / nextLevelXP) * 100,
    );

    const remainingXP = Math.max(
        0,
        nextLevelXP - currentXP,
    );

    return (
        <Card className="rounded-[34px] border border-border bg-white/4">
            <Card.Body>

                {/* Identity */}
                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center gap-2">
                        <View className="h-10 w-10 items-center justify-center rounded-xl border border-primary-border bg-surface-container-high">
                            {/* <Award
                                size={21}
                                color="#5CC6E2"
                                strokeWidth={2}
                            /> */}
                            <FontAwesome6 name="award" size={21} color="#5CC6E2" />
                        </View>

                        <View>
                            <Text className="font-poppins-semibold text-sm text-text-primary">
                                Quiz Explorer
                            </Text>

                            <Text className="mt-0.5 font-poppins-medium text-xs text-text-secondary">
                                {rank}
                            </Text>
                        </View>
                    </View>

                    {/* Level */}
                    <View className="rounded-full border border-primary-border bg-primary-soft px-3 py-1">
                        <Text className="font-poppins-semibold text-[10px] leading-normal text-primary">
                            LV. {level}
                        </Text>
                    </View>
                </View>
                {/* Stats */}
                <View className="my-3 flex-row overflow-hidden rounded-xl border border-border-subtle bg-surface-container-lowest/60">
                    <View className="flex-1 items-center py-2.5">
                        <Text className="font-poppins-semibold text-lg tracking-tight text-text-primary">
                            {solved.toLocaleString()}
                        </Text>

                        <Text className="mt-0.5 font-poppins-medium text-[10px] text-text-tertiary">
                            QUESTIONS SOLVED
                        </Text>
                    </View>

                    <View className="my-2 w-px bg-border-subtle" />

                    <View className="flex-1 items-center py-2.5">
                        <Text className="font-poppins-semibold text-lg tracking-tight text-primary">
                            {accuracy}%
                        </Text>

                        <Text className="mt-0.5 font-poppins-medium text-[10px] text-text-tertiary">
                            AVERAGE ACCURACY
                        </Text>
                    </View>
                </View>

                {/* XP Header */}
                <View className="mb-1.5 flex-row items-center justify-between">
                    <Text className="font-poppins-medium text-xs text-text-secondary">
                        Experience
                    </Text>

                    <Text className="font-poppins-semibold text-[10px] leading-normal text-text-primary">
                        {currentXP.toLocaleString()} /{" "}
                        {nextLevelXP.toLocaleString()} XP
                    </Text>
                </View>

                {/* XP Progress */}
                <View className="h-2.5  p-0.5">
                    <SegmentedProgress
                        progress={progress}
                        primaryColor="#5CC6E2"
                        secondaryColor="#31353c"
                    />
                </View>

                {/* Footer */}
                <View className="mt-2 flex-row items-center justify-between">
                    <Text className="font-poppins-medium text-[10px] text-text-tertiary">
                        {remainingXP > 0
                            ? `${remainingXP} XP to Level ${level + 1}`
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
}