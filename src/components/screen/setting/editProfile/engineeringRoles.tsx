import React, {
    Fragment,
    useCallback,
    useMemo,
    useState,
} from 'react';

import {  Select, Separator } from 'heroui-native';
import { ProfileInfoField } from './infoField';

import Animated, {
    Easing,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

import { Entypo, Octicons, Feather } from '@expo/vector-icons';
import { BottomSheetFlatList, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { ENGINEERING_ROLES, POPULAR_ROLE_IDS, ROLE_CATEGORIES, SelectOption } from './roles';


export default function Enrolment() {
    const [value, setValue] = useState<SelectOption | undefined>(undefined);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('ALL');

    const selectedRole = useMemo(
        () => ENGINEERING_ROLES.find(item => item.value === value?.value),
        [value]
    );

    // Filtering
    const filteredRoles = useMemo(() => {
        const query = search.trim().toLowerCase();

        return ENGINEERING_ROLES.filter(role => {
            const matchesSearch =
                !query ||
                role.label.toLowerCase().includes(query) ||
                role.value.toLowerCase().includes(query);

            const matchesCategory =
                category === 'ALL' || role.category === category;

            const matchesPopular =
                category === 'ALL' &&
                !query &&
                POPULAR_ROLE_IDS.includes(role.value);

            if (category === 'ALL' && !query) {
                return matchesPopular;
            }

            return matchesSearch && matchesCategory;
        });
    }, [search, category]);

    // Icon animation
    const iconStyle = useAnimatedStyle(() => ({
        transform: [
            {
                rotate: withTiming(isOpen ? '-90deg' : '90deg', {
                    duration: 180,
                    easing: Easing.out(Easing.cubic),
                }),
            },
        ],
    }));

    // Open / Close
    const handleOpenChange = useCallback((open: boolean) => {
        setIsOpen(open);

        if (!open) {
            setSearch('');
            setCategory('ALL');
        }
    }, []);

    // Render role
    const renderItem = useCallback(
        ({ item, index }: { item: SelectOption; index: number }) => (
            <Fragment>
                <Select.Item
                    value={item.value}
                    label={item.label}
                />

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
        <>
            {/* Profile Field */}

            <ProfileInfoField
                onPress={() => setIsOpen(true)}
                label="Engineering Role"
                value={selectedRole?.label}
                icon={
                    <Octicons
                        name="briefcase"
                        size={16}
                        color="#8FA5B8"
                    />
                }
                endIcon={
                    <Animated.View style={iconStyle}>
                        <Entypo
                            name="chevron-right"
                            size={18}
                            color="#ffffff90"
                        />
                    </Animated.View>
                }
            />

            {/* Select Bottom Sheet */}

            <Select
                isOpen={isOpen}
                onOpenChange={handleOpenChange}
                value={value}
                onValueChange={(item) => setValue(item as SelectOption)}
                presentation="bottom-sheet"
            >
                <Select.Portal>
                    <Select.Overlay />

                    <Select.Content
                        presentation="bottom-sheet"
                        snapPoints={['40%', '80%']}
                        enableOverDrag={false}
                        enableDynamicSizing={false}
                        contentContainerClassName="h-full"
                    >
                        {/* Header */}

                        <View className="px-4 pb-3">
                            <Select.ListLabel className="mb-3">
                                Choose an engineering role
                            </Select.ListLabel>

                            {/* Search */}

                            <View className="h-12 flex-row items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3">
                                <Feather
                                    name="search"
                                    size={17}
                                    color="#8FA5B8"
                                />

                                <BottomSheetTextInput
                                    value={search}
                                    onChangeText={setSearch}
                                    placeholder="Search engineering roles..."
                                    placeholderTextColor="#718096"
                                    className="flex-1 font-poppins-regular text-sm text-white"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                {search.length > 0 && (
                                    <Pressable
                                        onPress={() => setSearch('')}
                                        hitSlop={10}
                                    >
                                        <Feather
                                            name="x-circle"
                                            size={17}
                                            color="#8FA5B8"
                                        />
                                    </Pressable>
                                )}
                            </View>
                        </View>

                        {/* Category Chips */}

                        <View className="pb-3">
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingHorizontal: 16,
                                    gap: 8,
                                }}
                            >
                                {ROLE_CATEGORIES.map(item => {
                                    const active = category === item.id;

                                    return (
                                        <Pressable
                                            key={item.id}
                                            onPress={() => setCategory(item.id)}
                                            className={`flex-row items-center gap-2 rounded-full px-4 py-2.5 ${
                                                active
                                                    ? 'bg-[#5CC6E2]'
                                                    : 'bg-white/[0.06]'
                                            }`}
                                        >
                                            <Feather
                                                name={item.icon}
                                                size={14}
                                                color={active ? '#0D1117' : '#8FA5B8'}
                                            />

                                            <Text
                                                className={`font-poppins-medium text-xs ${
                                                    active
                                                        ? 'text-[#0D1117]'
                                                        : 'text-white'
                                                }`}
                                            >
                                                {item.label}
                                            </Text>
                                        </Pressable>
                                    );
                                })}
                            </ScrollView>
                        </View>

                        {/* Results Header */}

                        <View className="flex-row items-center justify-between px-4 pb-2">
                            <Text className="font-poppins-medium text-xs text-secondary">
                                {search.trim()
                                    ? 'SEARCH RESULTS'
                                    : category === 'ALL'
                                        ? 'POPULAR ROLES'
                                        : `${ROLE_CATEGORIES.find(item => item.id === category)?.label.toUpperCase()} ROLES`}
                            </Text>

                            <Text className="font-poppins-regular text-xs text-secondary">
                                {filteredRoles.length} roles
                            </Text>
                        </View>

                        {/* Role List */}

                        <BottomSheetFlatList
                            data={filteredRoles}
                            keyExtractor={keyExtractor}
                            renderItem={renderItem}
                            keyboardShouldPersistTaps="handled"
                            initialNumToRender={12}
                            maxToRenderPerBatch={10}
                            windowSize={5}
                            contentContainerClassName="px-3 pb-6"
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

                                    <Text className="mt-1 font-poppins-regular text-xs text-secondary">
                                        Try another search term.
                                    </Text>
                                </View>
                            }
                        />
                    </Select.Content>
                </Select.Portal>
            </Select>
        </>
    );
}