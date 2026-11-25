import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { useUser } from '@/hooks/queries/use-user';
import { Skeleton } from 'heroui-native';

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


export const UserAchievements = () => {

  const { data: user, isLoading } = useUser();

  if(isLoading) {
    return (
      <Skeleton className='w-full h-17 rounded-[22px]'/>
    )
  }

  return (
    <View className="mt-3 h-17 flex-row justify-around rounded-[22px] border border-white/5 bg-white/3 py-2">
      <StatItem
        icon="local-fire-department"
        value={Number(user?.achievement_stats?.streak) ?? 0}
        label="Streak"
        color="#FB923C"
      />

      <StatItem
        icon="emoji-events"
        value={Number(user?.achievement_stats?.rank) ?? 0}
        label="Rank"
        color="#FACC15"
      />

      <StatItem
        icon="workspace-premium"
        value={Number(user?.achievement_stats?.achievements) ?? 0}
        label="Awards"
        color="#00D5BE"
      />
    </View>
  )
}
