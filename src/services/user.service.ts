import { apiRequest } from "@/lib/api-client";
import type { UpdateUserInput, User } from "@/types/user";


export const userService = {
  getMe: (token: string) =>
    apiRequest<User>("/me", { token }),

  updateMe: (token: string, input: UpdateUserInput) =>
    apiRequest<User>("/me/update", {
      method: "PATCH",
      token,
      body: input,
    }),
};