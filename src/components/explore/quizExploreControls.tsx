import { Fragment, useEffect, useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { BottomSheet, Button, PressableFeedback, SearchField, Tabs } from "heroui-native";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import debounce from "lodash.debounce";
import { Octicons } from "@expo/vector-icons";

const filters = [
    { id: "all", label: "All" },
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
    { id: "trending", label: "Trending", icon: "trending" },
    { id: "new", label: "New", icon: "new" },
    { id: "popular", label: "Popular", icon: "popular" },
    { id: "random", label: "Random", icon: "random" },
    { id: "favorites", label: "Favorites", icon: "favorites" },
] as const;

type Filter = (typeof filters)[number];

type FilterId = (typeof filters)[number]["id"];


function SearchBarButton() {

    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<Filter[]>([...filters]);

    const inputRef = useRef<TextInput | null>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 1000);
        } else if (!isOpen && inputRef.current) {
            inputRef.current?.blur();
        }
    }, [isOpen]);

    const onChangeTextDebounced = (text: string) => {
        setData(() => {
            if (text === "") {
                return [...filters];
            }
            return filters.filter((filter): filter is Filter => {
                return typeof filter.label === "string" && filter.label.toLowerCase().includes(text.toLowerCase());
            });
        });
    };

    // Debounce the onChangeText function
    const debouncedChangeText = debounce(onChangeTextDebounced, 300);

    return (
        <Fragment>

            <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
                <BottomSheet.Trigger asChild>
                    <PressableFeedback className="h-14 w-full rounded-full bg-white/4 border border-border">
                        <View className="flex-row items-center justify-items-start gap-2.5 h-full px-4">
                            <Octicons name="search" size={18} color="#8FA5B8" />
                            <Text className="font-poppins-medium text-text-secondary text-sm">
                                Search quizzes...
                            </Text>
                        </View>
                    </PressableFeedback>
                </BottomSheet.Trigger>
                <BottomSheet.Portal >
                    <BottomSheet.Overlay className="bg-black/70" />
                    <BottomSheet.Content
                        snapPoints={["90%"]}
                        enableDynamicSizing={false}
                        enableOverDrag={false}
                        contentContainerClassName="h-full"
                    >
                        <SearchField onChange={debouncedChangeText}>
                            <SearchField.Group>
                                <SearchField.SearchIcon />
                                <SearchField.Input
                                    ref={inputRef}
                                    className="font-poppins-medium bg-white/4 border border-border rounded-[34px]"
                                    placeholder="Search quizzes..."
                                />
                                <SearchField.ClearButton />
                            </SearchField.Group>
                        </SearchField>
                        <BottomSheetFlatList

                            data={data}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <View className="p-4 h-40 border-b border-border">
                                    <Button
                                        variant="ghost"
                                        onPress={() => {
                                            setIsOpen(false);
                                        }}
                                    >

                                        {item.label}
                                    </Button>
                                </View>
                            )}
                        />
                    </BottomSheet.Content>
                </BottomSheet.Portal>
            </BottomSheet>
        </Fragment>
    );
}


function FilterCarousel() {

    const [activeTab, setActiveTab] = useState('all');

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <Tabs.List className="bg-white/4 border border-border h-10">
                <Tabs.ScrollView>
                    <Tabs.Indicator />
                    {filters.map((filter) => {
                        const active = activeTab === filter.id;

                        return (
                            <Tabs.Trigger
                                key={filter.id}
                                value={filter.id}

                            >
                                <Tabs.Label
                                    className={`font-poppins-medium text-xs ${active
                                        ? "text-primary"
                                        : "text-text-secondary"
                                        }`}
                                >
                                    {filter.label}
                                </Tabs.Label>
                            </Tabs.Trigger>
                        );
                    })}
                </Tabs.ScrollView>
            </Tabs.List>
        </Tabs>
    );
}

export const QuizExploreControls = () => {

    return (
        <View className="gap-2.5">
            <SearchBarButton />

            <FilterCarousel
            />
        </View>
    );
}