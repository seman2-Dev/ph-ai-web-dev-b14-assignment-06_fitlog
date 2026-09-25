"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import fallbackImage from '../../../assets/banner.png';
import { fetchWorkoutById } from './api';
import type { WorkoutCardData } from '../../types/types';

const CardDetails = ({ initialWorkout }: { initialWorkout: WorkoutCardData }) => {
  const params = useParams();
  const workoutId = params?.id as string | undefined;
  const [workout, setWorkout] = useState<WorkoutCardData | null>(initialWorkout);
  const [loading, setLoading] = useState(!initialWorkout);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [planFull, setPlanFull] = useState(false);
  const [isInPlan, setIsInPlan] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!workoutId) return;
    const planTimer = window.setTimeout(() => {
      try {
        const currentPlan = JSON.parse(localStorage.getItem('fitlog-plan') || '[]') as WorkoutCardData[];
        setPlanFull(currentPlan.length >= 5);
        setIsInPlan(currentPlan.some((item) => String(item.id) === workoutId));
        const currentSaved = JSON.parse(localStorage.getItem('fitlog-saved') || '[]') as WorkoutCardData[];
        setIsSaved(currentSaved.some((item) => String(item.id) === workoutId));
      } catch {
        setPlanFull(false);
        setIsInPlan(false);
        setIsSaved(false);
      }
    }, 0);
    let active = true;
    if (!initialWorkout) {
      fetchWorkoutById(workoutId)
        .then((data) => active && setWorkout(data))
        .catch((err) => active && setError(err instanceof Error ? err.message : 'Unable to load workout details.'))
        .finally(() => active && setLoading(false));
    }
    return () => {
      active = false;
      window.clearTimeout(planTimer);
    };
  }, [initialWorkout, workoutId]);

  const saveWorkout = (key: 'fitlog-plan' | 'fitlog-saved', message: string) => {
    if (!workout) return;
    const current = JSON.parse(localStorage.getItem(key) || '[]') as WorkoutCardData[];
    if (key === 'fitlog-plan' && current.length >= 5 && !current.some((item) => item.id === workout.id)) {
      setPlanFull(true);
      setNotice('Your plan already has five lifts.');
      return;
    }
    const alreadyExists = current.some((item) => item.id === workout.id);
    if (!alreadyExists) {
      localStorage.setItem(key, JSON.stringify([...current, workout]));
      window.dispatchEvent(new Event('fitlog-storage'));
    }
    if (key === 'fitlog-plan') setIsInPlan(true);
    if (key === 'fitlog-saved') setIsSaved(true);
    let toastMessage = message;
    if (alreadyExists) {
      toastMessage = key === 'fitlog-plan' ? "Already in today's plan." : 'Already saved for later.';
    }
    setNotice(toastMessage);
    window.setTimeout(() => setNotice(''), 2200);
  };

  if (loading) return <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-700 bg-black p-8 text-center text-zinc-400">Loading workout details...</div>;
  if (error || !workout) return <div className="mx-auto max-w-4xl rounded-3xl border border-red-800 bg-red-950/40 p-8 text-center text-red-300">{error || 'Workout not found.'}</div>;

  const specs = [['Equipment', workout.equipment], ['Difficulty', workout.difficulty], ['Sets', workout.sets], ['Reps', workout.reps], ['Duration', workout.duration], ['Calories', workout.calories], ['Rating', workout.rating]];
  const instructions = workout.instructions.length ? workout.instructions : ['Set up with stable form and controlled breathing.', 'Complete each rep through a comfortable range of motion.', 'Keep your core engaged throughout the movement.', 'Rest, then repeat for the prescribed sets.'];

  return (
    <main className="min-h-screen bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-6 inline-block text-sm font-semibold text-[#ccff00] hover:text-[#ccff00]">← Back to workouts</Link>
        <article className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#111111] shadow-2xl">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-75 bg-zinc-900"><Image src={workout.image || fallbackImage} alt={workout.title} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover p-6" /></div>
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="mb-4 flex flex-wrap gap-2">{workout.categories.map((category) => <span key={category} className="rounded-full bg-[#ccff00]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#ccff00]">{category}</span>)}</div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-400">{workout.focus}</p>
              <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{workout.title}</h1>
              <p className="mt-4 leading-relaxed text-zinc-300">{workout.description}</p>

              <div className="mt-7 overflow-hidden rounded-2xl border border-zinc-800 bg-black/60">
                <table className="w-full text-left">
                  <tbody>
                    {specs.map(([label, value]) => (
                      <tr key={label} className="border-b border-zinc-800 last:border-b-0">
                        <th scope="row" className="w-1/2 border-r border-zinc-700 px-4 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">{label}</th>
                        <td className="px-4 py-3 text-sm font-semibold text-white">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8"><h2 className="text-sm font-bold uppercase tracking-[0.2em] text-[#ccff00]">Instructions</h2><ol className="mt-4 space-y-3">{instructions.map((instruction, index) => <li key={`${index}-${instruction}`} className="flex gap-3 text-sm leading-relaxed text-zinc-300"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xs font-bold text-[#ccff00]">{index + 1}</span><span>{instruction}</span></li>)}</ol></div>
              <div className="mt-8 flex flex-wrap gap-3"><button type="button" disabled={planFull && !isInPlan} onClick={() => saveWorkout('fitlog-plan', "Added to today's plan")} className="rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[#ccff00] disabled:cursor-not-allowed disabled:opacity-50"><span aria-hidden="true">＋</span> {planFull && !isInPlan ? 'Plan is full' : "Add to today's plan"}</button><button type="button" onClick={() => saveWorkout('fitlog-saved', 'Saved for later')} className="rounded-xl border border-zinc-700 bg-black px-5 py-3 text-sm font-bold text-white transition-colors hover:border-[#ccff00] hover:text-[#ccff00]"><span aria-hidden="true">☆</span> {isSaved ? 'Save again' : 'Save for later'}</button></div>
              {notice && <output className="fixed right-6 top-6 z-50 rounded-xl border border-[#ccff00]/40 bg-zinc-900 px-4 py-3 text-sm font-semibold text-[#ccff00] shadow-xl">{notice}</output>}
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default CardDetails;
