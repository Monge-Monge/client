import { createFileRoute } from '@tanstack/react-router';

import { SignUpPage } from '@/domains/auth';

interface SignUpSearchParams {
  redirect?: string;
}

export const Route = createFileRoute('/sign-up')({
  validateSearch: (search: Record<string, unknown>): SignUpSearchParams => {
    const redirect =
      typeof search.redirect === 'string' ? search.redirect : undefined;
    // Only allow relative paths to prevent open redirect attacks
    const safeRedirect =
      redirect?.startsWith('/') && !redirect.startsWith('//')
        ? redirect
        : undefined;
    return { redirect: safeRedirect };
  },
  component: SignUpRoute,
});

function SignUpRoute() {
  const searchParams: SignUpSearchParams = Route.useSearch();
  return <SignUpPage redirectUrl={searchParams.redirect} />;
}
