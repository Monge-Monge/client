import type { RouterContext } from '@/shared/lib/router-context';

import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useRouter,
} from '@tanstack/react-router';

import { UserMenu } from '@/domains/auth';
import { ThemeToggle } from '@/shared/components/ThemeToggle';

/**
 * Root route with typed context
 * Context includes queryClient and auth state for use in beforeLoad hooks
 */
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  errorComponent: RootErrorFallback,
});

function RootErrorFallback({ error }: { error: Error }) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">오류가 발생했습니다</h1>
      <p className="text-muted-foreground">{error.message}</p>
      <button
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
        onClick={() => void router.invalidate()}
      >
        다시 시도
      </button>
    </div>
  );
}

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
