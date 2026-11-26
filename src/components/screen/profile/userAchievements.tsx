import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { Skeleton } from 'heroui-native';
import type { UserQueryState } from '@/types/user';

const StatItem = ({
  icon,
  value,
  label,
  color,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string | number;
  label: string;
  color: string;
}) => {
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


export const UserAchievements = ({ user, isLoading, isError }: UserQueryState) => {
  if (isLoading) {
    return (
      <Skeleton className='w-full h-17 rounded-[22px]'/>
    )
  }

  if (isError && !user) {
    return (
      <View className="mt-3 h-17 items-center justify-center rounded-[22px] border border-white/5 bg-white/3">
        <Text className="text-[10px] font-poppins-medium text-text-tertiary">
          Could not load achievements
        </Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View className="mt-3 h-17 items-center justify-center rounded-[22px] border border-white/5 bg-white/3">
        <Text className="text-[10px] font-poppins-medium text-text-tertiary">
          Achievement data unavailable
        </Text>
      </View>
    );
  }

  const stats = user?.achievement_stats;
  const streak = Number(stats?.streak);
  const achievements = Number(stats?.achievements);
  const rank = stats?.rank?.trim();
  const isEmpty = !stats || (
    (!Number.isFinite(streak) || streak <= 0) &&
    (!rank) &&
    (!Number.isFinite(achievements) || achievements <= 0)
  );

  if (isEmpty) {
    return (
      <View className="mt-3 h-17 flex-row items-center justify-center gap-2 rounded-[22px] border border-white/5 bg-white/3">
        <MaterialIcons
          name="emoji-events"
          size={18}
          color="#718096"
        />
        <View>
          <Text className="text-[10px] font-poppins-semibold text-text-secondary">
            No achievements yet
          </Text>
          <Text className="text-[8px] font-poppins-medium text-text-tertiary">
            Complete quizzes to start earning rewards
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="h-17 flex-row justify-around rounded-[22px] border border-white/5 bg-white/3 py-2">
      <StatItem
        icon="local-fire-department"
        value={Number.isFinite(streak) ? streak : 0}
        label="Streak"
        color="#FB923C"
      />

      <StatItem
        icon="emoji-events"
        value={rank || 0}
        label="Rank"
        color="#FACC15"
      />

      <StatItem
        icon="workspace-premium"
        value={Number.isFinite(achievements) ? achievements : 0}
        label="Awards"
        color="#00D5BE"
      />
    </View>
  )
}
