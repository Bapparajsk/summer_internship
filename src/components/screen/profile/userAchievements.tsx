import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native'
import { ProfileHeroProps } from './types';

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

export type UserAchievementsProps = Pick<ProfileHeroProps, "cgpa" | "streak" | "rank" | "achievements">;

export const UserAchievements = ({ cgpa, streak, rank, achievements } : UserAchievementsProps) => {
  return (
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
  )
}
