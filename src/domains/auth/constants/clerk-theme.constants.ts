/**
 * Clerk appearance configuration with OKLCH colors from globals.css
 * These MUST be hardcoded because Clerk doesn't parse CSS var() at runtime
 *
 * Uses strict typing to avoid ESLint unsafe-assignment errors from Clerk's
 * Appearance type which contains 'any' internally.
 */

/**
 * Strict type definition for Clerk appearance configuration
 * Avoids Clerk's Appearance type which contains 'any'
 */
interface ClerkVariables {
  colorPrimary: string;
  colorBackground: string;
  colorText: string;
  colorTextSecondary: string;
  colorInputBackground: string;
  colorInputText: string;
  colorDanger: string;
  colorNeutral: string;
  fontFamily: string;
  borderRadius: string;
}

interface ClerkElements {
  card: Record<string, string>;
  cardBox: Record<string, string>;
  formButtonPrimary: Record<string, string>;
  socialButtonsBlockButton: Record<string, string>;
  formFieldInput: Record<string, string>;
  footerActionLink: Record<string, string>;
  headerTitle: Record<string, string>;
  headerSubtitle: Record<string, string>;
  dividerLine: Record<string, string>;
  dividerText: Record<string, string>;
  formFieldLabel: Record<string, string>;
  identityPreviewText: Record<string, string>;
  formFieldInputShowPasswordButton: Record<string, string>;
}

export interface ClerkThemeConfig {
  layout?: {
    socialButtonsPlacement?: 'top' | 'bottom';
    socialButtonsVariant?: 'iconButton' | 'blockButton';
    logoPlacement?: 'inside' | 'outside' | 'none';
  };
  variables: ClerkVariables;
  elements: ClerkElements;
  signIn?: { variables: ClerkVariables; elements: ClerkElements };
  signUp?: { variables: ClerkVariables; elements: ClerkElements };
}

// Light theme colors (hex conversion from globals.css OKLCH)
const lightColors = {
  background: '#ffffff',
  foreground: '#0a0a0a',
  card: '#ffffff',
  primary: '#171717',
  primaryForeground: '#fafafa',
  muted: '#f5f5f5',
  mutedForeground: '#737373',
  border: '#e5e5e5',
  input: '#e5e5e5',
  ring: '#0a0a0a',
  destructive: '#ef4444',
} as const;

// Dark theme colors (hex conversion from globals.css OKLCH)
const darkColors = {
  background: '#0a0a0a',
  foreground: '#fafafa',
  card: '#0a0a0a',
  primary: '#fafafa',
  primaryForeground: '#171717',
  muted: '#262626',
  mutedForeground: '#a3a3a3',
  border: '#262626',
  input: '#262626',
  ring: '#d4d4d4',
  destructive: '#ef4444',
} as const;

// Pretendard font family matching globals.css
const fontFamily = `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`;

type ColorConfig = typeof lightColors;

function createClerkAppearance(colors: ColorConfig): ClerkThemeConfig {
  const variables: ClerkVariables = {
    colorPrimary: colors.primary,
    colorBackground: colors.background,
    colorText: colors.foreground,
    colorTextSecondary: colors.mutedForeground,
    colorInputBackground: colors.card,
    colorInputText: colors.foreground,
    colorDanger: colors.destructive,
    colorNeutral: colors.foreground,
    fontFamily,
    borderRadius: '0.5rem',
  };

  const elements: ClerkElements = {
    card: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      borderWidth: '1px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    cardBox: {
      backgroundColor: colors.background,
    },
    formButtonPrimary: {
      backgroundColor: colors.primary,
      color: colors.primaryForeground,
    },
    socialButtonsBlockButton: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.foreground,
    },
    formFieldInput: {
      backgroundColor: colors.background,
      borderColor: colors.border,
      color: colors.foreground,
    },
    footerActionLink: {
      color: colors.primary,
    },
    headerTitle: {
      color: colors.foreground,
    },
    headerSubtitle: {
      color: colors.mutedForeground,
    },
    dividerLine: {
      backgroundColor: colors.border,
    },
    dividerText: {
      color: colors.mutedForeground,
    },
    formFieldLabel: {
      color: colors.foreground,
    },
    identityPreviewText: {
      color: colors.foreground,
    },
    formFieldInputShowPasswordButton: {
      color: colors.mutedForeground,
    },
  };

  return {
    layout: {
      socialButtonsPlacement: 'top' as const,
      socialButtonsVariant: 'iconButton' as const,
    },
    variables,
    elements,
    // Apply same styling to modal components
    signIn: { variables, elements },
    signUp: { variables, elements },
  };
}

export const clerkLightAppearance: ClerkThemeConfig =
  createClerkAppearance(lightColors);
export const clerkDarkAppearance: ClerkThemeConfig =
  createClerkAppearance(darkColors);

/**
 * Get Clerk appearance based on current theme
 * @param theme - 'light', 'dark', or undefined (defaults to light)
 */
export function getClerkAppearance(
  theme: string | undefined
): ClerkThemeConfig {
  return theme === 'dark' ? clerkDarkAppearance : clerkLightAppearance;
}
