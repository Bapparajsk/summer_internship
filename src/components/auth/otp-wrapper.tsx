
import {
    BottomSheet,
    type BottomSheetRef,
    Description,
    InputOTP,
    type InputOTPRef,
    Label,
} from "heroui-native";

import {
    ReactNode,
    RefObject,
    useRef,
} from "react";

import { Text, View } from "react-native";

import { SimpleHeader } from "../header/simpleHeader";

export type OtpWrapperProps = {
    children: ReactNode;

    title?: string;
    email: string;

    isInvalid?: boolean;
    isLoading?: boolean;

    resendOtpComponent: ReactNode;

    backTitle: string;
    sheetRef: RefObject<BottomSheetRef | null>;

    onSubmitOtp: (otp: string) => void | Promise<void>;
};

const className = "border-2 border-border font-poppins-semibold";

const InputSlot = ({ index }: { index: number }) => (
    <InputOTP.Slot
        index={index}
        className={className}
    >
        <InputOTP.SlotPlaceholder />
        <InputOTP.SlotValue className="font-poppins-semibold" />
        <InputOTP.SlotCaret />
    </InputOTP.Slot>
);

export const OtpWrapper = ({
    children,
    sheetRef,
    backTitle,
    title,
    email,
    isInvalid = false,
    isLoading = false,
    resendOtpComponent,
    onSubmitOtp,
}: OtpWrapperProps) => {
    const ref = useRef<InputOTPRef>(null);

    const handleComplete = async (otp: string) => {
        if (isLoading || otp.length !== 6) return;

        ref.current?.blur();

        await onSubmitOtp(otp);
    };

    return (
        <View className="flex-1">
            {/* Signup Form */}
            <View className="gap-y-2">
                {children}
            </View>

            {/* OTP Bottom Sheet */}
            <BottomSheet
                ref={sheetRef}
                detents={[1]}
                grabber={false}
                dismissible={false}
            >
                <BottomSheet.Content>
                    <BottomSheet.Header>
                        <SimpleHeader
                            icon={{
                                name: "chevron-left",
                                size: 20,
                            }}
                            title={backTitle}
                            onPress={() => {
                                if (!isLoading) {
                                    sheetRef.current?.dismiss();
                                }
                            }}
                            motionButtonProps={{
                                className: "pl-1",
                            }}
                        />
                    </BottomSheet.Header>

                    <BottomSheet.Body>
                        <View className="mt-10">
                            <Label>
                                <Text className="text-sm font-poppins-semibold text-text-primary">
                                    {title ?? "Verify account"}
                                </Text>
                            </Label>

                            <Description className="mb-3 text-xs font-poppins-semibold text-text-secondary">
                                We&apos;ve sent a code to {email}
                            </Description>

                            {/* OTP Input */}
                            <InputOTP
                                ref={ref}
                                maxLength={6}
                                isInvalid={isInvalid}
                                isDisabled={isLoading}
                                onComplete={handleComplete}
                            >
                                <InputOTP.Group>
                                    <InputSlot index={0} />
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

                            {/* Invalid OTP */}
                            {isInvalid && (
                                <Text className="mt-2 text-xs font-poppins-medium text-danger">
                                    Invalid verification code. Please try again.
                                </Text>
                            )}

                            {/* Resend */}
                            <View className="flex-row mt-4 gap-2 items-center">
                                <Text className="text-xs font-poppins-medium text-text-secondary">
                                    Didn&apos;t receive a code?
                                </Text>

                                {resendOtpComponent}
                            </View>

                            {/* Loading feedback */}
                            {isLoading && (
                                <Text className="mt-4 text-xs font-poppins-medium text-text-secondary text-center">
                                    Verifying your code...
                                </Text>
                            )}
                        </View>
                    </BottomSheet.Body>
                </BottomSheet.Content>
            </BottomSheet>
        </View>
    );
};
