import { MaterialIcons } from '../../lib/icon';
import { Image, Linking, Text, View } from 'react-native';
import { PressableFeedback, Skeleton, Toast, useToast } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@/hooks/queries/use-user';
import { useRouter } from 'expo-router';

const cardClassName = "overflow-hidden rounded-[34px] border border-border bg-white/4 p-5";

export const UniversityInfoCard = () => {
    const { data: user, isLoading, isError } = useUser();
    const { toast } = useToast();
    const router = useRouter();
    const college = user?.college_information;

    const openUniversityWebsite = async () => {
        const website = college?.website?.trim();
        if (!website) return;

        const url = /^https?:\/\//i.test(website) ? website : `https://${website}`;

        try {
            await Linking.openURL(url);
        } catch {
            toast.show({
                component: (props) => (
                    <Toast variant="default" {...props}>
                        <View className="flex-row items-center gap-x-1">
                            <MaterialIcons name="error-outline" size={16} color="#F87171" />
                            <Toast.Title className="font-poppins-medium text-sm text-zinc-500">
                                Unable to Open Website
                            </Toast.Title>
                        </View>
                        <Toast.Description className="font-poppins-medium text-xs text-zinc-600">
                            The university website could not be opened. Please try again later.
                        </Toast.Description>
                    </Toast>
                ),
            });
        }
    };

    if (isLoading) {
        return (
            <View className={cardClassName}>
                <View className="flex-row items-center gap-2">
                    <Skeleton className="size-14 rounded-[24px]" />
                    <View className="flex-1 gap-1">
                        <Skeleton className="h-4 w-40 rounded-full" />
                        <Skeleton className="h-3 w-28 rounded-full" />
                    </View>
                </View>
                <View className="mt-3 gap-2">
                    <Skeleton className="h-14 w-full rounded-2xl" />
                    <Skeleton className="h-14 w-full rounded-2xl" />
                </View>
            </View>
        );
    }

    if (isError && !user) {
        return (
            <View className={`${cardClassName} min-h-36 items-center justify-center gap-2`}>
                <MaterialIcons name="error-outline" size={24} color="#F87171" />
                <Text className="text-center font-poppins-medium text-xs text-danger">
                    Could not load university information
                </Text>
            </View>
        );
    }

    if (!college) {
        return (
            <View className={`${cardClassName} min-h-36 items-center justify-center gap-2`}>
                <MaterialIcons name="school" size={24} color="#718096" />
                <Text className="text-center font-poppins-medium text-xs text-text-secondary">
                    University information is not available yet
                </Text>
                <PressableFeedback
                    accessibilityRole="button"
                    className="mt-1 flex-row items-center gap-1 rounded-full bg-primary-soft px-3 py-2"
                    onPress={() => router.push('/setting/edit_profile')}
                >
                    <MaterialIcons name="add" size={14} color="#5CC6E2" />
                    <Text className="font-poppins-semibold text-[10px] text-primary">
                        Add university details
                    </Text>
                </PressableFeedback>
            </View>
        );
    }

    const websiteAvailable = Boolean(college.website?.trim());
    const department = user?.academic_information?.department?.trim() || "Not provided";

    return (
        <View className={cardClassName}>

            {/* Background Glow */}
            <View className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10" />

            {/* Header */}
            <View className="flex-row items-center">

                {/* University Logo */}
                {college.logo_url ? (
                    <Image
                        source={{ uri: college.logo_url }}
                        className="size-14 rounded-[24px]"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="size-14 items-center justify-center rounded-[24px] border border-border bg-surface-container-high">
                        <MaterialIcons name="school" size={24} color="#22D3EE" />
                    </View>
                )}

                {/* University Details */}
                <View className="ml-2 flex-1">
                    <Text
                        numberOfLines={1}
                        className="text-base text-text-primary font-poppins-semibold"
                    >
                        {college.college_name}
                    </Text>

                    <Text className="text-text-secondary text-xs font-poppins-semibold">
                        {college.location}
                    </Text>
                </View>

            </View>

            {websiteAvailable ? (
                <PressableFeedback
                    accessibilityRole="button"
                    onPress={() => void openUniversityWebsite()}
                    className="absolute top-3 right-3 flex-row items-center rounded-full bg-cyan-500/10 px-2 py-1"
                >
                    <MaterialIcons name="language" size={14} color="#22D3EE" />
                    <Text className="ml-0.5 font-poppins-medium uppercase text-[10px] leading-normal text-cyan-400">
                        Official
                    </Text>
                </PressableFeedback>
            ) : null}

            {/* Info Grid */}
            <View className="mt-3 gap-2">
                <InfoCard
                    iconColor='#A78BFA'
                    iconName='person'
                    title='Principal'
                    value={college.principal_name?.trim() || "Not provided"}
                />

                <InfoCard
                    iconColor='#22D3EE'
                    iconName='school'
                    title='Department'
                    value={department}
                />
            </View>

            {isError ? (
                <View className="mt-3 flex-row items-center gap-1">
                    <MaterialIcons name="error-outline" size={13} color="#F87171" />
                    <Text className="font-poppins-medium text-[10px] text-danger">
                        Could not refresh university details. Showing saved information.
                    </Text>
                </View>
            ) : null}

        </View>
    );
}

function InfoCard({
    iconName,
    iconColor,
    title,
    value,
}: {
    iconName: keyof typeof MaterialIcons.glyphMap;
    iconColor: string;
    title: string;
    value: string;
}) {
    return (
        <View 
            className="relative flex-1 overflow-hidden rounded-2xl py-2 px-2 border"
            style={{ borderColor: iconColor+"56" }}
        >

            <LinearGradient
                colors={[iconColor, iconColor +"AA", "transparent"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-xl opacity-20"
            />

            <View className="flex-row items-center">
                <MaterialIcons
                    name={iconName}
                    size={16}
                    color={iconColor}
                />

                <Text className="ml-1 text-xs uppercase text-text-secondary font-poppins-semibold">
                    {title}
                </Text>
            </View>

            <Text
                numberOfLines={1}
                className="mt-0.5 text-[10px] text-text-primary font-poppins-medium"
            >
                {value}
            </Text>
        </View>
    );
}