import { MaterialIcons } from '../lib/icon';
import { Image, Text, View } from 'react-native';
import { PressableFeedback, Toast, useToast } from 'heroui-native';

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
        <View className="overflow-hidden rounded-[30px] border border-border bg-white/4 p-5 mt-3">

            {/* Background Glow */}
            <View className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cyan-400/10" />

            {/* Header */}
            <View className="flex-row items-center">

                {/* University Logo */}
                <View className="h-16 w-16 items-center justify-center rounded-[28px] bg-white p-2">
                    <Image
                        source={require('../../../assets/college-logo.svg')}
                        className="h-full w-full rounded-[28px]"
                        resizeMode="cover"
                    />
                </View>

                {/* University Details */}
                <View className="ml-4 flex-1">
                    <Text
                        numberOfLines={1}
                        className="text-lg text-text-primary font-poppins-semibold"
                    >
                        {universityName}
                    </Text>

                    <Text className="mt-1 text-text-secondary text-xs font-poppins-medium">
                        {campus}
                    </Text>
                </View>

            </View>

            <PressableFeedback
                onPress={openUniversityWebsite}
                className="absolute top-3 right-3 flex-row items-center rounded-full bg-cyan-500/10 px-3 py-2"
            >
                <MaterialIcons
                    name="language"
                    size={14}
                    color="#22D3EE"
                />

                <Text className="ml-1 text-xs text-cyan-400">
                    Official
                </Text>
            </PressableFeedback>

            {/* Info Grid */}
            <View className="mt-5 flex-row gap-3">
                <InfoCard
                    iconColor='#22D3EE'
                    iconName='school'
                    title='Department'
                    value={department}
                />

                <InfoCard
                    iconColor='#A78BFA'
                    iconName='person'
                    title='Principal'
                    value={advisor}
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
        <View className="flex-1 rounded-2xl bg-white/4 p-3">
            <View className="flex-row items-center">
                <MaterialIcons
                    name={iconName as any}
                    size={16}
                    color={iconColor}
                />

                <Text className="ml-2 text-xs uppercase text-text-secondary font-poppins-semibold">
                    {title}
                </Text>
            </View>

            <Text
                numberOfLines={1}
                className="mt-2 text-xs text-text-primary font-poppins-medium"
            >
                {value}
            </Text>
        </View>
    );
}