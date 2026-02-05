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
export interface ClerkThemeConfig {
  variables: {
    colorPrimary: string;
    colorBackground: string;
    colorText: string;
    colorTextSecondary: string;
    colorInputBackground: string;
    colorInputText: string;
    colorDanger: string;
    fontFamily: string;
    borderRadius: string;
  };
  elements: {
    card: { boxShadow: string; borderColor: string; borderWidth: string };
    formButtonPrimary: { backgroundColor: string; color: string };
    socialButtonsBlockButton: { borderColor: string; color: string };
    socialButtonsBlockButtonText: { color: string };
    formFieldInput: { borderColor: string; backgroundColor: string };
    footerActionLink: { color: string };
  };
}

// Light theme colors (from globals.css :root)
const lightColors = {
  background: 'oklch(100% 0 0)',
  foreground: 'oklch(14.08% 0.004 285.82)',
  card: 'oklch(100% 0 0)',
  primary: 'oklch(20.47% 0.006 285.88)',
  primaryForeground: 'oklch(98.51% 0.001 106.42)',
  muted: 'oklch(96.76% 0.001 286.38)',
  mutedForeground: 'oklch(55.19% 0.014 285.94)',
  border: 'oklch(91.97% 0.004 286.32)',
  input: 'oklch(91.97% 0.004 286.32)',
  ring: 'oklch(14.08% 0.004 285.82)',
  destructive: 'oklch(57.71% 0.215 27.33)',
} as const;

// Dark theme colors (from globals.css .dark)
const darkColors = {
  background: 'oklch(14.08% 0.004 285.82)',
  foreground: 'oklch(98.51% 0.001 106.42)',
  card: 'oklch(14.08% 0.004 285.82)',
  primary: 'oklch(98.51% 0.001 106.42)',
  primaryForeground: 'oklch(20.47% 0.006 285.88)',
  muted: 'oklch(26.98% 0.006 286.03)',
  mutedForeground: 'oklch(70.67% 0.01 286.07)',
  border: 'oklch(26.98% 0.006 286.03)',
  input: 'oklch(26.98% 0.006 286.03)',
  ring: 'oklch(83.15% 0.006 286.03)',
  destructive: 'oklch(57.71% 0.215 27.33)',
} as const;

// Pretendard font family matching globals.css
const fontFamily = `'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif`;

type ColorConfig = typeof lightColors;

function createClerkAppearance(colors: ColorConfig): ClerkThemeConfig {
  return {
    variables: {
      colorPrimary: colors.primary,
      colorBackground: colors.background,
      colorText: colors.foreground,
      colorTextSecondary: colors.mutedForeground,
      colorInputBackground: colors.card,
      colorInputText: colors.foreground,
      colorDanger: colors.destructive,
      fontFamily,
      borderRadius: '0.5rem',
    },
    elements: {
      card: {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        borderColor: colors.border,
        borderWidth: '1px',
      },
      formButtonPrimary: {
        backgroundColor: colors.primary,
        color: colors.primaryForeground,
      },
      socialButtonsBlockButton: {
        borderColor: colors.border,
        color: colors.foreground,
      },
      socialButtonsBlockButtonText: {
        color: colors.foreground,
      },
      formFieldInput: {
        borderColor: colors.input,
        backgroundColor: colors.background,
      },
      footerActionLink: {
        color: colors.primary,
      },
    },
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
