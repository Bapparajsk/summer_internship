import { SimpleHeader } from '@/components/header/simpleHeader';
import { useRouter } from 'expo-router';

export const Header = () => {

    const router = useRouter();

    return (
        <SimpleHeader
            icon={{
                name: "chevron-left",
                size: 20,
            }}
            title='Profile'
            onPress={router.back}
        />
    );
}