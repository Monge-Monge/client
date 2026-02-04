// @ts-check
import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'
import reactPlugin from 'eslint-plugin-react'
import reactCompiler from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefreshPlugin from 'eslint-plugin-react-refresh'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  // 전역 무시
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.vite/**',
      'src/routeTree.gen.ts',
      'src/shared/ui/**',
    ],
  },

  // 기본 권장 규칙
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier 충돌 해결
  prettierConfig,

  // TypeScript + React 설정
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-compiler': reactCompiler,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react-compiler/react-compiler': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // TypeScript
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Import 정렬
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Type imports 우선
            ['^.*\\u0000$'],
            // Node.js 내장 모듈
            ['^node:'],
            // @ 스코프 패키지
            ['^@(?!/)'],
            // 일반 외부 패키지
            ['^[a-z]'],
            // 내부 모듈 (@/ alias)
            ['^@/'],
            // 상대 경로
            [
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$',
            ],
          ],
        },
      ],
      'simple-import-sort/exports': 'error',

      // Prettier
      'prettier/prettier': 'error',
    },
  },

  // shadcn/ui 컴포넌트 - variants export 허용
  {
    files: ['src/shared/ui/**/*.{ts,tsx}'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // 진입점 파일 - Fast Refresh 불필요
  {
    files: ['src/main.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  },

  // JavaScript 파일 타입 체크 비활성화
  {
    files: ['**/*.js', '**/*.mjs'],
    extends: [tseslint.configs.disableTypeChecked],
  }
)
