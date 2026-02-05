/**
 * Simple loading spinner component
 */
export function LoadingSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
    </div>
  );
}
