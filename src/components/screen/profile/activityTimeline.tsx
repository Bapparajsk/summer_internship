import { FontAwesome6, MaterialIcons, Octicons } from '../lib/icon';
import { Text, View } from 'react-native';
import { SectionHeader } from '../header/sectionHeader';

export type ActivityType =
    | 'payment'
    | 'achievement'
    | 'course'
    | 'attendance'
    | 'exam'
    | 'assignment'
    | 'batch'
    | 'certificate'
    | 'placement'
    | 'community'
    | 'announcement';

export type Activity = {
    id: string;
    type: ActivityType;
    title: string;
    description: string;
    time: string;
};

type ActivityTimelineProps = {
    activities: Activity[];
};

const ACTIVITY_CONFIG: Record<
    ActivityType,
    {
        icon: keyof typeof MaterialIcons.glyphMap;
        color: string;
    }
> = {
    payment: {
        icon: 'payments',
        color: '#10B981',
    },
    achievement: {
        icon: 'emoji-events',
        color: '#FACC15',
    },
    course: {
        icon: 'menu-book',
        color: '#818CF8',
    },
    attendance: {
        icon: 'fact-check',
        color: '#F97316',
    },
    exam: {
        icon: 'quiz',
        color: '#EC4899',
    },
    assignment: {
        icon: 'assignment',
        color: '#06B6D4',
    },
    batch: {
        icon: 'groups',
        color: '#3B82F6',
    },
    certificate: {
        icon: 'workspace-premium',
        color: '#EAB308',
    },
    placement: {
        icon: 'work',
        color: '#14B8A6',
    },
    community: {
        icon: 'forum',
        color: '#8B5CF6',
    },
    announcement: {
        icon: 'campaign',
        color: '#EF4444',
    },
};

function ActivityItem({
    activity,
    isLast,
}: {
    activity: Activity;
    isLast: boolean;
}) {
    const config = ACTIVITY_CONFIG[activity.type];

    return (
        <View className="flex-row">
            {/* Timeline */}
            <View className="items-center mr-4">

                <View
                    className="h-10 w-10 items-center justify-center rounded-full border border-white/10"
                    style={{
                        backgroundColor: `${config.color}20`,
                    }}
                >
                    <MaterialIcons
                        name={config.icon}
                        size={18}
                        color={config.color}
                    />
                </View>

                {!isLast && (
                    <View
                        className="w-0.5 flex-1 bg-white/10"
                        style={{
                            minHeight: 40,
                        }}
                    />
                )}

            </View>

            {/* Content */}
            <View className="flex-1 pb-6">

                <View className="flex-row items-start justify-between">
                    <Text style={{ color: config.color }} className="flex-1 font-poppins-semibold">
                        {activity.title}
                    </Text>

                    <Text className="ml-2 font-poppins-medium text-[10px] text-zinc-500">
                        {activity.time}
                    </Text>
                </View>

                <Text className="mt-1 font-poppins-light text-[11px] text-text-secondary">
                    {activity.description}
                </Text>

            </View>
        </View>
    );
}

const ActivityTimeline = ({
    activities,
}: ActivityTimelineProps) => {
    return (
        <View className="rounded-[34px] border border-border bg-white/4 p-5">
            {activities.map((activity, index) => (
                <ActivityItem
                    key={activity.id}
                    activity={activity}
                    isLast={index === activities.length - 1}
                />
            ))}

        </View>
    );
}

const tempData: Activity[] = [
    {
        id: '1',
        type: 'payment',
        title: 'Semester Fee Paid',
        description:
            'Semester 5 tuition fee payment successful.',
        time: '2h ago',
    },
    {
        id: '2',
        type: 'batch',
        title: 'New Batch Unlocked',
        description:
            'Advanced React Native batch is now available.',
        time: 'Yesterday',
    },
    {
        id: '3',
        type: 'achievement',
        title: 'Achievement Earned',
        description:
            'Completed a 30-day study streak.',
        time: '2 days ago',
    },
    {
        id: '4',
        type: 'exam',
        title: 'Exam Result Published',
        description:
            'Operating Systems result has been published.',
        time: '4 days ago',
    },
    {
        id: '5',
        type: 'certificate',
        title: 'Certificate Issued',
        description:
            'Web Development certificate is ready to download.',
        time: '1 week ago',
    },
]

export const ActivityTimelineSection = () => {
    return (
        <View className='gap-3'>
            <SectionHeader
                title="Recent Activity"
                startEndIcon={<Octicons name="history" size={16} color="#8FA5B8" />}
                rightText={`Updates (${5})`}
                rightIcon={<FontAwesome6 name="list-check" size={16} color="#5CC6E2" />}
            />
            <ActivityTimeline activities={tempData}/>
        </View>
    );
}