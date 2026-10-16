import { View } from 'react-native';
import { ReactNode } from "react";

export const Container = ({children} : { children: ReactNode }) => {
    return (
        <View className='flex-1 bg-[rgb(222,222,222)] rounded-t-2xl'>
            {children}
        </View>
    )
}