import ky from 'ky';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const httpClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30_000,
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      request => {
        const token = localStorage.getItem('accessToken');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
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
    options?: Parameters<typeof httpClient.post>[1]
  ) => httpClient.post(url, { json, ...options }).json<T>(),

  put: <T>(
    url: string,
    json: unknown,
    options?: Parameters<typeof httpClient.put>[1]
  ) => httpClient.put(url, { json, ...options }).json<T>(),

  patch: <T>(
    url: string,
    json: unknown,
    options?: Parameters<typeof httpClient.patch>[1]
  ) => httpClient.patch(url, { json, ...options }).json<T>(),

  delete: <T>(url: string, options?: Parameters<typeof httpClient.delete>[1]) =>
    httpClient.delete(url, options).json<T>(),
};
