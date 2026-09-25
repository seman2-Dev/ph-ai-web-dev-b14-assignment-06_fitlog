import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-black px-4 py-16 text-center text-white">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ccff00]">404</p>
        <h1 className="mt-4 text-4xl font-black">Page not found</h1>
        <p className="mt-3 text-zinc-400">This route is not part of the FitLog library.</p>
        <Link href="/" className="mt-8 inline-flex rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black hover:bg-[#ccff00]">
          Back to workouts
        </Link>
      </div>
    </main>
  );
}
