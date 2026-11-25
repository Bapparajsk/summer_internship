import { View, Text } from 'react-native'
import { useUser } from '@/hooks/queries/use-user';
import { getEmoji } from '../screen/profile/emoji';
import { cn, Skeleton } from 'heroui-native';
import { FC } from 'react';

export type UserAvatarProps = {
  size?: number;
  containerClassName?: string;
  skeletonClassName?: string;
}

export const UserAvatar: FC<UserAvatarProps> = ({ containerClassName, size = 30, skeletonClassName }) => {

  const { data: user, isPending } = useUser();

  const { background, emoji } = getEmoji(user?.avatar ?? "bear");

  return (
    <Skeleton className={cn('w-full h-full', skeletonClassName)} isLoading={isPending}>
      <View className={cn('size-full rounded-[24px] items-center justify-center', containerClassName)} style={{ backgroundColor: background }}>
        <Text style={{ fontSize: size }}>
          {emoji}
        </Text>
      </View>
    </Skeleton>
  )
}