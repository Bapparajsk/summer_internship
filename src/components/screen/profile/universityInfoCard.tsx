import { MaterialIcons } from '../../lib/icon';
import { Image, Text, View } from 'react-native';
import { PressableFeedback, Toast, useToast } from 'heroui-native';
import { LinearGradient } from 'expo-linear-gradient';

type UniversityInfoCardProps = {
    universityName: string;
    campus: string;
    department: string;
    advisor: string;
    logo: string;
};


export const UniversityInfoCard = ({
    universityName,
    campus,
    department,
    advisor,
    logo,
}: UniversityInfoCardProps) => {

    const { toast } = useToast();

    const openUniversityWebsite = () => {
        toast.show({
            component: (props) => (
                <Toast variant="default" {...props} placement='bottom'>
                    <View className='flex-row items-center gap-x-1'>
                        <MaterialIcons
                            name="error-outline"
                            size={16}
                            color="#F87171"
                        />
                        <Toast.Title className='font-poppins-medium text-sm text-zinc-500'>
                            Unable to Open Website
                        </Toast.Title>
                    </View>

                    <Toast.Description className='font-poppins-medium text-xs text-zinc-600'>
                        The university website is currently unavailable. Please try again later.
                    </Toast.Description>
                </Toast>
            ),

        })
    };

    return (
        <View className="overflow-hidden rounded-[34px] border border-border bg-white/4 p-5">

            {/* Background Glow */}
            <View className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10" />

            {/* Header */}
            <View className="flex-row items-center">

                {/* University Logo */}
                <View className="size-14">
                    <Image
                        source={{ uri: "https://static.vecteezy.com/system/resources/previews/024/765/885/non_2x/education-badge-logo-design-university-high-school-emblem-logo-template-vector.jpg" }}
                        className="h-full w-full rounded-[24px]"
                        resizeMode="cover"
                    />
                </View>

                {/* University Details */}
                <View className="ml-2 flex-1">
                    <Text
                        numberOfLines={1}
                        className="text-base text-text-primary font-poppins-semibold"
                    >
                        {universityName}
                    </Text>

                    <Text className="text-text-secondary text-xs font-poppins-semibold">
                        {campus}
                    </Text>
                </View>

            </View>

            <PressableFeedback
                onPress={openUniversityWebsite}
                className="absolute top-3 right-3 flex-row items-center rounded-full bg-cyan-500/10 px-2 py-1"
            >
                <MaterialIcons
                    name="language"
                    size={14}
                    color="#22D3EE"
                />

                <Text className="ml-0.5 font-poppins-medium uppercase text-[10px] leading-normal text-cyan-400">
                    Official
                </Text>
            </PressableFeedback>

            {/* Info Grid */}
            <View className="mt-3 gap-2">
                <InfoCard
                    iconColor='#A78BFA'
                    iconName='person'
                    title='Principal'
                    value={advisor}
                />

                <InfoCard
                    iconColor='#22D3EE'
                    iconName='school'
                    title='Department'
                    value={department}
                />
            </View>

        </View>
    );
}

function InfoCard({
    iconName,
    iconColor,
    title,
    value,
}: {
    iconName: string;
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
                    name={iconName as any}
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