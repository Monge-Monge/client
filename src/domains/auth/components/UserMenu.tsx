import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

import { useTheme } from '@/shared/components/ThemeProvider';
import { Button } from '@/shared/ui/button';

import { getClerkAppearance } from '../constants/clerk-theme.constants';

/**
 * Auth-aware user menu component
 * Shows sign-in/sign-up for guests, user button for authenticated users
 *
 * Note: SignInButton and SignUpButton do NOT accept appearance prop directly.
 * Their modal styling is handled by ClerkProvider's global appearance.
 */
export function UserMenu() {
  const { resolvedTheme } = useTheme();
  const appearance = getClerkAppearance(resolvedTheme);

  return (
    <>
      <SignedOut>
        <div className="flex items-center gap-2">
          {/* Modal styling handled by ClerkProvider appearance */}
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
            baseTheme: resolvedTheme === 'dark' ? dark : undefined,
            ...appearance,
            elements: {
              ...appearance.elements,
              avatarBox: { height: '2rem', width: '2rem' },
            },
          }}
        />
      </SignedIn>
    </>
  );
}
