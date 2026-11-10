import React, {
    Fragment,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';

import { cn, SearchField, Select, Separator } from 'heroui-native';

import { Feather } from '@expo/vector-icons';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { View, Text, TextInput } from 'react-native';
import { SelectOption } from './roles';


export const BottomContent = ({data} : { data: SelectOption[] }) => {

    const inputRef = useRef<TextInput>(null);
    const sheetRef = useRef<BottomSheet>(null);

    const [search, setSearch] = useState('');

    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) return data;

        return data.filter(item =>
            item.label.toLowerCase().includes(query) ||
            item.value.toLowerCase().includes(query)
        );
    }, [search, data]);


    const renderItem = useCallback(
        ({ item, index }: { item: SelectOption; index: number }) => (
            <Fragment>
                <Select.Item
                    value={item.value}
                    label={item.label}
                >
                    {({ isSelected }) => (
                        <>
                            <Select.ItemLabel
                                className={cn(
                                    "font-poppins-medium text-xs text-text-secondary",
                                    {"text-primary" : isSelected}
                                )}
                            />
                            <Select.ItemIndicator iconProps={{ color: "#5cc6e2" }}/>
                        </>
                    )}
                </Select.Item>
                {index < filteredRoles.length - 1 && <Separator />}
            </Fragment>
        ),
        [filteredRoles.length]
    );

    const keyExtractor = useCallback(
        (item: SelectOption) => item.value,
        []
    );

    return (
        <Select.Content
            presentation="bottom-sheet"
            snapPoints={['50%', '90%']}
            enableOverDrag={false}
            enableDynamicSizing={false}
            contentContainerClassName="h-full"
            ref={sheetRef}

            onClose={() => inputRef.current?.blur()}
        >
            <View className="pb-3">
                <Select.ListLabel className="mb-3">
                    <Text className='text-sm font-poppins-semibold text-text-secondary'>
                        Choose an engineering role.
                    </Text>
                </Select.ListLabel>

                <SearchField value={search} onChange={setSearch}>
                    <SearchField.Group>
                        <SearchField.SearchIcon>
                            <Text className="text-base">🔍</Text>
                        </SearchField.SearchIcon>
                        <SearchField.Input
                            ref={inputRef}
                            placeholder="Search engineering roles..."
                            placeholderTextColor="#718096"
                            className="flex-1 pl-10 font-poppins-medium text-xs text-text-primary border border-border rounded-full focus:border-primary"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onFocus={() => sheetRef.current?.snapToIndex(1)}
                        />
                        <SearchField.ClearButton />
                    </SearchField.Group>
                </SearchField>
            </View>

            <BottomSheetFlatList
                data={filteredRoles}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                keyboardShouldPersistTaps="handled"
                initialNumToRender={12}
                maxToRenderPerBatch={10}
                windowSize={5}
                contentContainerClassName={"pr-2"}
                ListEmptyComponent={
                    <View className="items-center justify-center py-12">
                        <Feather
                            name="search"
                            size={28}
                            color="#718096"
                        />
                        <Text className="mt-3 font-poppins-medium text-sm text-white">
                            No roles found
                        </Text>
                        <Text className="mt-1 font-poppins-medium text-xs text-secondary">
                            Try another search term.
                        </Text>
                    </View>
                }
            />
        </Select.Content>
    );
}