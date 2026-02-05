import { SignIn } from '@clerk/clerk-react';

import { useTheme } from 'next-themes';

import { getClerkAppearance } from '../constants/clerk-theme.constants';

interface SignInPageProps {
  redirectUrl?: string;
}

/**
 * Sign-in page wrapping Clerk's SignIn component
 * Applies theme-aware appearance styling
 */
export function SignInPage({ redirectUrl }: SignInPageProps) {
  const { resolvedTheme } = useTheme();
  const appearance = getClerkAppearance(resolvedTheme);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={redirectUrl ?? '/'}
        appearance={appearance}
      />
    </div>
  );
}
