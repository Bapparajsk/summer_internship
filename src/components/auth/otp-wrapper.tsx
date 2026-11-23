import { BottomSheet, BottomSheetRef, Description, InputOTP, InputOTPRef, Label, PressableFeedback } from 'heroui-native';
import { ReactNode, RefObject, useRef } from 'react'
import { Text, View } from 'react-native'
import { SimpleHeader } from '../header/simpleHeader';



export type OtpWrapperProps = {
    children: ReactNode;

    title?: string;
    email: string;
    isInvalid?: boolean | undefined

    backTitle: string;
    sheetRef: RefObject<BottomSheetRef | null>;
    onSubmitOtp: (otp: string) => void;
}

const className = 'border-2 border-border font-poppins-semibold';

const InputSlot = ({ index }: { index: number }) => (
    <InputOTP.Slot index={index} className={className} >
        <InputOTP.SlotPlaceholder />
        <InputOTP.SlotValue className='font-poppins-semibold'/>
        <InputOTP.SlotCaret />
    </InputOTP.Slot>
)

export const OtpWrapper = ({ children, sheetRef, backTitle, title, email, isInvalid, onSubmitOtp }: OtpWrapperProps) => {

    const ref = useRef<InputOTPRef>(null);

    return (
        <View className='flex-1'>
            <View className='gap-y-2'>
                {children}
            </View>
            <BottomSheet
                ref={sheetRef}
                detents={[1]}
                grabber={false}
                onDidFocus={() => {
                    console.log("open model")
                }}
            >
                <BottomSheet.Content>
                    <BottomSheet.Header>
                        <SimpleHeader
                            icon={{
                                name: "chevron-left",
                                size: 20
                            }}
                            title={backTitle}
                            onPress={() => {
                                sheetRef.current?.dismiss()
                            }}
                            motionButtonProps={{
                                className: "pl-1"
                            }}
                        />
                    </BottomSheet.Header>
                    <BottomSheet.Body >
                        <View className='mt-10'>
                            <View>
                                <Label>
                                    <Text className='text-sm font-poppins-semibold text-text-primary'>
                                        {title ?? "Verify account"}
                                    </Text>
                                </Label>
                                <Description className="mb-3 text-xs font-poppins-semibold text-text-secondary">
                                    We&apos;ve sent a code to {email}
                                </Description>
                                <InputOTP
                                    ref={ref}
                                    maxLength={6}
                                    isInvalid={isInvalid}
                                    onComplete={(otp) => {
                                        ref.current?.blur();
                                        onSubmitOtp(otp)
                                    }}>
                                    <InputOTP.Group>
                                        <InputSlot index={0}/>
                                        <InputSlot index={1} />
                                        <InputSlot index={2} />
                                    </InputOTP.Group>
                                    <InputOTP.Separator />
                                    <InputOTP.Group>
                                        <InputSlot index={3} />
                                        <InputSlot index={4} />
                                        <InputSlot index={5} />
                                    </InputOTP.Group>
                                </InputOTP>
                                <View className='flex-row mt-3 gap-2'>
                                    <Text className="mb-3 text-xs font-poppins-medium text-text-secondary">
                                        don&apos;t receive a OTP?
                                    </Text>
                                    <PressableFeedback>
                                        <Text className='text-xs font-poppins-semibold text-text-primary'>
                                            Resend OTP
                                        </Text>
                                    </PressableFeedback>
                                </View>
                            </View>
                        </View>
                    </BottomSheet.Body>
                </BottomSheet.Content>
            </BottomSheet>
        </View>
    )
}
