import { View, Text } from 'react-native'
import { Fragment, useState } from 'react'
import { cn, Dialog, PressableFeedback } from 'heroui-native'
import QRCode from "react-native-qrcode-svg";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export type RoomQRCodeProps = {
    roomCode: string;
    passkey: string;
    enabled: boolean
}

export const RoomQRCode = ({ passkey, roomCode, enabled }: RoomQRCodeProps) => {

    const [showQr, setShowQr] = useState(false);

    const payload = JSON.stringify({
        type: "quizflow_room",
        roomCode,
        passkey,
    });

    return (
        <Fragment>
            <PressableFeedback
                onPress={() => setShowQr(true)}
                isDisabled={!enabled}
                className={cn("flex-row items-center gap-3 p-3 overflow-hidden rounded-xl border", 
                    {
                        "border-primary/40 bg-black/30": enabled,
                        "border-border-subtle bg-surface-container-lowest opacity-50" : !enabled
                    }
                )}
            >
                <View className="h-9 w-9 items-center justify-center rounded-lg bg-surface-container-high">
                    <MaterialCommunityIcons name="qrcode" size={19} color="#5CC6E2" />
                </View>

                <View className="min-w-0 flex-1">
                    <Text className="font-poppins-medium text-sm text-text-primary">
                        Quick Join QR Code
                    </Text>
                    <Text className="mt-0.5 text-[10px] leading-normal font-poppins-medium text-text-secondary">
                        Scan to open the room invite
                    </Text>
                </View>
            </PressableFeedback>
            <Dialog
                isOpen={showQr}
                onOpenChange={setShowQr}
            >
                <Dialog.Portal>
                    <Dialog.Overlay className='bg-black/70' />
                    <Dialog.Content>
                        <Dialog.Close variant="ghost" />
                        <View className="items-center">
                            <View className="rounded-2xl bg-white p-3">
                                <QRCode
                                    value={payload}
                                    size={164}
                                    color="#0D1117"
                                    backgroundColor="#FFFFFF"
                                />
                            </View>

                            <Text className="mt-3 text-center font-poppins-medium text-sm text-text-primary">
                                Scan to join QuizFlow
                            </Text>
                            <Text className="mt-1 text-center text-[10px] font-poppins-semibold text-text-secondary">
                                Room Code : <Text className='text-text-primary'>{roomCode}</Text>
                            </Text>
                        </View>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </Fragment>
    )
}