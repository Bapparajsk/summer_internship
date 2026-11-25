import { apiRequest } from "@/lib/api-client";
import type { User } from "@/types/user";

export const userService = {
  getMe: (token: string) =>
    apiRequest<User>("/users/me", { token }),
};