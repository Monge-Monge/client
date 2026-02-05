import type { RouterContext } from '@/shared/lib/router-context';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Provider as JotaiProvider } from 'jotai';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ThemeProvider } from 'next-themes';
import { OverlayProvider } from 'overlay-kit';
import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { LoadingSpinner } from '@/domains/auth';
import { env } from '@/shared/lib/env';
import { initializeHttpClient } from '@/shared/lib/http-client';
import { queryClient } from '@/shared/lib/query-client';

import { routeTree } from './routeTree.gen';

import '@/styles/globals.css';

// Type declaration for router registration
declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createAppRouter>;
  }
}

function createAppRouter(auth: RouterContext['auth']) {
  return createRouter({
    routeTree,
    context: { queryClient, auth },
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  });
}

/**
 * Inner app component that has access to Clerk auth context
 * Creates router with auth state in context
 */
function AppWithAuth() {
  const { isSignedIn, isLoaded, userId, getToken } = useAuth();

  // Initialize HTTP client with Clerk's getToken
  useEffect(() => {
    initializeHttpClient(getToken);
  }, [getToken]);

  // React Compiler handles memoization - no useMemo needed
  const router = createAppRouter({
    isSignedIn,
    isLoaded,
    userId,
    getToken,
  });

  // Show loading while Clerk initializes
  if (!isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <TanStackRouterDevtools router={router} position="bottom-right" />
    </>
  );
}

/**
 * Root render with full provider stack
 *
 * Provider order (outermost to innermost):
 * 1. StrictMode - React strict mode
 * 2. ClerkProvider - Auth context (outermost for auth access everywhere)
 * 3. JotaiProvider - Client state
 * 4. QueryClientProvider - Server state
 * 5. ThemeProvider - Theme context
 * 6. OverlayProvider - Modal/overlay context
 * 7. RouterProvider - Routing (innermost, needs all above contexts)
 *
 * DevTools placement:
 * - TanStackRouterDevtools: Inside AppWithAuth (needs router instance)
 * - ReactQueryDevtools: Inside QueryClientProvider
 * - JotaiDevTools: Inside JotaiProvider
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClerkProvider publishableKey={env.CLERK_PUBLISHABLE_KEY}>
      <JotaiProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <OverlayProvider>
              <AppWithAuth />
            </OverlayProvider>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          <JotaiDevTools />
        </QueryClientProvider>
      </JotaiProvider>
    </ClerkProvider>
  </StrictMode>
);
