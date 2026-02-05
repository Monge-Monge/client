import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/ui/button';

/**
 * 테마 토글 버튼 컴포넌트
 * 클릭 시 light <-> dark 테마 전환
 *
 * Note: resolvedTheme 사용으로 system 테마도 올바르게 처리
 * conditional rendering으로 hydration 이슈 방지
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

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
