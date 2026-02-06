import { createFileRoute } from '@tanstack/react-router';

import { SignInPage } from '@/domains/auth';

interface SignInSearchParams {
  redirect?: string;
}

export const Route = createFileRoute('/sign-in')({
  validateSearch: (search: Record<string, unknown>): SignInSearchParams => {
    const redirect =
      typeof search.redirect === 'string' ? search.redirect : undefined;
    // Only allow relative paths to prevent open redirect attacks
    const safeRedirect =
      redirect?.startsWith('/') && !redirect.startsWith('//')
        ? redirect
        : undefined;
    return { redirect: safeRedirect };
  },
  component: SignInRoute,
});

function SignInRoute() {
  const searchParams: SignInSearchParams = Route.useSearch();
  return <SignInPage redirectUrl={searchParams.redirect} />;
}
