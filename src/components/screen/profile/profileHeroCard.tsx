import { getCommonIcon, IconName, MaterialCommunityIcons, MaterialIcons } from '../../lib/icon';
import {
    Image,
    Text,
    View
} from 'react-native';
import { SelectPopover, SelectOption } from '../../select';
import { cn } from 'heroui-native';

type Status = "Excellent" | "Good" | "Average" | "Poor" | "Failing";

type StatusConfig = {
    bg: string;
    border: string;
    text: string;
    icon: IconName
}

type ProfileHeroProps = {
    name: string;
    role: string;
    program: string;
    semester: string;

    avatar: string;

    status: Status;

    cgpa: string;
    streak: number;
    rank: string;
    achievements: number;
};

const className = "px-2 py-1.5"

const options: SelectOption[] = [
    { id: "edit-name", label: "Edit Name", iconName: "edit", classNames: { container: className } },
    { id: "profile-image", label: "Update Image", iconName: "image", classNames: { container: className } },
    {
        id: "log-out", label: "Log Out", iconName: "logout", classNames: {
            container: className + " bg-danger-soft px-3",
            label: "text-red-500",
            startIconColor: "#fb2c36"
        }
    }
];


const statusConfig: Record<Status, StatusConfig> = {
    Excellent: {
        bg: "#10B9811F",
        border: "#10B98166",
        text: "#10B981",
        icon: "check-circle",
    },
    Good: {
        bg: "#3B82F61F",
        border: "#3B82F666",
        text: "#3B82F6",
        icon: "check-circle",
    },
    Average: {
        bg: "#F59E0B1F",
        border: "#F59E0B66",
        text: "#F59E0B",
        icon: "minus-circle",
    },
    Poor: {
        bg: "#F973161F",
        border: "#F9731666",
        text: "#F97316",
        icon: "alert",
    },
    Failing: {
        bg: "#EF44441F",
        border: "#EF444466",
        text: "#EF4444",
        icon: "x-circle",
    },
};

// return bg-color / border-color and icon
const getStatusConfig = (status: Status) => {
    return statusConfig[status];
}

function StatItem({
    icon,
    value,
    label,
    color,
}: {
    icon: keyof typeof MaterialIcons.glyphMap;
    value: string | number;
    label: string;
    color: string;
}) {
    return (
        <View className="items-center">
            <MaterialIcons
                name={icon}
                size={16}
                color={color}
            />

            <Text
                className="mt-0.5 text-[10px] font-poppins-semibold"
                style={{ color }}
            >
                {value}
            </Text>

            <Text className="text-[8px] font-poppins-medium text-zinc-500">
                {label}
            </Text>
        </View>
    );
}

const ProfileStatusBadge = ({ status }: { status: Status }) => {
    const config = getStatusConfig(status);
    const { Icon, name } = getCommonIcon(config.icon);

    return (
        <View
            className="flex-row gap-x-0.5 rounded-full items-center px-1.5 py-0.5"
            style={{
                borderWidth: 1,
                borderColor: config.border,
                backgroundColor: config.bg
            }}
        >
            <Icon size={10} color={config.text} name={name}/>
            <Text
                className={cn("text-[8px] leading-normal font-poppins-semibold uppercase")}
                style={{ color: config.text }}
            >
                {status}
            </Text>
        </View>
    );
}

export const ProfileHeroCard = ({
    name,
    role,
    program,
    semester,

    avatar,

    status,

    cgpa,
    streak,
    rank,
    achievements
}: ProfileHeroProps) => {
    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 p-3">
            {/* Profile Row */}
            <View className="flex-row items-center">

                <View className="rounded-[28px]">
                    <Image
                        source={{ uri: avatar }}
                        className="size-18 rounded-[28px]"
                        resizeMode="cover"
                    />
                </View>

                <View className="ml-2 flex-1">

                    <View className="flex-row items-center gap-1">
                        <Text
                            numberOfLines={1}
                            className="text-primary text-base font-poppins-semibold"
                        >
                            {name}
                        </Text>
                        <ProfileStatusBadge status={status}/>
                    </View>

                    <Text
                        numberOfLines={1}
                        className="font-poppins-medium text-[10px] text-zinc-300"
                    >
                        {role}
                    </Text>

                    <Text className="font-poppins-light text-[10px] text-zinc-500">
                        {program} • Semester {semester}
                    </Text>
                </View>

            </View>

            <View className="absolute right-4 top-4 z-10 flex-row gap-2">
                <SelectPopover
                    items={options}
                    showActiveIcon={false}
                    showActiveColor={false}
                    activeIsOpenText="Account Center"
                    activeIsOpenTextPosition="right"
                    activeContent={
                        <MaterialCommunityIcons
                            name="account-cog-outline"
                            size={18}
                            color="#9CA3AF"
                        />
                    }
                    triggerClassName="px-3 py-2"
                    itemStyle={{
                        labelClassName: "text-[10px]"
                    }}
                    iconSize={12}
                    activeIsOpenTextClassName='text-xs font-poppins-medium'
                />
            </View>

            {/* Stats */}
            <View className="mt-5 flex-row justify-around rounded-2xl border border-white/5 bg-white/3 py-2">

                <StatItem
                    icon="school"
                    value={cgpa}
                    label="CGPA"
                    color="#818CF8"
                />

                <StatItem
                    icon="local-fire-department"
                    value={streak}
                    label="Streak"
                    color="#FB923C"
                />

                <StatItem
                    icon="emoji-events"
                    value={rank}
                    label="Rank"
                    color="#FACC15"
                />

                <StatItem
                    icon="workspace-premium"
                    value={achievements}
                    label="Awards"
                    color="#00D5BE"
                />

            </View>
        </View>
    );
}