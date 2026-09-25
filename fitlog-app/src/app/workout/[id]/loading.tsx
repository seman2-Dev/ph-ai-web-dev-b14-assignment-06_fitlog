export default function WorkoutLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-10 text-white" role="status" aria-live="polite">
      <div className="flex items-center gap-3 text-sm font-semibold text-zinc-300">
        <span aria-hidden="true" className="h-3 w-3 animate-pulse rounded-full bg-[#ccff00]" />
        <span>Loading workout details...</span>
      </div>
    </main>
  );
}
