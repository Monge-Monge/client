import ky, { type HTTPError, type KyInstance } from 'ky';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

/**
 * Token getter function type
 * Matches Clerk's getToken signature
 */
type TokenGetter = (options?: {
  skipCache?: boolean;
}) => Promise<string | null>;

/**
 * Token getter instance - initialized after ClerkProvider mounts
 */
let tokenGetter: TokenGetter | null = null;

/**
 * Initialize HTTP client with Clerk's getToken function
 * MUST be called after ClerkProvider mounts
 */
export function initializeHttpClient(getToken: TokenGetter): void {
  tokenGetter = getToken;
}

/**
 * HTTP client instance with Clerk token integration
 *
 * Features:
 * - Automatic Bearer token injection via async beforeRequest
 * - 401 retry with token refresh via beforeRetry
 * - Graceful handling when tokenGetter is not initialized
 */
export const httpClient: KyInstance = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30_000,
  retry: {
    limit: 2,
    methods: ['get', 'put'],
    statusCodes: [401, 408, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        if (tokenGetter) {
          const token = await tokenGetter();
          if (token) {
            request.headers.set('Authorization', `Bearer ${token}`);
          }
        }
      },
    ],
    beforeRetry: [
      async ({ error, retryCount }) => {
        const httpError = error as HTTPError;

        // On first 401 retry, force token refresh
        if (
          httpError.response?.status === 401 &&
          retryCount === 0 &&
          tokenGetter
        ) {
          const freshToken = await tokenGetter({ skipCache: true });

          // If we can't get a fresh token, don't retry
          if (!freshToken) {
            throw error;
          }
          // Token will be set in next beforeRequest hook
        }
      },
    ],
  },
});

// Type-safe API helpers
export const api = {
  get: <T>(url: string, options?: Parameters<typeof httpClient.get>[1]) =>
    httpClient.get(url, options).json<T>(),

  post: <T>(
    url: string,
    json: unknown,
    options?: Parameters<typeof httpClient.post>[1],
  ) => httpClient.post(url, { json, ...options }).json<T>(),

  put: <T>(
    url: string,
    json: unknown,
    options?: Parameters<typeof httpClient.put>[1],
  ) => httpClient.put(url, { json, ...options }).json<T>(),

  patch: <T>(
    url: string,
    json: unknown,
    options?: Parameters<typeof httpClient.patch>[1],
  ) => httpClient.patch(url, { json, ...options }).json<T>(),

  delete: <T>(url: string, options?: Parameters<typeof httpClient.delete>[1]) =>
    httpClient.delete(url, options).json<T>(),
};
