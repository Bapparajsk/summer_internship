import { getCommonIcon } from '../../lib/icon';
import { Text, View } from 'react-native';
import { statusConfig, } from './constant';
import { ProfileHeroProps, Status } from './types';
import Svg, { Path } from 'react-native-svg';
import { UserAchievements } from './userAchievements';
import { UserSettingPopover } from './userSettingPopover';
import { getEmoji } from './emoji';


const ProfileStatusBadge = ({ status }: { status: Status }) => {
    const config = statusConfig[status];
    const { Icon, name } = getCommonIcon(config.icon);

    return (
        <View className="relative">
            <View className="relative">
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
                    <Icon size={10} name={name} color={config.text} className={"mb-0.5"} />

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

    const { emoji, background } = getEmoji(avatar);

    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 p-3">
            {/* Profile Row */}
            <View className="flex-row items-center relative">

                <View className='absolute -top-3 left-17.75'>
                    <ProfileStatusBadge status={status} />
                </View>

                <View className="rounded-[24px]">
                    <View className='size-18 rounded-[24px] items-center justify-center' style={{ backgroundColor: background }}>
                        <Text className='text-3xl'>
                            {emoji}
                        </Text>
                    </View>
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

            {/* setting popover */}
            <UserSettingPopover />

            {/* user description */}
            <View className='w-full mt-3'>
                <Text
                    className='text-xs font-poppins-medium text-text-secondary'
                    numberOfLines={3}
                >
                    CS sophomore passionate about distributed algorithms, competitive programming & quiz sprints 🚀
                </Text>
            </View>

            {/* Stats */}
            <UserAchievements
                cgpa={cgpa}
                rank={rank}
                streak={streak}
                achievements={achievements}
            />

        </View>
    );
}