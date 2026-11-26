import { getCommonIcon } from '../../lib/icon';
import { Text, View } from 'react-native';
import { statusConfig, } from './constant';
import Svg, { Path } from 'react-native-svg';
import { UserAchievements } from './userAchievements';
import { UserSettingPopover } from './userSettingPopover';
import { UserAvatar, UserName } from '@/components/user';
import { useUser } from '@/hooks/queries/use-user';
import { Skeleton } from 'heroui-native';
import { AcademicInformation } from './academicInformation';
import { UserDescription } from './userDescription';

const ProfileStatusBadge = () => {

    const { data: user, isLoading} = useUser();

    const config = statusConfig[user?.status ?? "Good"];
    const { Icon, name } = getCommonIcon(config.icon);

    return (
        <View className="relative">
            <Skeleton isLoading={isLoading} className='w-20 h-4.25 rounded-full'>
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
                        {user?.status ?? "Good"}
                    </Text>
                </View>
            </Skeleton>
        </View>
    );
};

export const ProfileHeroCard = () => {

    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 p-3">
            {/* Profile Row */}
            <View className="flex-row items-center relative">

                <View className='absolute -top-3 left-17.75'>
                    <ProfileStatusBadge />
                </View>
                <View className="size-18">
                    <UserAvatar skeletonClassName='rounded-[24px]' />
                </View>

                <View className="ml-2 flex-1 gap-0.5">
                    <View className="flex-row items-center h-5">
                        <UserName
                            isHeader={false}
                            classname='text-base'
                            skeletonClassName='w-30'
                        />
                    </View>

                    <AcademicInformation />
                </View>
            </View>

            {/* setting popover */}
            <UserSettingPopover />

            {/* user description */}
            <UserDescription />

            {/* Stats */}
            <View className='mt-3'>
                <UserAchievements />
            </View>

        </View>
    );
}