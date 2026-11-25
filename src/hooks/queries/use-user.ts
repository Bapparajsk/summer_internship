import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/expo";
import { userService } from "@/services/user.service";
import { queryKeys } from "./query-keys";

export function useUser() {
  const { getToken, isLoaded, isSignedIn } = useAuth();

  return useQuery({
    queryKey: queryKeys.user.me(),

    queryFn: async () => {
      const token = await getToken();

      // console.log({token})

      if (!token) {
        throw new Error("Authentication required");
      }

      return userService.getMe(token);
    },
    

    enabled: isLoaded && !!isSignedIn,
    staleTime: 5 * 60 * 1000,
  });
}