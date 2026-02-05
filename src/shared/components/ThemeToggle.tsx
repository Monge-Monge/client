import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';

import { Button } from '@/shared/ui/button';

// SSR-safe mounted state using useSyncExternalStore
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function useIsMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );
}

/**
 * 테마 토글 버튼 컴포넌트
 * 클릭 시 light <-> dark 테마 전환
 *
 * Note: useSyncExternalStore로 hydration mismatch 방지
 * resolvedTheme 사용으로 system 테마도 올바르게 처리
 */
export function ThemeToggle() {
  const mounted = useIsMounted();
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // 마운트 전에는 빈 버튼 렌더링 (hydration mismatch 방지)
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" aria-label="Toggle theme">
        <span className="size-5" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        resolvedTheme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
    >
      {resolvedTheme === 'dark' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}
