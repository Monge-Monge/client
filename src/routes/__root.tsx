import type { RouterContext } from '@/shared/lib/router-context';

import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from '@tanstack/react-router';

import { UserMenu } from '@/domains/auth';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

/**
 * Root route with typed context
 * Context includes queryClient and auth state for use in beforeLoad hooks
 */
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <nav className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link to="/" className="font-semibold">
            Mongemonge
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <UserMenu />
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
