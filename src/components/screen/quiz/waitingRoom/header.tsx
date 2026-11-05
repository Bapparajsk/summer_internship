import { SettingButton } from './settingButton'
import { useRouter } from "expo-router"; 
import { SimpleHeader } from '@/components/header/simpleHeader';

export const Header = () => {

    const router = useRouter();

    return (
        <SimpleHeader
            icon={{
                name: "arrow-back-circle-outline",
                size: 20,
                color: "#f87171"
            }}
            title='EXIT'
            titleClassName='text-danger'
            
            rightContent={<SettingButton />}

            onPress={() => {
                router.dismissTo("/(tab)/explore")
            }}
        />
    )
}