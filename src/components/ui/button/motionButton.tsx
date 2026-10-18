import { cn, PressableFeedback, PressableFeedbackProps } from 'heroui-native'
import { MotionButtonProps } from './type'


export const MotionButton = ({ children, className, ...rest } : MotionButtonProps & PressableFeedbackProps ) => {
    return (
        <PressableFeedback
            className={cn("size-13 items-center justify-center rounded-full bg-white/10 border-border border", className)}
            accessibilityRole="button"
            {...rest}
        >
            {children}
        </PressableFeedback>
    )
}