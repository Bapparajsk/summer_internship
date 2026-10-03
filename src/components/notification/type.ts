import { Bell, CheckCircle2, Flame, Trophy, Users, Zap } from "lucide-react-native";

export type NotificationType = "live" | "result" | "streak" | "invitation" | "quiz" | "reminder";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  time: string;
  read: boolean;

  // Optional metadata
  action?: string;
  room?: string;
  score?: number;
  rank?: number;
  accuracy?: number;
  multiplier?: string;
  invitedBy?: string;
  questions?: number;
  playersWaiting?: number;
}

export const notificationIcons = {
  live: Zap,
  result: Trophy,
  streak: Flame,
  invitation: Users,
  quiz: CheckCircle2,
  reminder: Bell,
};
