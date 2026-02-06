import type { QueryClient } from '@tanstack/react-query';

import { useHydrateAtoms } from 'jotai/utils';

import { queryClientAtom } from '@/shared/lib/jotai-query';

export function HydrateAtoms({
  queryClient,
  children,
}: {
  queryClient: QueryClient;
  children: React.ReactNode;
}) {
  useHydrateAtoms([[queryClientAtom, queryClient]] as const);
  return children;
}
