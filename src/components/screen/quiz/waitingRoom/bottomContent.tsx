import { NativeBottomContainer } from '@/components/ui/nativeBottomContainer'
import { BOTTOM_CONTAINER_Z_INDEX } from '../../screenWrapper'
import { View } from 'react-native'
import { Button } from '@/components/ui/button'

export const BottomContent = () => {
    return (
        <NativeBottomContainer zIndex={BOTTOM_CONTAINER_Z_INDEX}>
            <View className='flex-row gap-x-2 w-full px-8'>
                <View className='w-1/3'>
                    <Button
                        title='QUIT'
                        fullWidth
                        variant='danger'
                        leftIcon='arrow-back-circle-outline'
                        textStyle={{ marginLeft: 5 }}
                    />
                </View>
                <View className='w-2/3'>
                    <Button
                        title="I'm Ready"
                        fullWidth
                        variant='primary'
                    />
                </View>
            </View>
        </NativeBottomContainer>
    )
}