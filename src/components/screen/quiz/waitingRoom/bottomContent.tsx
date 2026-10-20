import { NativeBottomContainer } from '@/components/ui/nativeBottomContainer'
import { BOTTOM_CONTAINER_Z_INDEX } from '../../screenWrapper'
import { View } from 'react-native'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export const BottomContent = () => {

    const [isReady, setIsReady] = useState(false);

    return (
        <NativeBottomContainer zIndex={BOTTOM_CONTAINER_Z_INDEX} bottomOffset={0}>
            <View className='flex-row w-full px-3'>
                <Button
                    title={isReady ? "I'm Ready" : "Ready Now"}
                    fullWidth
                    variant={isReady ? "primary" : 'outline'}
                    theme='dark'
                    onPress={() => setIsReady(prev => !prev)}
                />
            </View>
        </NativeBottomContainer>
    )
}