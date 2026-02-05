import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';

import { Button } from '@/shared/ui/button';

/**
 * Auth-aware user menu component
 * Shows sign-in/sign-up for guests, user button for authenticated users
 */
export function UserMenu() {
  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <Button variant="ghost" size="sm">
              로그인
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="default" size="sm">
              회원가입
            </Button>
          </SignUpButton>
        </div>
      </SignedOut>
      <SignedIn>
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: 'h-8 w-8',
            },
          }}
        />
      </SignedIn>
    </>
  );
}
