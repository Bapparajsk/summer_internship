import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
    Dialog,
    PressableFeedback,
    Separator,
    cn,
} from "heroui-native";

import { QuizList } from "./quizList";
import {
    SelectOption,
    SelectPopover,
} from "@/components/select";
import If from "@/components/lib/if";

const className = "px-2 py-0.5";

const options: SelectOption[] = [
    {
        id: "new",
        label: "New",
        iconName: "new-card",
        classNames: {
            container: className,
        },
    },
    {
        id: "continue",
        label: "Continue",
        iconName: "play-circle-outline",
        classNames: {
            container: className,
        },
    },
    {
        id: "join",
        label: "Join",
        iconName: "sensors",
        classNames: {
            container: className,
        },
    },
    {
        id: "tags",
        label: "Tags",
        iconName: "hash",
        classNames: {
            container: cn(
                className,
                "bg-primary-soft px-3 py-1.5"
            ),
            label: "text-primary",
            startIconColor: "#22D3EE",
        },
    },
];

const TAGS = [
    "C",
    "C++",
    "Java",
    "Python",
    "React",
    "React Native",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "HTML",
    "CSS",
];

type QuizFilterDialogProps = {
    isOpen: boolean;
    tags: string[];
    onTagsChange: (tags: string[]) => void;
    onClose: () => void;
};

const QuizFilterDialog = ({
    isOpen,
    tags,
    onTagsChange,
    onClose,
}: QuizFilterDialogProps) => {
    const handleTagSelect = (tag: string) => {
        onTagsChange(
            tags.includes(tag)
                ? tags.filter((item) => item !== tag)
                : [...tags, tag]
        );
    };

    return (
        <Dialog
            isOpen={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <Dialog.Portal>
                <Dialog.Overlay className="bg-black/50" />

                <Dialog.Content>
                    <Text className="font-poppins-semibold text-lg text-text-primary">
                        Filter by tags
                    </Text>

                    <Text className="font-poppins-medium text-xs text-text-secondary">
                        Select tags to filter quizzes.
                    </Text>

                    <View className="flex-row flex-wrap gap-2 mt-4">
                        <Text className="font-poppins-medium text-sm text-text-secondary">
                            Languages and frameworks: {tags.length > 0 ? tags.length : "-"}
                        </Text>
                    </View>

                    <View className="flex-row flex-wrap gap-2 mt-3">
                        {TAGS.map((tag) => {
                            const selected = tags.includes(tag);

                            return (
                                <PressableFeedback
                                    key={tag}
                                    onPress={() =>
                                        handleTagSelect(tag)
                                    }
                                    className={cn(
                                        "px-3 py-1.5 flex-row items-center rounded-full border",
                                        selected
                                            ? "bg-primary-soft border-primary"
                                            : "bg-black/10 border-border"
                                    )}
                                >
                                    <Text
                                        className={cn(
                                            "font-poppins-medium text-sm",
                                            selected
                                                ? "text-primary"
                                                : "text-text-secondary"
                                        )}
                                    >
                                        {tag}
                                    </Text>
                                </PressableFeedback>
                            );
                        })}
                    </View>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog>
    );
};

export const QuizContainer = () => {
    const [activeItemIds, setActiveItemIds] =  useState<SelectOption["id"][]>([]);

    /**
     * Applied filters.
     */
    const [tags, setTags] = useState<string[]>([]);

    /**
     * Dialog draft.
     *
     * This is also owned by the parent.
     */
    const [draftTags, setDraftTags] = useState<string[]>([]);

    const [isTagDialogOpen, setIsTagDialogOpen] = useState(false);

    /**
     * SelectPopover selection.
     */
    const handleSelect = (item: SelectOption) => {
        if (item.id === "tags") {
            /**
             * Start dialog with current applied tags.
             */
            setDraftTags(tags);

            /**
             * SelectPopover will close because:
             * onCloseTriggerId={["tags"]}
             */
            setIsTagDialogOpen(true);

            return;
        }

        setActiveItemIds((prev) =>
            prev.includes(item.id)
                ? prev.filter((id) => id !== item.id)
                : [...prev, item.id]
        );
    };

    /**
     * Dialog closes.
     *
     * Commit draft → applied tags.
     */
    const handleTagDialogClose = () => {
        setTags(draftTags);
        setIsTagDialogOpen(false);
    };

    /**
     * Remove an active filter.
     */
    const handleRemoveFilter = (id: string) => {
        setActiveItemIds((prev) =>
            prev.filter((itemId) => itemId !== id)
        );

        setTags((prev) =>
            prev.filter((tag) => tag !== id)
        );

        /**
         * Keep dialog draft consistent if the
         * same tag is currently being edited.
         */
        setDraftTags((prev) =>
            prev.filter((tag) => tag !== id)
        );
    };

    return (
        <View className="gap-3">
            {/* Header */}
            <View className="flex-row justify-between">
                <View className="justify-center">
                    <Text className="font-poppins-semibold text-2xl text-text-primary">
                        Quizzes for you
                    </Text>

                    <Text className="font-poppins-medium text-xs text-text-tertiary">
                        Pick a challenge and start learning.
                    </Text>
                </View>

                {/* Filter */}
                <View>
                    <SelectPopover
                        items={options}
                        separators={[3]}
                        activeItemIds={activeItemIds}
                        onCloseTriggerId={["tags"]}
                        onSelect={handleSelect}
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
                        itemStyle={{
                            labelClassName: "text-sm",
                        }}
                        iconSize={14}
                    />
                </View>
            </View>

            {/* Active filters */}
            <Animated.View
                layout={LinearTransition
                    .springify()
                    .stiffness(200)
                    .mass(0.5)
                    .damping(20)}
                className="flex-row flex-wrap gap-1.5"
            >
                {[...activeItemIds, ...tags].map((id) => (
                    <PressableFeedback
                        key={id}
                        className="flex-row items-center gap-1.5 px-3 py-1.5 bg-black/10 rounded-full border border-border"
                        onPress={() =>
                            handleRemoveFilter(id)
                        }
                    >
                        <MaterialCommunityIcons
                            name="close"
                            size={14}
                            color="#9CA3AF"
                        />

                        <Text className="font-poppins-medium text-sm text-text-secondary">
                            {id}
                        </Text>
                    </PressableFeedback>
                ))}
            </Animated.View>

            {/* Separator if there are active filters */}
            <If condition={activeItemIds.length > 0 || tags.length > 0}>
                <If.Then>
                    <Separator />
                </If.Then>
            </If>
            
            {/* Quiz list */}
            <QuizList />

            {/* Tag Dialog */}
            <QuizFilterDialog
                isOpen={isTagDialogOpen}
                tags={draftTags}
                onTagsChange={setDraftTags}
                onClose={handleTagDialogClose}
            />
        </View>
    );
};