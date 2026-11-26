import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

import { queryKeys } from "@/hooks/queries/query-keys";
import { UpdateUserInput } from "@/types/user";

export function useUpdateUser() {
    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (input: UpdateUserInput) => {
            const token = await getToken();

            if (!token) {
                throw new Error("Authentication required");
            }

            return userService.updateMe(token, input);
        },

        onSuccess: (_, inputs) => {
            queryClient.setQueryData(
                queryKeys.user.me(),
                (old: any) => ({
                    ...old,
                    ...inputs
                })
            );
        }
    });
}