import { SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  createFileRoute,
  Navigate,
  Outlet,
  useLocation,
} from '@tanstack/react-router';

import { AUTH_ROUTES } from '@/domains/auth';

/**
 * Protected layout route using Clerk's declarative components
 *
 * All routes nested under _protected require authentication.
 * Example: src/routes/_protected/dashboard.tsx -> /dashboard (protected)
 *
 * Uses Clerk's SignedIn/SignedOut components for cleaner auth handling.
 */
export const Route = createFileRoute('/_protected')({
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const location = useLocation();

  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <Navigate
          to={AUTH_ROUTES.SIGN_IN}
          search={{ redirect: location.pathname }}
        />
      </SignedOut>
    </>
  );
}
