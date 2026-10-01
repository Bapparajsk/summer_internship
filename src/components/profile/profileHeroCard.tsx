import { MaterialCommunityIcons, MaterialIcons } from '../lib/icon';
import {
    Image,
    Text,
    View
} from 'react-native';
import { SelectPopover, SelectOption } from '../select/select';

type ProfileHeroProps = {
    name: string;
    role: string;
    program: string;
    semester: string;

    avatar: string;

    status: string;

    cgpa: string;
    streak: number;
    rank: string;
    achievements: number;

    onEdit?: () => void;
    onShare?: () => void;
};

const options: SelectOption[] = [
    { id: "edit-name", label: "Edit Name", iconName: "edit" },
    { id: "profile-image", label: "Profile Image", iconName: "account-circle" },
    { id: "3", label: "Private", iconName: "lock" }
];

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
                size={18}
                color={color}
            />

            <Text
                className="mt-0.5 font-poppins-semibold"
                style={{ color }}
            >
                {value}
            </Text>

            <Text className="text-[10px] font-poppins-medium text-zinc-500">
                {label}
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
    achievements,

    onEdit,
    onShare,
}: ProfileHeroProps) => {
    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 px-4 py-4">
            {/* Profile Row */}
            <View className="flex-row items-center">

                <View className="rounded-[28px]">
                    <Image
                        source={{ uri: avatar }}
                        className="h-20 w-20 rounded-[28px]"
                        resizeMode="cover"
                    />
                </View>

                <View className="ml-4 flex-1">

                    <Text
                        numberOfLines={1}
                        className="text-primary text-xl font-poppins-semibold"
                    >
                        {name}
                    </Text>

                    <Text
                        numberOfLines={1}
                        className="mt-0.5 font-poppins-medium text-xs text-zinc-300"
                    >
                        {role}
                    </Text>

                    <Text className="mt-0.5 font-poppins-light text-xs text-zinc-500">
                        {program} • Semester {semester}
                    </Text>

                    <View className="mt-2 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1">
                        <Text className="text-[10px] leading-tight font-poppins-semibold uppercase text-emerald-400">
                            ⭐ {status}
                        </Text>
                    </View>

                </View>

            </View>

            <View className="absolute right-4 top-4 z-10 flex-row gap-2">
                <SelectPopover
                    items={options}
                    showActiveIcon={false}
                    showActiveColor
                    activeIsOpenText="Privacy"
                    activeIsOpenTextPosition="right"
                    activeContent={
                        <MaterialCommunityIcons 
                            name="account-cog-outline" 
                            size={18} 
                            color="#9CA3AF" 
                        />
                    }
                    triggerClassName="px-3 py-2"
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