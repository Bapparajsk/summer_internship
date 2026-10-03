import { useMemo } from "react";
import { Text, View } from "react-native";
import { Flame } from "lucide-react-native";

type Activity = {
    date: string; // YYYY-MM-DD
    quizzes: number;
};

const activity: Activity[] = [
    { date: "2026-10-03", quizzes: 1 },
    { date: "2026-10-05", quizzes: 3 },
    { date: "2026-10-08", quizzes: 1 },
    { date: "2026-10-10", quizzes: 1 },
    { date: "2026-10-12", quizzes: 4 },
    { date: "2026-10-14", quizzes: 1 },
    { date: "2026-10-15", quizzes: 3 },
    { date: "2026-10-17", quizzes: 1 },
    { date: "2026-10-19", quizzes: 1 },
    { date: "2026-10-21", quizzes: 1 },
    { date: "2026-10-22", quizzes: 2 },
    { date: "2026-10-24", quizzes: 1 },
    { date: "2026-10-26", quizzes: 1 },
    { date: "2026-10-28", quizzes: 1 },
    { date: "2026-10-30", quizzes: 1 },
];

const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function getDays(year: number, month: number) {
    const first = new Date(year, month, 1);
    const total = new Date(year, month + 1, 0).getDate();

    // Monday = 0
    const offset = (first.getDay() + 6) % 7;

    return [
        ...Array(offset).fill(null),
        ...Array.from({ length: total }, (_, i) => i + 1),
    ];
}

export const QuizActivityCalendar = () => {
    const year = 2026;
    const month = 9; // October

    const days = useMemo(
        () => getDays(year, month),
        [],
    );

    const activityMap = useMemo(
        () =>
            new Map(
                activity.map((item) => [
                    item.date,
                    item.quizzes,
                ]),
            ),
        [],
    );

    const today = "2026-10-24";

    const quizDays = activity.filter(
        (item) => item.quizzes > 0,
    ).length;

    return (
        <View className="overflow-hidden rounded-[34px] border border-border bg-white/4 px-4 py-6">
            {/* Header */}
            <View className="mb-4 flex-row items-start justify-between">
                <View>
                    <Text className="font-poppins-semibold text-base text-text-primary">
                        Quiz activity
                    </Text>

                    <Text className="mt-0.5 font-poppins-medium text-[10px] text-text-secondary">
                        Complete a quiz to mark your day.
                    </Text>
                </View>

                <View className="flex-row items-center gap-1.5 rounded-full bg-surface-container-high px-3 py-1.5">
                    <View className="h-1.5 w-1.5 rounded-full bg-primary" />

                    <Text className="font-poppins-medium leading-normal text-[9px] font-medium uppercase tracking-wider text-primary">
                        October 2026
                    </Text>
                </View>
            </View>

            {/* Weekdays */}
            <View className="mb-1 flex-row">
                {weekdays.map((day) => (
                    <Text
                        key={day}
                        className="flex-1 text-center font-poppins-medium text-[9px] font-semibold tracking-wider text-text-secondary"
                    >
                        {day}
                    </Text>
                ))}
            </View>

            {/* Calendar */}
            <View className="flex-row flex-wrap">
                {days.map((day, index) => {
                    if (!day) {
                        return (
                            <View
                                key={`empty-${index}`}
                                className="mb-1.5 w-[14.285%] px-0.5"
                            />
                        );
                    }

                    const date = `${year}-${String(month + 1).padStart(
                        2,
                        "0",
                    )}-${String(day).padStart(2, "0")}`;

                    const quizzes = activityMap.get(date) ?? 0;
                    const completed = quizzes > 0;
                    const isToday = date === today;
                    const multiple = quizzes > 1;

                    return (
                        <View
                            key={date}
                            className="mb-1.5 w-[14.285%] px-0.5"
                        >
                            <View
                                className={`h-10 items-center justify-center rounded-full ${completed
                                        ? multiple
                                            ? "bg-primary/30"
                                            : "bg-primary/15"
                                        : "bg-surface-container/50"
                                    }`}
                            >
                                <Text
                                    className={`font-poppins-medium text-[10px] ${completed
                                            ? "text-text-primary"
                                            : "text-text-secondary"
                                        }`}
                                >
                                    {day}
                                </Text>

                                {isToday && (
                                    <View className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>

            {/* Summary */}
            <View className="mt-2 flex-row items-center justify-between border-t border-border-subtle pt-3">
                <View className="flex-row items-center gap-2">
                    <View className="h-6 w-6 items-center justify-center rounded-md bg-primary-soft">
                        <Flame
                            size={13}
                            color="#5CC6E2"
                            fill="#5CC6E2"
                        />
                    </View>

                    <Text className="font-poppins-semibold text-xs text-text-primary">
                        {quizDays} quiz days this month
                    </Text>
                </View>

                <Text className="font-poppins-medium text-[10px] text-primary">
                    Keep going
                </Text>
            </View>
        </View>
    );
}