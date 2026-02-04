# Domains

Each domain is a self-contained feature module.

## Domain Structure

```
domains/
└── [domain-name]/
    ├── components/     # Domain-specific components
    ├── atoms/          # Jotai atoms (client + server state)
    ├── api/            # API functions using httpClient
    ├── hooks/          # Domain-specific hooks
    ├── types/          # Type definitions
    └── constants/      # Domain constants
```

## Creating a New Domain

1. Create domain directory: `src/domains/[name]/`
2. Add subdirectories as needed
3. Export public API via index.ts
4. Import in routes as: `@/domains/[name]`

## Example: Auth Domain

```
domains/auth/
├── components/
│   └── LoginForm.tsx
├── atoms/
│   └── auth.atoms.ts
├── api/
│   └── auth.api.ts
├── types/
│   └── auth.types.ts
└── index.ts
```

## Import Rules

- ✅ `@/shared/*` - Import from shared modules
- ✅ `./` or `../` - Relative imports within same domain
- ❌ `@/domains/other-domain` - Never import between domains directly

If you need to share code between domains, move it to `@/shared/`.
