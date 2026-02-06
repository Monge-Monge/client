/**
 * Runtime environment validation
 * Fails fast with clear error messages if required env vars are missing
 */

function getRequiredEnvVar(key: 'VITE_CLERK_PUBLISHABLE_KEY'): string {
  const value = import.meta.env[key] as string | undefined;
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
        `Please add it to your .env.local file.`,
    );
  }
  return value;
}

export const env = {
  CLERK_PUBLISHABLE_KEY: getRequiredEnvVar('VITE_CLERK_PUBLISHABLE_KEY'),
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL ?? '/api',
} as const;
