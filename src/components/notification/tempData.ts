import { NotificationItem } from "./type";

export const notifications: NotificationItem[] = [
  {
    id: "1",
    type: "live",
    title: "Your quiz is starting",
    description: "Data Structures Challenge starts in 5 minutes.",
    time: "2 min ago",
    read: false,
    action: "Join now",
    room: "#DSA-404",
  },

  {
    id: "2",
    type: "result",
    title: "Quiz result is ready",
    description: "You scored 90% in Data Structures Challenge.",
    time: "18 min ago",
    read: false,
    score: 90,
    rank: 4,
  },

  {
    id: "3",
    type: "streak",
    title: "7 day streak!",
    description: "You've completed quizzes for 7 days in a row.",
    time: "1 hr ago",
    read: false,
    multiplier: "x1.5",
  },

  {
    id: "4",
    type: "invitation",
    title: "Quiz invitation",
    description: "Arjun invited you to Campus DSA Challenge.",
    time: "3 hrs ago",
    read: true,
    invitedBy: "Arjun",
    questions: 20,
    playersWaiting: 12,
  },

  {
    id: "5",
    type: "result",
    title: "Result available",
    description: "Algorithms Challenge has been evaluated.",
    time: "Yesterday",
    read: true,
    accuracy: 85,
  },

  {
    id: "6",
    type: "quiz",
    title: "New quiz available",
    description: "C++ Advanced Challenge is now available.",
    time: "Yesterday",
    read: true,
  },

  {
    id: "7",
    type: "reminder",
    title: "Daily quiz reminder",
    description: "Keep your learning streak going with today's quiz.",
    time: "Yesterday",
    read: true,
  },
];
