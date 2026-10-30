
import { memo } from 'react';
import { Text, View } from 'react-native';
import { PressableFeedback, cn } from 'heroui-native';

export type QuizStatus =
    | 'correct'
    | 'incorrect'
    | 'unanswered';

type QuizOptionProps = {
    letter: string;
    text: string;
    status?: QuizStatus;
    onPress?: () => void;
    disabled?: boolean;
};

const statusConfig = {
    correct: {
        container: 'border-primary/60 bg-primary/10',
        letter: 'bg-primary',
        letterText: 'text-background',
        text: 'text-primary',
        indicator: 'bg-primary',
        symbol: '✓',
    },
    incorrect: {
        container: 'border-danger/60 bg-danger/10',
        letter: 'bg-danger',
        letterText: 'text-white',
        text: 'text-danger',
        indicator: 'bg-danger',
        symbol: '✗',
    },
    unanswered: {
        container: 'border-border-subtle bg-white/4',
        letter: 'bg-surface-container-high',
        letterText: 'text-text-secondary',
        text: 'text-text-primary',
        indicator: 'border-2 border-white/10',
        symbol: '',
    },
};

export const QuizOption = memo(({
    letter,
    text,
    status = 'unanswered',
    onPress,
    disabled = false,
}: QuizOptionProps) => {

    const isUnanswered = status === 'unanswered';

    const isDisabled = disabled || !isUnanswered;



    const config = statusConfig[status];

    return (
        <View className='overflow-hidden relative rounded-xl'>
            <PressableFeedback
                onPress={onPress}
                isDisabled={isDisabled}
                animation={isDisabled ? 'disable-all' : undefined}
                className={cn(
                    'my-1.5 min-h-17 flex-row items-center rounded-xl border px-3.5 py-3 z-0',
                    config.container,
                    !isDisabled && 'active:opacity-30'
                )}
            >
                {/* Option Letter */}
                <View
                    className={cn(
                        'h-9 w-9 items-center justify-center rounded-lg',
                        config.letter
                    )}
                >
                    <Text
                        className={cn(
                            'font-poppins-semibold text-sm',
                            config.letterText
                        )}
                    >
                        {letter}
                    </Text>
                </View>

                {/* Option Text */}
                <View className="ml-3 flex-1 justify-center pr-2">
                    <Text
                        className={cn(
                            'font-poppins-medium text-sm leading-6 line-through',
                            config.text,
                            "text-text-disabled"
                        )}
                    >
                        {text}
                    </Text>
                </View>

                {/* Status Indicator */}
                {isUnanswered ? (
                    <View
                        className={cn(
                            'h-5 w-5 shrink-0 rounded-full',
                            config.indicator
                        )}
                    />
                ) : (
                    <View
                        className={cn(
                            'h-6 w-6 shrink-0 items-center justify-center rounded-full',
                            config.indicator
                        )}
                    >
                        <Text className="font-poppins-semibold text-sm text-background">
                            {config.symbol}
                        </Text>
                    </View>
                )}

                {isDisabled && (
                    <PressableFeedback.Ripple
                        animation={{
                            backgroundColor: { value: '#8FA5B8' },
                            opacity: { value: [0, 0.1, 0] },
                            progress: { baseDuration: 450 },
                        }}
                    />
                )}
            </PressableFeedback>
        </View>
    );
});

QuizOption.displayName = 'QuizOption';
