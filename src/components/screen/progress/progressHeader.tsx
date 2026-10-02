import { PressableFeedback } from "heroui-native/pressable-feedback";
import { Image, Text, View } from "react-native";



const calendarIcons = {
    1: require("@/assets/calendar/calendar-1.png"),
    2: require("@/assets/calendar/calendar-2.png"),
    3: require("@/assets/calendar/calendar-3.png"),
    4: require("@/assets/calendar/calendar-4.png"),
    5: require("@/assets/calendar/calendar-5.png"),
    6: require("@/assets/calendar/calendar-6.png"),
    7: require("@/assets/calendar/calendar-7.png"),
    8: require("@/assets/calendar/calendar-8.png"),
    9: require("@/assets/calendar/calendar-9.png"),
    10: require("@/assets/calendar/calendar-10.png"),
    11: require("@/assets/calendar/calendar-11.png"),
    12: require("@/assets/calendar/calendar-12.png"),
    13: require("@/assets/calendar/calendar-13.png"),
    14: require("@/assets/calendar/calendar-14.png"),
    15: require("@/assets/calendar/calendar-15.png"),
    16: require("@/assets/calendar/calendar-16.png"),
    17: require("@/assets/calendar/calendar-17.png"),
    18: require("@/assets/calendar/calendar-18.png"),
    19: require("@/assets/calendar/calendar-19.png"),
    20: require("@/assets/calendar/calendar-20.png"),
    21: require("@/assets/calendar/calendar-21.png"),
    22: require("@/assets/calendar/calendar-22.png"),
    23: require("@/assets/calendar/calendar-23.png"),
    24: require("@/assets/calendar/calendar-24.png"),
    25: require("@/assets/calendar/calendar-25.png"),
    26: require("@/assets/calendar/calendar-26.png"),
    27: require("@/assets/calendar/calendar-27.png"),
    28: require("@/assets/calendar/calendar-28.png"),
    29: require("@/assets/calendar/calendar-29.png"),
    30: require("@/assets/calendar/calendar-30.png"),
    31: require("@/assets/calendar/calendar-31.png"),
} as const;

export const ProgressHeader = ({
    onFilter,
}: {
    onFilter?: () => void;
}) => {

    const day = new Date().getDate() as keyof typeof calendarIcons;

    return (
        <View className="flex-row items-start justify-between pt-1">
            <View className="flex-1">
                <Text className="font-poppins-semibold text-[10px] uppercase tracking-[1.5px] text-primary">
                    Performance Analytics
                </Text>

                <Text className="mt-0.5 font-poppins-semibold text-3xl tracking-tight text-text-primary">
                    Progress
                </Text>

                <Text className="mt-0.5 font-poppins-medium text-xs text-text-secondary">
                    Track your technical mastery & velocity
                </Text>
            </View>

            <PressableFeedback
                onPress={onFilter}
                className="ml-3 h-15 w-15 items-center justify-center rounded-full bg-white/5 border border-border"
                hitSlop={8}
            >
                <Image
                    source={calendarIcons[day]}
                    className="h-8 w-8"

                />
            </PressableFeedback>
        </View>
    );
}

