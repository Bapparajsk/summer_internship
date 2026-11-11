import { getCommonIcon, MaterialCommunityIcons, MaterialIcons } from '../../lib/icon';
import { Image, Text, View } from 'react-native';
import { SelectPopover } from '../../select';
import { useRouter } from 'expo-router';
import { options, optionsHref, statusConfig, } from './constant';
import { ProfileHeroProps, Status } from './types';
import Svg, { Path } from 'react-native-svg';



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
    const config = statusConfig[status];
    const { Icon, name } = getCommonIcon(config.icon);

    return (
        <View className="relative">
            <View className="relative">
                {/* Single continuous border */}
                <Svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 140 42"
                    preserveAspectRatio="none"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                >
                    <Path
                        d="
                            M 16 0.5
                            H 124
                            Q 139.5 0.5 139.5 16
                            V 21
                            Q 139.5 36.5 124 36.5
                            H 19
                            Q 16 36.5 13 39
                            L 5 41
                            L 8 34
                            Q 0.5 29 0.5 21
                            V 16
                            Q 0.5 0.5 16 0.5
                            Z
                        "
                        fill={config.bg}
                        stroke={config.border}
                        strokeWidth={2}
                        strokeLinejoin="round"
                    />
                </Svg>

                {/* Content */}
                <View className="flex-row items-center gap-x-1 px-2 py-0.5">
                    <Icon size={10} name={name} color={config.text} className={"mb-0.5"}/>

                    <Text
                        className="text-[9px] font-poppins-semibold uppercase"
                        style={{ color: config.text }}
                    >
                        {status}
                    </Text>
                </View>
            </View>
        </View>
    );
};

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

    const router = useRouter();

    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 p-3">
            {/* Profile Row */}
            <View className="flex-row items-center relative">

                <View className='absolute -top-3 left-17.75'>
                    <ProfileStatusBadge status={status} />
                </View>

                <View className="rounded-[24px]">
                    <Image
                        source={{ uri: avatar }}
                        className="size-18 rounded-[24px]"
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
                    </View>

                    <Text
                        numberOfLines={1}
                        className="font-poppins-medium text-xs text-text-secondary"
                    >
                        {role}
                    </Text>

                    <Text className="font-poppins-medium text-[10px] text-text-secondary">
                        {program} • Semester {semester}
                    </Text>
                </View>

            </View>

            <View className="absolute right-4 top-4 z-10 flex-row gap-2">
                <SelectPopover
                    items={options}
                    showActiveIcon={false}
                    showActiveColor={false}
                    separators={[3]}
                    activeIsOpenText="Account Center"
                    activeIsOpenTextPosition="right"
                    containerClassName="border-white/20"
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
                    onSelect={(item) => {
                        const url = optionsHref[item.id];
                        if (url) {
                            router.push(url);
                        }
                    }}
                />
            </View>

            <View className='w-full mt-3'>
                <Text
                    className='text-xs font-poppins-medium text-text-secondary'
                    numberOfLines={3}
                >
                    CS sophomore passionate about distributed algorithms, competitive programming & quiz sprints 🚀
                </Text>
            </View>

            {/* Stats */}
            <View className="mt-3 flex-row justify-around rounded-[22px] border border-white/5 bg-white/3 py-2">

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