import { SignUp } from '@clerk/clerk-react';

interface SignUpPageProps {
  redirectUrl?: string;
}

/**
 * Sign-up page wrapping Clerk's SignUp component
 */
export function SignUpPage({ redirectUrl }: SignUpPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl={redirectUrl ?? '/'}
      />
    </div>
  );
}
