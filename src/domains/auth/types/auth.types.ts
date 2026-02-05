/**
 * Auth domain types
 */

export interface AuthUser {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
}

export interface AuthState {
  isSignedIn: boolean | undefined;
  isLoaded: boolean;
  userId: string | null | undefined;
}
