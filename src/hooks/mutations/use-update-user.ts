import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userService } from "@/services/user.service";

import { queryKeys } from "@/hooks/queries/query-keys";
import type { UpdateUserInput, User } from "@/types/user";

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

        onSuccess: (_, variables) => {
            const user = queryClient.setQueryData<User>(
                queryKeys.user.me(),
                (old) => {
                    if (!old) return old;

                    return {
                        ...old,
                        ...variables,
                        academic_information: variables.academic_information && old.academic_information
                            ? { ...old.academic_information, ...variables.academic_information }
                            : old.academic_information,
                        college_information: variables.college_information && old.college_information
                            ? { ...old.college_information, ...variables.college_information }
                            : old.college_information,
                    };
                },
            );

            if (
                (variables.academic_information && !user?.academic_information)
                || (variables.college_information && !user?.college_information)
            ) {
                void queryClient.invalidateQueries({ queryKey: queryKeys.user.me() });
            }
        }
    });
}