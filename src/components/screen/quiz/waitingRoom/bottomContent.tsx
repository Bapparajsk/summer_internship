import { NativeBottomContainer } from '@/components/ui/nativeBottomContainer'
import { BOTTOM_CONTAINER_Z_INDEX } from '../../screenWrapper'
import { View } from 'react-native'
import { Button } from '@/components/ui/button'

export const BottomContent = () => {
    return (
        <NativeBottomContainer zIndex={BOTTOM_CONTAINER_Z_INDEX} bottomOffset={0}>
            <View className='flex-row w-full px-3'>
                <Button
                    title="Ready Now"
                    fullWidth
                    variant='outline'
                    theme='dark'
                />
            </View>
        </NativeBottomContainer>
    )
}