import type { QueryClient } from '@tanstack/react-query';

/**
 * Auth context passed through router
 * Enables beforeLoad hooks to access auth state without React hooks
 */
export interface AuthContext {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  userId: string | null | undefined;
  getToken: (options?: { skipCache?: boolean }) => Promise<string | null>;
}

/**
 * Router context type
 * Extended with auth for protected route checks
 */
export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}
