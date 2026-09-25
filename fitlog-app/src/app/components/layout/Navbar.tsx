"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../../assets/logo.png';

const readCount = (key: string) => {
    try {
        return JSON.parse(localStorage.getItem(key) || '[]').length;
    } catch {
        return 0;
    }
};

const Navbar = () => {
    const pathname = usePathname();
    const [planCount, setPlanCount] = useState(0);
    const [savedCount, setSavedCount] = useState(0);

    useEffect(() => {
        const updateCounts = () => {
            setPlanCount(readCount('fitlog-plan'));
            setSavedCount(readCount('fitlog-saved'));
        };

        updateCounts();
        window.addEventListener('storage', updateCounts);
        window.addEventListener('fitlog-storage', updateCounts);
        return () => {
            window.removeEventListener('storage', updateCounts);
            window.removeEventListener('fitlog-storage', updateCounts);
        };
    }, []);

    const tabLinkClass = (isActive: boolean) =>
        `rounded-full px-3 py-2 text-sm font-semibold transition-all duration-200 ${
            isActive
                ? 'bg-zinc-800 text-[#ccff00] shadow-[0_0_0_1px_rgba(204,255,0,0.4),0_8px_18px_rgba(204,255,0,0.16)]'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-[#ccff00] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_6px_14px_rgba(0,0,0,0.25)]'
        } focus-visible:outline-2 focus-visible:outline-[#ccff00]`;

    return (
        <nav className="border-b border-zinc-800 bg-black" aria-label="Primary navigation">
            <div className="container mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2 sm:gap-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex shrink-0 items-center gap-2 text-white" aria-label="Fitlog home">
                    <Image src={Logo} alt="Fitlog" width={30} height={30} priority className="rotate-80" />
                    <span className="text-2xl font-bold sm:text-3xl">FITLOG</span>
                </Link>

                <div className="order-3 flex w-full justify-center gap-3 text-xs font-semibold sm:order-0 sm:w-auto sm:gap-4 sm:text-sm">
                    <Link href="/#library" className={tabLinkClass(pathname !== '/my-plan')}>Workout</Link>
                    <Link href="/my-plan" className={tabLinkClass(pathname === '/my-plan')}>My Plan</Link>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold sm:gap-3 sm:text-sm">
                    <Link href="/my-plan" className="rounded-full  px-3 py-2 text-white transition-colors hover:bg-gray-400" aria-label={`${planCount} workouts in plan`}>
                        Plan <span className="ml-1 inline-flex min-w-6 justify-center rounded-full bg-[#ccff00] px-1.5 py-0.5 text-black">{planCount}</span>
                    </Link>
                    <Link href="/my-plan" className="rounded-full px-3 py-2 text-zinc-200 transition-colors hover:text-[#ccff00]" aria-label={`${savedCount} saved workouts`}>
                        Saved <span className="ml-1 inline-flex min-w-6 justify-center rounded-full border border-zinc-500 px-1.5 py-0.5">{savedCount}</span>
                    </Link>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;
