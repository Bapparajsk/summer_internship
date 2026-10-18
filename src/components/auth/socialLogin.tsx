import { View } from 'react-native'
import { Button } from '../ui/button/button'

export const SocialLogin = () => {
    return (
        <View className="flex-row items-center justify-center gap-4">
            <Button
                variant="outline"
                leftIcon="logo-google"
                theme="light"
                style={{ width: 70 }}
            />
            <Button
                variant="outline"
                leftIcon="logo-facebook"
                theme="light"
                style={{ width: 70 }}
            />
            <Button
                variant="outline"
                leftIcon="logo-apple"
                theme="light"
                style={{ width: 70 }}
            />
        </View>
    )
}