import { View, Text } from 'react-native'
import React, { Fragment, useMemo, useState } from 'react'
import { BottomSheet, PressableFeedback, Separator } from 'heroui-native'
import { CATEGORIES } from './data';

const allSubjects = [...new Set(CATEGORIES.flatMap(item => item.subjects))];

export const SubjectList = ({ category }: { category: string }) => {

    const [isSelectedSubject, setIsSelectedSubject] = useState<string | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);

    const subjects = useMemo(() => {
        return [...new Set(
            CATEGORIES.filter(item => item.id === category).flatMap(item => item.subjects)
        )];
    }, [category]);

    return (
        <Fragment>
            <View className="gap-2">
                <View className="flex-row items-center justify-between">
                    <Text className="text-[10px] font-poppins-semibold tracking-widest text-text-tertiary">
                        SUBJECT / TRACK
                    </Text>
                    <PressableFeedback
                        onPress={() => setIsOpen(true)}
                    >
                        <Text className='text-primary text-xs font-poppins-medium'>
                            See All
                        </Text>
                    </PressableFeedback>
                </View>

                <View className="flex-row flex-wrap gap-2">
                    {subjects.slice(0, 4).map((sub => (
                        <SubjectChip
                            key={`create-room-subject-key-${sub}`}
                            label={sub}
                            selected={isSelectedSubject === sub}
                            onPress={() => {
                                setIsSelectedSubject(sub)
                            }}
                        />
                    )))}
                </View>
            </View>

            <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
                <BottomSheet.Portal>
                    <BottomSheet.Overlay className='bg-black/60' />
                    <BottomSheet.Content
                        snapPoints={["70%"]}
                    >
                        <BottomSheet.Title className="text-sm font-poppins-semibold tracking-widest text-text-primary">
                            SUBJECT / TRACK
                        </BottomSheet.Title>
                        <Separator className='my-3' />
                        <View className="flex-row flex-wrap gap-2">
                            {allSubjects.map((sub => (
                                <SubjectChip
                                    key={`create-room-bottoms-sheet-subject-key-${sub}`}
                                    label={sub}
                                    selected={isSelectedSubject === sub}
                                    onPress={() => {
                                        setIsSelectedSubject(sub)
                                    }}
                                />
                            )))}
                        </View>
                    </BottomSheet.Content>
                </BottomSheet.Portal>
            </BottomSheet>
        </Fragment>
    )
}


const SubjectChip = ({
    label,
    selected,
    onPress,
}: {
    label: string;
    selected: boolean;
    onPress: () => void;
}) => (
    <PressableFeedback
        onPress={onPress}
        className={`rounded-lg border px-3 py-2 ${selected
            ? 'border-primary bg-primary'
            : 'border-border bg-surface-container-high'
            }`}
    >
        <Text
            className={`text-[11px] font-poppins-medium ${selected ? 'text-background' : 'text-text-primary'
                }`}
        >
            {label}
        </Text>
    </PressableFeedback>
);