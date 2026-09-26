import { cn } from 'heroui-native';
import { useEffect } from 'react';
import { View, Text, TextProps } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
} from 'react-native-reanimated';

interface TickProps extends TextProps {
    fontSize: number;
}

const _font_width = 0.58;
const _font_height = 1.1;

function Tick({ fontSize, style, className, ...rest }: TickProps) {
    return (
        <Text
            {...rest}
            style={[
                {
                    width: fontSize * _font_width,
                    height: fontSize * _font_height,
                    lineHeight: fontSize * _font_height,

                    fontSize,

                    fontVariant: ['tabular-nums'],

                    textAlign: 'center',
                    includeFontPadding: false,
                },
                style,
            ]}

            className={cn("text-white font-poppins-medium", className)}
        />
    );
}

interface TickerListProps {
    number: number;
    fontSize: number;
    index: number;
    className?: string;
}

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const symbols = [".", ",", "'"];

function TickerList({
    number,
    fontSize,
    index,
    className
}: TickerListProps) {
    const translateY = useSharedValue(0);


    const itemHeight = fontSize * _font_height;
    const digitWidth = fontSize * _font_width;

    useEffect(() => {
        translateY.value = withDelay(
            index * 50,
            withSpring(-itemHeight * number, {
                damping: 80,
                stiffness: 200,
            }),
        );
    }, [number, itemHeight, index]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: translateY.value,
            },
        ],
    }));

    return (
        <View
            style={{
                width: digitWidth,
                height: itemHeight,
                overflow: 'hidden',
            }}
        >
            <Animated.View style={animatedStyle}>
                {numbers.map((num) => (
                    <Tick
                        key={num}
                        fontSize={fontSize}
                        className={className}
                    >
                        {num}
                    </Tick>
                ))}
            </Animated.View>
        </View>
    );
}
// --------------------------------------------------
// Ticker
// --------------------------------------------------

interface TickerProps {
    value: string;
    fontSize?: number;
    className?: string;
}

export function Ticker({
    value,
    fontSize = 50,
    className,
}: TickerProps) {

    const characters = value.split('');

    return (
        <View className="flex-row items-center">
            {characters.map((char, index) => {
                const digit = Number(char);

                if (Number.isInteger(digit)) {
                    return (
                        <TickerList
                            key={index}
                            number={digit}
                            fontSize={fontSize}
                            index={index}
                            className={className}
                        />
                    );
                }

                return (
                    <Tick
                        key={index}
                        fontSize={fontSize}
                        style={{
                            width: symbols.includes(char) ? fontSize * 0.25 : fontSize * .65,
                        }}
                        className={className}
                    >
                        {char}
                    </Tick>
                );
            })}
        </View>
    );
}
