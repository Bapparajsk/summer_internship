const API_URL = process.env.EXPO_PUBLIC_API_URL!;

type ApiOptions = {
    token?: string | null;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
};

export async function apiRequest<T>(
    endpoint: string,
    options: ApiOptions = {}
): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: options.method ?? "GET",

        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",

            ...(options.token
                ? { Authorization: `Bearer ${options.token}` }
                : {}),
        },

        ...(options.body !== undefined && {
            body: JSON.stringify(options.body),
        }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw new Error(
            data?.message ?? `HTTP Error: ${response.status}`
        );
    }

    return data as T;
}