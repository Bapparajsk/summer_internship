import { useAuth } from "@clerk/expo";
import { useInfiniteQuery } from "@tanstack/react-query";

import { quizService } from "@/services/quiz.service";
import { queryKeys } from "./query-keys";

const PAGE_SIZE = 20;

export function useQuizzes() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  return useInfiniteQuery({
    queryKey: queryKeys.quizzes.list({ limit: PAGE_SIZE }),

    initialPageParam: undefined as string | undefined,

    queryFn: async ({ pageParam }) => {
      const token = await getToken();

      if (!token) {
        throw new Error("Authentication required");
      }

      return quizService.getQuizzes(token, {
        limit: PAGE_SIZE,
        cursor: pageParam,
      });
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage.pagination.hasNext) return undefined;

      return lastPage.pagination.nextCursor ?? undefined;
    },

    enabled: isLoaded && !!isSignedIn,
    staleTime: 5 * 60 * 1000,
  });
}