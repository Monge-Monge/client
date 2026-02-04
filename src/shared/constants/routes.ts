/**
 * Type-safe route constants
 * Usage: navigate({ to: ROUTES.HOME })
 */
export const ROUTES = {
  HOME: '/',
  // Add more routes as they are created
} as const

export type RouteKey = keyof typeof ROUTES
export type RoutePath = (typeof ROUTES)[RouteKey]
