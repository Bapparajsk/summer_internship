import { MaterialIcons } from "@expo/vector-icons";
import { cn, PressableFeedback } from "heroui-native";
import { Text, View } from "react-native";
import { SegmentedProgress } from "../progressBar";
import { getCommonIcon } from "../lib/icon";

type Difficulty = "Easy" | "Medium" | "Hard" | "Expert";

type QuizType = "new" | "continue" | "live" | "join";

export type QuizCardProps = {
    type: QuizType;

    title: string;
    chapter: string;
    description?: string;

    difficulty?: Difficulty;

    questions: number;
    duration: number;

    // Normal quiz
    accuracy?: number;

    // Continue quiz
    solved?: number;

    // Live / join quiz
    participants?: number;
    host?: string;

    // Join quiz
    code?: string;

    // icon
    icon?: string;

    onPress?: () => void;
    onScanQR?: () => void;
};

const difficultyColor: Record<Difficulty, string> = {
    Easy: "#22C55E",
    Medium: "#EAB308",
    Hard: "#EF4444",
    Expert: "#A855F7",
};

const typeConfig = {
    new: {
        action: "Start",
        actionIcon: "arrow-forward",
    },

    continue: {
        action: "Continue",
        actionIcon: "play-circle",
    },

    live: {
        action: "Join",
        actionIcon: "sensors",
    },

    join: {
        icon: "dns",
        action: "Join",
        actionIcon: "login",
    },
} as const;

