import { createFileRoute } from '@tanstack/react-router';

import { SignInPage } from '@/domains/auth';

interface SignInSearchParams {
  redirect?: string;
}

export const Route = createFileRoute('/sign-in')({
  validateSearch: (search: Record<string, unknown>): SignInSearchParams => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: SignInRoute,
});

function SignInRoute() {
  const searchParams: SignInSearchParams = Route.useSearch();
  return <SignInPage redirectUrl={searchParams.redirect} />;
}
