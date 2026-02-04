import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import { Provider as JotaiProvider } from 'jotai'
import { DevTools as JotaiDevTools } from 'jotai-devtools'
import { ThemeProvider } from 'next-themes'
import { OverlayProvider } from 'overlay-kit'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { queryClient } from '@/shared/lib/query-client'

import { routeTree } from './routeTree.gen'

import '@/styles/globals.css'

const router = createRouter({
  routeTree,
  context: { queryClient },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <OverlayProvider>
            <RouterProvider router={router} />
            <TanStackRouterDevtools router={router} position="bottom-right" />
          </OverlayProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <JotaiDevTools />
      </QueryClientProvider>
    </JotaiProvider>
  </StrictMode>
)
