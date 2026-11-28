import { Text, View, ActivityIndicator } from "react-native";
import { useQuizzes } from "@/hooks/queries/use-quizzes";
import { FlashList } from "@shopify/flash-list";
import { QuizCard } from "@/components/quiz";


export const QuizList = () => {
    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useQuizzes();

    const quizzes = data?.pages.flatMap((page) => page.data) ?? [];

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (isError) {
        return (
            <View>
                <Text>{error.message}</Text>
                <Text onPress={() => refetch()}>Retry</Text>
            </View>
        );
    }

    return (
        <FlashList
            data={quizzes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <QuizCard
                    {...item}
                // onPress={() => {
                //     router.push("/quiz/waiting_room")
                // }}
                />
            )}
            onEndReached={() => {
                if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                isFetchingNextPage ? <ActivityIndicator /> : null
            }
        />
    );
}