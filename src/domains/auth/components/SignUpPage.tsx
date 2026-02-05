import { SignUp } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

import { useTheme } from 'next-themes';

import { getClerkAppearance } from '../constants/clerk-theme.constants';

interface SignUpPageProps {
  redirectUrl?: string;
}

/**
 * Sign-up page wrapping Clerk's SignUp component
 * Applies theme-aware appearance styling
 */
export function SignUpPage({ redirectUrl }: SignUpPageProps) {
  const { resolvedTheme } = useTheme();
  const appearance = getClerkAppearance(resolvedTheme);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl={redirectUrl ?? '/'}
        appearance={{
          baseTheme: resolvedTheme === 'dark' ? dark : undefined,
          ...appearance,
        }}
      />
    </div>
  );
}
