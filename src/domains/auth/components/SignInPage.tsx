import { SignIn } from '@clerk/clerk-react';

interface SignInPageProps {
  redirectUrl?: string;
}

/**
 * Sign-in page wrapping Clerk's SignIn component
 */
export function SignInPage({ redirectUrl }: SignInPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={redirectUrl ?? '/'}
      />
    </div>
  );
}
