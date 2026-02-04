import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Mongemonge</h1>
      <p className="text-muted-foreground">
        프로젝트가 성공적으로 설정되었습니다.
      </p>
    </div>
  )
}
