import { View, Text } from 'react-native'
import { getEmoji } from '../screen/profile/emoji';
import { cn, Skeleton } from 'heroui-native';
import { FC } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import type { UserQueryState } from '@/types/user';

export type UserAvatarProps = UserQueryState & {
  size?: number;
  containerClassName?: string;
  skeletonClassName?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({
  user,
  isLoading,
  isError,
  containerClassName,
  size = 30,
  skeletonClassName,
}) => {
  if (isLoading) {
    return <Skeleton className={cn('w-full h-full', skeletonClassName)} />;
  }

  if (!user) {
    return (
      <View className={cn('size-full items-center justify-center rounded-[24px] bg-surface-container-high', containerClassName)}>
        <MaterialIcons
          name={isError ? 'error-outline' : 'person-outline'}
          size={size}
          color={isError ? '#F87171' : '#718096'}
        />
      </View>
    );
  }

  const { background, emoji } = getEmoji(user.avatar);
  return (
    <View className={cn('size-full rounded-[24px] items-center justify-center', containerClassName)} style={{ backgroundColor: background }}>
      <Text style={{ fontSize: size }}>
        {emoji}
      </Text>
    </View>
  )
}