import { Text, View } from "react-native";

interface RoomInfoHeaderProps {
    hostName?: string;
    title?: string;
    category?: string;
    questionCount?: number;
    durationMinutes?: number;
    difficulty?: "Beginner" | "Intermediate" | "Advanced";
}

export function RoomInfoHeader({
    hostName = "Bappa",
    title = "Data Structures Challenge",
    category = "DSA & Algorithms",
    questionCount = 20,
    durationMinutes = 10,
    difficulty = "Intermediate",
}: RoomInfoHeaderProps) {
    return (
        <View className="items-center px-4">
            {/* Host */}
            <View className="mb-2 flex-row items-center gap-2 rounded-full bg-surface-container-low px-3 py-1">
                <Text className="font-poppins-light text-xs text-text-secondary">
                    Host:{" "}
                    <Text className="font-poppins-semibold text-text-primary">
                        {hostName}
                    </Text>
                </Text>
            </View>

            {/* Room title */}
            <Text className="mb-2 text-center font-poppins-semibold text-xl tracking-tight text-text-primary">
                {title}
            </Text>

            {/* Metadata */}
            <View className="flex-row flex-wrap items-center justify-center gap-1.5">
                <MetadataChip label={category} variant="primary" />

                <MetadataChip
                    label={`${questionCount} Qs · ${durationMinutes}m`}
                    variant="secondary"
                />

                <MetadataChip label={difficulty} variant="muted" />
            </View>
        </View>
    );
}

function MetadataChip({
    label,
    variant,
}: {
    label: string;
    variant: "primary" | "secondary" | "muted";
}) {
    const textColor =
        variant === "primary"
            ? "text-primary"
            : variant === "muted"
                ? "text-text-tertiary"
                : "text-text-secondary";

    return (
        <View className="rounded-full bg-surface-container-high px-2.5 py-1">
            <Text className={`font-poppins-medium text-[8px] leading-normal ${textColor}`}>
                {label}
            </Text>
        </View>
    );
}