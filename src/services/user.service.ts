import { apiRequest } from "@/lib/api-client";
import type { UpdateUserInput, User } from "@/types/user";


export const userService = {
  getMe: (token: string) =>
    apiRequest<User>("/users/me", { token }),

  updateMe: (token: string, input: UpdateUserInput) =>
    apiRequest<User>("/users/me", {
      method: "PATCH",
      token,
      body: input,
    }),
};