export function QuizCard({
    type,
    title,
    chapter,
    description,
    difficulty,
    questions,
    duration,
    accuracy,
    solved,
    participants,
    host,
    code,
    icon = "quiz",
    onPress,
    onScanQR,
}: QuizCardProps) {
    const config = typeConfig[type];
    const { Icon, name: iconName } = getCommonIcon(icon);

    const difficultyColorValue = difficulty
        ? difficultyColor[difficulty]
        : "#22D3EE";


    return (
        <View
            className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 p-4 mb-3"
        >
            {/* Live glow */}
            {type === "live" && (
                <View
                    className="absolute -right-8 -top-8 h-24 w-24 rounded-full"
                    style={{
                        backgroundColor: "rgba(34,211,238,0.08)",
                    }}
                />
            )}

            {/* Header */}
            <View className="flex-row items-center justify-between">
                <View className="flex-1 flex-row items-center">
                    {type === "live" ? (
                        <View className="mr-1.5 h-2 w-2 rounded-full bg-cyan-400" />
                    ) : (
                        <Icon
                            name={iconName}
                            size={16}
                            color="#22D3EE"
                        />
                    )}

                    {type === "live" ? (
                        <>
                            <View className="rounded-md bg-cyan-400/15 px-1.5 py-0.5">
                                <Text className="text-[10px] font-poppins-semibold uppercase tracking-wider text-cyan-400">
                                    LIVE
                                </Text>
                            </View>

                            {host && (
                                <Text
                                    numberOfLines={1}
                                    className="ml-1.5 flex-1 text-xs font-poppins-medium text-text-tertiary"
                                >
                                    · Hosted by {host}
                                </Text>
                            )}
                        </>
                    ) : (
                        <Text
                            numberOfLines={1}
                            className="ml-1.5 flex-1 text-xs font-poppins-medium text-text-tertiary"
                        >
                            {chapter}
                        </Text>
                    )}
                </View>

                {/* Difficulty */}
                {difficulty && type !== "live" && (
                    <View
                        className="rounded-full px-2.5 py-1"
                        style={{
                            backgroundColor: `${difficultyColorValue}15`,
                        }}
                    >
                        <Text
                            className="text-[10px] font-poppins-semibold uppercase"
                            style={{
                                color: difficultyColorValue,
                            }}
                        >
                            {difficulty}
                        </Text>
                    </View>
                )}

                {/* Live participants */}
                {type === "live" && participants !== undefined && (
                    <View className="ml-2 flex-row items-center">
                        <MaterialIcons
                            name="group"
                            size={14}
                            color="#22D3EE"
                        />

                        <Text className="ml-1 text-xs font-poppins-medium text-cyan-400">
                            {participants}
                        </Text>
                    </View>
                )}
            </View>

            {/* Content */}
            <View className="mt-2">
                <Text
                    numberOfLines={1}
                    className="text-base font-poppins-semibold tracking-tight text-text-primary"
                >
                    {title}
                </Text>

                {description && (
                    <Text
                        numberOfLines={1}
                        className="mt-1 text-xs font-poppins-medium text-text-tertiary"
                    >
                        {description}
                    </Text>
                )}
            </View>

            {/* Continue progress */}
            {type === "continue" && solved !== undefined && (
                <View className="mt-3 flex-row items-center gap-2">
                    <View className="h-1.5 flex-1 overflow-hidden">
                        <SegmentedProgress
                            progress={solved / questions * 100}
                        />
                    </View>

                    <Text className="text-[11px] font-poppins-medium text-cyan-400">
                        {solved}/{questions} solved
                    </Text>
                </View>
            )}

            {/* Footer */}
            <View className="mt-4 flex-row items-center justify-between">
                {/* Metadata */}
                <View className="flex-row items-center">
                    {type === "join" ? (
                        <View>
                            <View className="flex-row items-center">
                                <Text className="text-[11px] font-poppins-medium text-text-tertiary">
                                    Code:
                                </Text>

                                <Text className="ml-1 text-[11px] font-poppins-semibold tracking-wider text-cyan-400">
                                    {code}
                                </Text>
                            </View>

                            {host && participants !== undefined && (
                                <Text className="mt-0.5 text-[10px] font-poppins-medium text-text-tertiary">
                                    {host} · {participants} Players
                                </Text>
                            )}
                        </View>
                    ) : (
                        <>
                            <View className="flex-row items-center">
                                <MaterialIcons
                                    name="quiz"
                                    size={14}
                                    color="#71717A"
                                />

                                <Text className="ml-1 text-[11px] font-poppins-medium text-text-tertiary">
                                    {questions} Qs
                                </Text>
                            </View>

                            <Text className="mx-2 text-text-tertiary">
                                ·
                            </Text>

                            <View className="flex-row items-center">
                                <MaterialIcons
                                    name="schedule"
                                    size={14}
                                    color="#71717A"
                                />

                                <Text className="ml-1 text-[11px] font-poppins-medium text-text-tertiary">
                                    {duration} min
                                </Text>
                            </View>

                            {accuracy !== undefined && (
                                <>
                                    <Text className="mx-2 text-text-tertiary">
                                        ·
                                    </Text>

                                    <Text className="text-[11px] font-poppins-medium text-cyan-400">
                                        {accuracy}% avg
                                    </Text>
                                </>
                            )}
                        </>
                    )}
                </View>

                {/* Actions */}
                <View className="flex-row items-center gap-2">
                    {/* QR */}
                    {type === "join" && (
                        <PressableFeedback
                            onPress={onScanQR}
                            className="h-9 w-9 items-center justify-center rounded-xl bg-white/6"
                        >
                            <MaterialIcons
                                name="qr-code-scanner"
                                size={18}
                                color="#A1A1AA"
                            />
                        </PressableFeedback>
                    )}

                    {/* Main action */}
                    <PressableFeedback
                        onPress={onPress}
                        className={cn("flex-row items-center rounded-xl px-3.5 py-2",
                            {
                                "bg-primary/10": type === "new" || type === "join",
                                "bg-primary/20": type === "live" || type === "continue",
                            }
                        )}
                    >
                        <Text className={cn("text-xs font-poppins-semibold",
                            {
                                "text-white": type === "new" || type === "join",
                                "text-primary": type === "live" || type === "continue",
                            }
                        )}>
                            {config.action}
                        </Text>

                        <MaterialIcons
                            name={config.actionIcon as any}
                            size={16}
                            color={type === "new" || type === "join" ? "#FFFFFF" : "#5cc6e2"}
                            style={{ marginLeft: 4 }}
                        />
                    </PressableFeedback>
                </View>
            </View>
        </View>
    );
}