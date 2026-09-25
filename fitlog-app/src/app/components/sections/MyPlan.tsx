"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import fallbackImage from '../../../assets/banner.png';
import type { WorkoutCardData } from '../../types/types';

type Tab = 'plan' | 'saved';
type SortOption = 'duration' | 'calories' | 'rating';


const StatIcon = ({ type }: { type: 'clock' | 'flame' | 'rating' }) => (
  <span aria-hidden="true" className="text-sm text-white">
    {type === 'clock' ? '\u25F7' : type === 'flame' ? '\u2668' : '\u2605'}
  </span>
);

const MyPlan = () => {
  const [tab, setTab] = useState<Tab>('plan');
  const [items, setItems] = useState<WorkoutCardData[]>([]);
  const [completedIds, setCompletedIds] = useState<Array<WorkoutCardData['id']>>([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('duration');
  const [query, setQuery] = useState('');
  const storageKey = tab === 'plan' ? 'fitlog-plan' : 'fitlog-saved';

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        setItems(JSON.parse(localStorage.getItem(storageKey) || '[]') as WorkoutCardData[]);
      } catch {
        setItems([]);
      }
      try { setCompletedIds(JSON.parse(localStorage.getItem('fitlog-completed') || '[]')); } catch { setCompletedIds([]); }
      setLoading(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [storageKey]);

  const remove = (id: WorkoutCardData['id']) => {
    const next = items.filter((item) => item.id !== id);
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
    window.dispatchEvent(new Event('fitlog-storage'));
    setNotice('Workout removed.');
    window.setTimeout(() => setNotice(''), 2200);
  };

  const markAsDone = (id: WorkoutCardData['id']) => {
    const next = completedIds.includes(id)
      ? completedIds.filter((completedId) => completedId !== id)
      : [...completedIds, id];
    setCompletedIds(next);
    localStorage.setItem('fitlog-completed', JSON.stringify(next));
    setNotice(next.includes(id) ? 'Workout marked as done.' : 'Workout marked as active.');
    window.setTimeout(() => setNotice(''), 2200);
  };

  const minutes = items.reduce((sum, item) => sum + (Number.parseInt(item.duration, 10) || 0), 0);
  const calories = items.reduce((sum, item) => sum + (Number.parseInt(item.calories, 10) || 0), 0);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredItems = items.filter((item) => [item.title, item.focus, ...item.categories].some((value) => value.toLowerCase().includes(normalizedQuery)));
  const sortedItems = [...filteredItems].sort((first, second) => Number.parseFloat(first[sortBy]) - Number.parseFloat(second[sortBy]));
  let planContent;

  if (loading) {
    planContent = <div className="rounded-3xl border border-zinc-700 bg-zinc-900 p-10 text-center text-zinc-400">Loading workouts...</div>;
  } else if (items.length === 0) {
    planContent = 
    <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center">
      <h3 className="text-xl font-black text-white">NOTHING HERE YET</h3>
      <p className="mt-2 text-zinc-400">Browse the library and add a lift to get today moving.</p>
      <Link href="/#library" className="mt-6 inline-flex rounded-xl bg-[#ccff00] px-5 py-3 text-sm font-bold text-black hover:bg-[#ccff00]">
      Go to workouts
      </Link>
    </div>;
  } else if (filteredItems.length === 0) {
    planContent = <div className="rounded-3xl border border-dashed border-zinc-700 bg-zinc-900 p-10 text-center text-zinc-400">No workouts match &quot;{query}&quot;.</div>;
  } else {
    planContent = 
    <div className="grid gap-4 md:grid-cols-1">{sortedItems.map((item) => 
      { const isDone = completedIds.includes(item.id); 
    return <article key={item.id} className={`flex flex-col gap-4 rounded-3xl border border-zinc-700 bg-zinc-900 p-4 sm:flex-row sm:items-center ${isDone ? 'opacity-70' : ''}`}>
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-900">
        <Image src={item.image || fallbackImage} alt={item.title} fill sizes="112px" className="object-cover" /></div>
        <div className="min-w-0 flex-1">
          <h3 className={`truncate font-black ${isDone ? 'text-[#ccff00] line-through' : 'text-white'}`}>{item.title}</h3>
          <p className="mt-1 text-sm text-zinc-400">{item.focus}</p>
        <div className="mt-3 flex flex-nowrap items-center gap-x-3 overflow-x-auto whitespace-nowrap text-xs text-zinc-500  px-3 py-2 rounded-lg">
          <span className="inline-flex items-center gap-1"><StatIcon type="clock" />{item.duration}</span>
          <span className="inline-flex items-center gap-1"><StatIcon type="flame" />{item.calories}</span>
          <span className="inline-flex items-center gap-1"><StatIcon type="rating" />{item.rating}</span>
        </div></div>
        <div className="flex shrink-0 flex-wrap items-center gap-3 sm:ml-auto sm:justify-end">
          <Link href={`/workout/${item.id}`} className="rounded-lg border border-zinc-700 px-3 py-2 text-xs font-bold text-[#ccff00] hover:border-[#ccff00] hover:text-[#ccff00]">View Details</Link>
          {tab === 'plan' &&
            <button type="button" onClick={() => markAsDone(item.id)} className={`rounded-lg px-3 py-2 text-xs font-bold transition-colors ${isDone ? 'bg-[#ccff00]/15 text-[#ccff00]' : 'bg-zinc-800 text-white hover:bg-[#ccff00] hover:text-black'}`}>
              <span aria-hidden="true">✓</span> {isDone ? 'Completed' : 'Mark as done'}
            </button>
          }
          <button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.title}`} title="Remove workout" className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-700 text-lg leading-none text-zinc-400 transition-colors hover:border-red-500 hover:text-red-300">&times;</button>
        </div>
            </article>; })}
      </div>;
  }

  return (
    <section id="my-plan" className="mx-auto max-w-7xl bg-black py-10 sm:py-12" aria-labelledby="my-plan-heading">
      <div className="mb-8">
        <h2 id="my-plan-heading" className="text-4xl text-white font-bold ">MY PLAN</h2>
        <p className="font-black tracking-tight text-gray-400">Cap of five lifts for today. Finish them, then load more.</p>
      </div>
      <div className="mb-6 grid grid-cols-3 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900">{[['Exercises', items.length], ['Minutes', minutes], ['Calories', calories]].map(([label, value], index) => 
        <div key={label} className={`p-3 sm:p-4 ${index < 2 ? 'border-r border-zinc-800' : ''}`}>
            <p className="text-xs uppercase tracking-[0.15em] text-zinc-500">{label}</p>
            <p className="mt-2 text-2xl font-black text-white">{value}</p>
        </div>)}
      </div>
      <div className="mb-6">
        <label htmlFor="my-plan-search" className="sr-only">Search workouts or tags</label>
        <input id="my-plan-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search workouts or tags" className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-500 focus:border-[#ccff00]" />
      </div>
      <div className="mb-6 flex flex-col gap-4 border-b border-zinc-800 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex w-fit rounded-xl border border-zinc-700 bg-zinc-900 p-1">
          <button type="button" onClick={() => setTab('plan')} className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${tab === 'plan' ? 'bg-[#ccff00] text-black' : 'text-zinc-400 hover:text-white'}`}>Today&apos;s Plan</button>
          <button type="button" onClick={() => setTab('saved')} className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${tab === 'saved' ? 'bg-[#ccff00] text-black' : 'text-zinc-400 hover:text-white'}`}>Saved</button>
        </div>
        <label className="flex w-fit items-center gap-2 text-sm font-bold text-zinc-400">
          <span>Sort By</span>
          <select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)} className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-white outline-none focus:border-[#ccff00]">
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>
      {planContent}
      {notice && <output className="fixed bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded-xl border border-[#ccff00]/40 bg-zinc-900 px-4 py-3 text-sm font-semibold text-[#ccff00] shadow-xl"><svg aria-hidden="true" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></svg><span>{notice}</span></output>}
    </section>
  );
};

export default MyPlan;
