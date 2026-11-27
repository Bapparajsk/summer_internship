import { getCommonIcon } from '../../lib/icon';
import { Text, View } from 'react-native';
import { statusConfig, } from './constant';
import Svg, { Path } from 'react-native-svg';
import { UserAchievements } from './userAchievements';
import { UserSettingPopover } from './userSettingPopover';
import { UserAvatar } from '@/components/user';
import { useUser } from '@/hooks/queries/use-user';
import { Skeleton } from 'heroui-native';
import { AcademicInformation } from './academicInformation';
import { UserDescription } from './userDescription';
import { MaterialIcons } from '@expo/vector-icons';
import type { UserQueryState } from '@/types/user';
import { useUser as useClerkUser } from '@clerk/expo';

const ProfileStatusBadge = ({ user, isLoading, isError }: UserQueryState) => {
    if (isLoading) {
        return <Skeleton className="h-4.25 w-20 rounded-full" />;
    }

    if (!user) {
        return (
            <View className="rounded-full border border-danger/30 bg-danger/10 px-2 py-1">
                <Text className="font-poppins-semibold text-[9px] uppercase text-danger">
                    {isError ? 'Unavailable' : 'No status'}
                </Text>
            </View>
        );
    }

    const config = statusConfig[user.status];
    const { Icon, name } = getCommonIcon(config?.icon ?? "minus-circle");

    return (
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

            <View className="flex-row items-center gap-x-1 px-2 py-0.5">
                <Icon size={10} name={name} color={config.text} className={"mb-0.5"} />

                <Text
                    className="text-[9px] font-poppins-semibold uppercase"
                    style={{ color: config.text }}
                >
                    {user.status}
                </Text>
            </View>
        </View>
    );
};

export const ProfileHeroCard = () => {
    const { data: user, isLoading, isError } = useUser();
    const { user: clerkUser, isLoaded: isClerkUserLoaded } = useClerkUser();
    const userQueryState: UserQueryState = { user, isLoading, isError };

    return (
        <View className="relative rounded-[34px] border border-border bg-white/4 p-3">
            {/* Profile Row */}
            <View className="flex-row items-center relative">

                <View className='absolute -top-3 left-17.75'>
                    <ProfileStatusBadge {...userQueryState} />
                </View>
                <View className="size-18">
                    <UserAvatar {...userQueryState} skeletonClassName='rounded-[24px]' />
                </View>

                <View className="ml-2 flex-1 gap-0.5">
                    <View className="flex-row items-center h-5.75">
                        <Skeleton isLoading={!isClerkUserLoaded} className="h-full w-30 rounded-2xl">
                            <Text numberOfLines={1} className="text-base text-text-primary tracking-wide font-poppins-semibold">
                                {clerkUser?.fullName ?? 'User'}
                            </Text>
                        </Skeleton>
                    </View>

                    <AcademicInformation {...userQueryState} />
                </View>
            </View>

            {/* setting popover */}
            <UserSettingPopover />

            {/* user description */}
            <UserDescription {...userQueryState} />

            {/* Stats */}
            <View className='mt-3'>
                <UserAchievements {...userQueryState} />
            </View>

            {isError && user ? (
                <View className="mt-3 flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text className="font-poppins-medium text-[10px] text-danger">
                        Could not refresh profile details. Showing saved information.
                    </Text>
                </View>
            ) : null}

        </View>
    );
}