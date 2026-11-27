import { apiRequest } from "@/lib/api-client";
import type { UpdateUserInput, UpdateUserResponse, User } from "@/types/user";


export const userService = {
  getMe: (token: string) =>
    apiRequest<User>("/me", { token }),

  updateMe: (token: string, input: UpdateUserInput) =>
    apiRequest<UpdateUserResponse>("/me/update", {
      method: "PATCH",
      token,
      body: input,
    }),
};