import type { RouterContext } from '@/shared/lib/router-context';

import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import { Provider as JotaiProvider } from 'jotai';
import { OverlayProvider } from 'overlay-kit';
import { lazy, StrictMode, Suspense, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { getClerkAppearance } from '@/domains/auth';
import { HydrateAtoms } from '@/shared/components/HydrateAtoms';
import { LoadingSpinner } from '@/shared/components/LoadingSpinner';
import { ThemeProvider, useTheme } from '@/shared/components/ThemeProvider';
import { env } from '@/shared/lib/env';
import { initializeHttpClient } from '@/shared/lib/http-client';
import { queryClient } from '@/shared/lib/query-client';

import { routeTree } from './routeTree.gen';

import '@/styles/globals.css';

// Lazy-load devtools only in development
const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-router-devtools').then((mod) => ({
        default: mod.TanStackRouterDevtools,
      })),
    )
  : () => null;

const JotaiDevTools = import.meta.env.DEV
  ? lazy(() =>
      import('jotai-devtools').then((mod) => ({
        default: mod.DevTools,
      })),
    )
  : () => null;

// Create router at module level (singleton)
const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined! as RouterContext['auth'],
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});

// Type declaration for router registration
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

/**
 * ClerkProvider wrapper that applies theme-aware appearance
 * Must be inside ThemeProvider to access useTheme()
 */
function ClerkProviderWithTheme({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const appearance = getClerkAppearance(resolvedTheme);

  return (
    <ClerkProvider
      publishableKey={env.CLERK_PUBLISHABLE_KEY}
      allowedRedirectOrigins={[window.location.origin]}
      appearance={{
        baseTheme: resolvedTheme === 'dark' ? dark : undefined,
        ...appearance,
      }}
    >
      {children}
    </ClerkProvider>
  );
}

/**
 * Inner app component that has access to Clerk auth context
 * Updates module-level router with real auth context
 */
function AppWithAuth() {
  const auth = useAuth();

  // Initialize HTTP client with Clerk's getToken
  useEffect(() => {
    initializeHttpClient(auth.getToken);
  }, [auth.getToken]);

  // Update router context with real auth
  useEffect(() => {
    router.update({
      context: {
        queryClient,
        auth: {
          isSignedIn: auth.isSignedIn,
          isLoaded: auth.isLoaded,
          userId: auth.userId,
          getToken: auth.getToken,
        },
      },
    });
  }, [auth.isSignedIn, auth.isLoaded, auth.userId, auth.getToken]);

  // Show loading while Clerk initializes
  if (!auth.isLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <RouterProvider router={router} />
      <Suspense fallback={null}>
        <TanStackRouterDevtools router={router} position="bottom-right" />
      </Suspense>
    </>
  );
}

/**
 * Root render with full provider stack
 *
 * Provider order (outermost to innermost):
 * 1. StrictMode - React strict mode
 * 2. ThemeProvider - Theme context (must wrap ClerkProvider for useTheme access)
 * 3. ClerkProviderWithTheme - Auth context with theme-aware appearance
 * 4. JotaiProvider - Client state
 * 5. QueryClientProvider - Server state
 * 6. HydrateAtoms - Syncs queryClient into Jotai's queryClientAtom
 * 7. OverlayProvider - Modal/overlay context
 * 8. RouterProvider - Routing (innermost, needs all above contexts)
 *
 * DevTools placement:
 * - TanStackRouterDevtools: Inside AppWithAuth (needs router instance)
 * - ReactQueryDevtools: Inside QueryClientProvider
 * - JotaiDevTools: Inside JotaiProvider
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system">
      <ClerkProviderWithTheme>
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <HydrateAtoms queryClient={queryClient}>
              <OverlayProvider>
                <AppWithAuth />
              </OverlayProvider>
            </HydrateAtoms>
            <ReactQueryDevtools initialIsOpen={false} />
            <Suspense fallback={null}>
              <JotaiDevTools />
            </Suspense>
          </QueryClientProvider>
        </JotaiProvider>
      </ClerkProviderWithTheme>
    </ThemeProvider>
  </StrictMode>,
);
