import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View } from 'react-native';


SplashScreen.preventAutoHideAsync();


export default function FontProvider({ children }: { children: React.ReactNode }) {
    const [loaded, error] = useFonts({
        'PoppinsLight': require('../../assets/fonts/Poppins-Light.ttf'),
        'PoppinsMedium': require('../../assets/fonts/Poppins-Medium.ttf'),
        'PoppinsSemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    });

    useEffect(() => {
        if (loaded || error) {
            SplashScreen.hideAsync();
        }
    }, [loaded, error]);

    if (!loaded && !error) {
        return null;
    }

    return (
        <View style={{flex: 1}}>
            {children}
        </View>
    );
}