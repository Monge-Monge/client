import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/shared/components/ThemeProvider';
import { Button } from '@/shared/ui/button';

/**
 * 테마 토글 버튼 컴포넌트
 * 클릭 시 light <-> dark 테마 전환
 */
export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
      {resolvedTheme === 'dark' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}
