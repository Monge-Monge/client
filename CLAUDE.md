# Mongemonge Client - Project Conventions

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Routing:** TanStack Router (file-based)
- **State:** Jotai + jotai-tanstack-query
- **Server State:** TanStack Query
- **Styling:** Tailwind CSS 4 + shadcn/ui
- **HTTP:** ky
- **Forms:** React Hook Form + Zod
- **Overlays:** overlay-kit

## Project Structure (Toss Frontend Fundamental)

```
src/
├── shared/           # Global shared modules
│   ├── components/   # Shared UI components
│   ├── ui/           # shadcn/ui components
│   ├── lib/          # Utilities
│   └── constants/    # Global constants
│
├── domains/          # Domain-driven features
│   └── [domain]/
│       ├── components/
│       ├── atoms/
│       ├── api/
│       ├── hooks/
│       ├── types/
│       └── constants/
│
├── routes/           # TanStack Router pages
└── styles/           # Global styles
```

## Import Conventions

```typescript
// 1. External packages
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Shared modules
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Header } from '@/shared/components/Header';

// 3. Domain modules
import { useAuth } from '@/domains/auth';

// 4. Relative imports (same domain only)
import { LoginButton } from './LoginButton';
```

## State Management

### Client State (Jotai)

```typescript
// domains/[domain]/atoms/[name].atoms.ts
import { atom } from 'jotai';

export const countAtom = atom(0);
```

### Server State (jotai-tanstack-query)

```typescript
// domains/[domain]/atoms/[name].atoms.ts
import { atomWithQuery } from '@/shared/lib/jotai-query';
import { api } from '@/shared/lib/http-client';

export const userAtom = atomWithQuery(() => ({
  queryKey: ['user'],
  queryFn: () => api.get<User>('users/me'),
}));
```

## API Layer

```typescript
// domains/[domain]/api/[name].api.ts
import { api } from '@/shared/lib/http-client';
import type { User, CreateUserDto } from '../types';

export const userApi = {
  getMe: () => api.get<User>('users/me'),
  create: (data: CreateUserDto) => api.post<User>('users', data),
};
```

## Component Guidelines

### File Naming

- Components: `PascalCase.tsx`
- Hooks: `use-kebab-case.ts`
- Utilities: `kebab-case.ts`
- Types: `[name].types.ts`
- Atoms: `[name].atoms.ts`
- API: `[name].api.ts`

### Component Structure

```typescript
// 1. Imports
// 2. Types (if not in separate file)
// 3. Constants
// 4. Component
// 5. Sub-components (if small)
```

## shadcn/ui Usage

Add components to `src/shared/ui/`:

```bash
pnpm dlx shadcn@latest add button
```

## Commands

- `pnpm dev` - Start development server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format with Prettier

## Key Principles (My Frontend Guidelines)

1. **Readability:** Name magic numbers, extract complex logic
2. **Predictability:** Standardized returns, no hidden side effects
3. **Cohesion:** Organize by domain, not by type
4. **Coupling:** Avoid premature abstraction
