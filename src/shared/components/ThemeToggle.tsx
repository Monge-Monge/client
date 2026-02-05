import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/shared/ui/button';

/**
 * 테마 토글 버튼 컴포넌트
 * 클릭 시 light <-> dark 테마 전환
 */
export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Button variant="ghost" size="icon" onClick={handleThemeToggle}>
      {theme === 'dark' ? (
        <Moon className="size-5" />
      ) : (
        <Sun className="size-5" />
      )}
    </Button>
  );
}
