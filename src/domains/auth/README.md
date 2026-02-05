# Auth Domain

Clerk 기반 인증 시스템 구현

## Clerk Dashboard 설정

### OAuth 전용 설정

이메일/전화번호 인증을 비활성화하고 OAuth만 사용하려면:

1. [Clerk Dashboard](https://dashboard.clerk.com) 접속
2. **Configure > Email, Phone, Username** 메뉴
3. "Email address" 비활성화
4. "Phone number" 비활성화
5. **Configure > Social Connections** 메뉴
6. 원하는 OAuth 제공자 활성화 (Google, GitHub 등)
7. 변경사항 저장

### 활성화된 OAuth 제공자

- Google (권장)
- GitHub (개발자용)

## 테마 커스터마이징

### 구조

```
constants/
├── auth.constants.ts      # 라우트, 메시지 상수
└── clerk-theme.constants.ts  # Clerk appearance 설정
```

### Clerk Appearance 설정

`clerk-theme.constants.ts`에서 Clerk 컴포넌트 스타일링을 관리합니다.

**중요:** Clerk는 CSS `var()` 문법을 런타임에 파싱하지 않습니다.
따라서 OKLCH 값을 하드코딩해야 합니다.

```typescript
// ❌ 잘못된 방법
colorPrimary: 'var(--color-primary)'

// ✅ 올바른 방법
colorPrimary: 'oklch(20.47% 0.006 285.88)'
```

### 색상 값 업데이트

`globals.css`의 색상 값을 변경한 경우:

1. `clerk-theme.constants.ts`의 `lightColors`와 `darkColors` 객체 업데이트
2. 값은 `globals.css`에서 복사

### 모달 스타일링

`SignInButton`과 `SignUpButton`은 `appearance` prop을 직접 받지 않습니다.
모달 스타일링은 `main.tsx`의 `ClerkProvider` appearance로 처리됩니다.

```typescript
// main.tsx
<ClerkProviderWithTheme>  // appearance 적용
  {children}
</ClerkProviderWithTheme>
```

## 컴포넌트

| 컴포넌트 | 용도 |
|----------|------|
| `SignInPage` | 로그인 페이지 |
| `SignUpPage` | 회원가입 페이지 |
| `UserMenu` | 헤더 사용자 메뉴 |
| `LoadingSpinner` | 로딩 표시 |

## 환경 변수

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
```
