import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/dashboard')({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold">대시보드</h1>
      <p className="mt-2 text-muted-foreground">
        이 페이지는 로그인한 사용자만 접근할 수 있습니다.
      </p>
    </div>
  );
}
