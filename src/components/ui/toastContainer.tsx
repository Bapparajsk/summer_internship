import { View } from 'react-native'
import { Toast, ToastComponentProps, ToastVariant } from 'heroui-native';
import { getCommonIcon, IconName } from '../lib/icon';

export type ToastProps = {
    icon: IconName | { 
        name: IconName;
        size?: number;
        color?: string;
    };
    variant?: ToastVariant | undefined;
    label: string | undefined;
    description?: string | undefined;
    isError?: boolean
}


export const ToastContainer: (props: ToastComponentProps & ToastProps) => React.ReactElement = ({ icon, label, description, variant, isError, ...props }) => {
    
    const isIconObj = typeof icon === "string";

    const { Icon, name } = getCommonIcon(isIconObj ? icon : icon.name);

    const size = isIconObj ? 12 : icon.size ?? 10;
    const color = isIconObj ? "#ffffffA0" : icon.color ?? "#ffffffA0";
    
    return (
        <Toast variant={variant} {...props}>
            <View className='flex-row items-center gap-x-1'>
                <Icon name={name} size={size} color={isError? "#F87171" : color}/>
                <Toast.Title className='font-poppins-medium text-sm text-zinc-500'>
                    {label}
                </Toast.Title>
            </View>

            <Toast.Description className='font-poppins-medium text-xs text-zinc-600'>
                {description}
            </Toast.Description>
        </Toast>
    )
};