import { View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

type PasswordStrongIndicatorProps = {
  newPassword: boolean;
  strength: number;
};

const STRENGTH_COLORS = [
  '#EF5350',
  '#FF7043',
  '#F6C453',
  '#66BB6A',
  '#26C6A5',
];

const STRENGTH_LABELS = [
  'Password is too short or simple',
  'Add uppercase letters and numbers',
  'Add numbers and special characters',
  'Use a longer, more unique password',
  'Your password looks strong',
];



const Segment = ({
  active,
  color,
}: {
  active: boolean;
  color: string;
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scaleX: withSpring(active ? 1 : 0, {
          damping: 20,
          stiffness: 300,
          mass: 0.4,
        }),
      },
    ],
  }), [active]);

  return (
    <View className="h-1 flex-1 overflow-hidden rounded-full bg-[#252D38]">
      <Animated.View
        className="h-full w-full rounded-full"
        style={[
          {
            backgroundColor: color,
            transformOrigin: 'left',
          },
          animatedStyle,
        ]}
      />
    </View>
  );
};



export const PasswordStrongIndicator = ({
  newPassword,
  strength,
}: PasswordStrongIndicatorProps) => {
  if (!newPassword) return null;

  const safeStrength = Math.max(0, Math.min(5, Math.floor(strength)));

  const color = safeStrength > 0
    ? STRENGTH_COLORS[safeStrength - 1]
    : '#252D38';

  return (
    <View className="gap-1.5 px-1">
      <View className="flex-row gap-1">
        {STRENGTH_COLORS.map((_, index) => (
          <Segment
            key={index}
            active={index < safeStrength}
            color={color}
          />
        ))}
      </View>

      <Text
        className="font-poppins-medium text-[10px]"
        style={{
          color,
        }}
      >
        {safeStrength === 0
          ? 'Enter your password'
          : STRENGTH_LABELS[safeStrength - 1]}
      </Text>
    </View>
  );
};
