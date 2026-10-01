import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { QuizList } from './quizList'
import { SelectOption, SelectPopover } from '@/components/select';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Dialog, Button, cn } from 'heroui-native';

const className = "px-2 py-0.5"

const options: SelectOption[] = [
    { id: "new", label: "New", iconName: "new-card", classNames: { container: className } },
    { id: "continue", label: "Continue", iconName: "play-circle-outline", classNames: { container: className } },
    { id: "join", label: "Join", iconName: "sensors", classNames: { container: className } },
    // tag names
    {
        id: "tags", label: "Tags", iconName: "hash", classNames: {
            container: cn(className, "bg-primary-soft px-3 py-1.5"),
            label: "text-primary",
            startIconColor: "#22D3EE",
        }
    },
];

export const QuizContainer = () => {

    const [activeItemIds, setActiveItemIds] = React.useState<SelectOption["id"][]>([]);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View className='gap-3'>
            <View className='flex-row justify-between'>
                <View className='justify-center'>
                    <Text className='font-poppins-semibold text-2xl text-text-primary'>
                        Quizzes for you
                    </Text>
                    <Text className='font-poppins-medium text-xs text-text-tertiary'>
                        Pick a challenge and start learning.
                    </Text>
                </View>
                <View>
                    <SelectPopover
                        items={options}
                        separators={[3]}
                        activeItemIds={activeItemIds}
                        onCloseTriggerId={["tags"]}
                        onSelect={(item) => {
                            if (item.id === "tags") {
                                setIsOpen(true);
                                return;
                            }

                            setActiveItemIds(prev => {
                                if (prev.includes(item.id)) {
                                    return prev.filter(id => id !== item.id);
                                } else {
                                    return [...prev, item.id];
                                }
                            });
                        }}
                        activeContent={
                            <View className="flex-row items-center gap-0.5">
                                <MaterialCommunityIcons
                                    name="filter-outline"
                                    size={18}
                                    color="#9CA3AF"
                                />
                                <Text className="font-poppins-medium text-sm text-text-secondary">
                                    Filter
                                </Text>
                            </View>
                        }
                        triggerClassName="px-3 py-2"
                        itemStyle={{ labelClassName: "text-sm" }}
                        iconSize={14}
                    />
                </View>
            </View>
            <QuizList />
            <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
                <Dialog.Portal>
                    <Dialog.Overlay className='bg-black/50'/>
                    <Dialog.Content>
                        <Dialog.Close variant="ghost" />
                        <View className="mb-5 gap-1.5">
                            <Dialog.Title>Confirm Action</Dialog.Title>
                            <Dialog.Description>
                                Are you sure you want to proceed with this action? This cannot be
                                undone.
                            </Dialog.Description>
                        </View>
                        <View className="flex-row justify-end gap-3">
                            <Button variant="ghost" size="sm" onPress={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button size="sm">Confirm</Button>
                        </View>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </View>
    )
}