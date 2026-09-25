"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import fallbackImage from '../../../../assets/banner.png';
import { API_URL, formatWorkout } from '../api';
import type { WorkoutCardData } from '../../../types/types';

const StatIcon = ({ type }: { type: string }) => {
    if (type === 'clock') {
        return <span aria-hidden="true" className="text-base">&#9716;</span>;
    }

    if (type === 'flame') {
        return <span aria-hidden="true" className="text-base">&#9832;</span>;
    }

    return <span aria-hidden="true" className="text-base text-amber-400">&#9733;</span>;
};

const Cards = () => {
    const [workouts, setWorkouts] = useState<WorkoutCardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error('Failed to fetch workouts');
                }

                const data = await response.json();
                setWorkouts(Array.isArray(data) ? data.map(formatWorkout) : []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Something went wrong');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    return (
        <section id="library" className="mx-auto max-w-7xl py-8 sm:py-10 lg:py-12" aria-labelledby="workout-heading">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <h2 className="mb-3 sm:text-3xl font-bold uppercase tracking-[0.25em] text-[#ccff00]">THE LIBRARY</h2>
                    <p id="workout-heading" className="max-w-xl font-black tracking-tight text-white">
                        Twelve lifts covering every major muscle group.
                    </p>
                </div>
            </div>

            {loading && (
                <div className="rounded-3xl border border-zinc-700 bg-black p-8 text-center text-zinc-400">
                    <span className="inline-flex items-center gap-2"><span className="h-2 w-2 animate-pulse rounded-full bg-[#ccff00]" />Loading workouts...</span>
                </div>
            )}

            {!loading && error && (
                <div className="rounded-3xl border border-red-800 bg-red-950/40 p-8 text-center text-red-300">
                    {error}
                </div>
            )}

            {!loading && !error && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {workouts.map((workout) => (
                        <Link href={`/workout/${workout.id}`} key={workout.id} className="group block overflow-hidden rounded-3xl border border-zinc-700 bg-zinc-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]">
                            <div className="relative h-56 overflow-hidden border-b border-[#ccff00] bg-zinc-800">
                                <Image
                                    src={workout.image || fallbackImage}
                                    alt={`${workout.title} exercise illustration`}
                                    fill
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-transparent" />
                            </div>

                            <div className="p-5">
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {workout.categories.map((category) => (
                                        <span key={`${workout.id}-${category}`} className="rounded-full bg-[#ccff00] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black shadow-sm">
                                            {category}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-black tracking-tight text-white">{workout.title}</h3>
                                <p className="mb-2 text-sm font-medium text-zinc-400">{workout.focus}</p>

                                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-zinc-400">
                                    <span className="flex items-center gap-1.5"><StatIcon type="clock" />{workout.duration}</span>
                                    <span className="flex items-center gap-1.5"><StatIcon type="flame" />{workout.calories}</span>
                                    <span className="flex items-center gap-1.5"><StatIcon type="star" />{workout.rating}</span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default Cards;
