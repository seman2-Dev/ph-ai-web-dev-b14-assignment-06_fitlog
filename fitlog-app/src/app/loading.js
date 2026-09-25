export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-black px-4 py-16 text-white">
      <div className="flex items-center gap-3 text-sm font-semibold text-zinc-300" role="status" aria-live="polite">
        <span aria-hidden="true" className="h-3 w-3 animate-pulse rounded-full bg-[#ccff00]" />
        <span>Loading FitLog...</span>
      </div>
    </main>
  );
}
