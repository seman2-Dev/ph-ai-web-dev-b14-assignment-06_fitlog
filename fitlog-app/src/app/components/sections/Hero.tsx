import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const heroImg = '/assets/banner.png';

const Hero = () => {
    return (
      <section id="home" className="mb-8 grid items-center gap-8 rounded-3xl border border-zinc-800 bg-[#111111] px-5 py-8 shadow-sm sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-12">
        <div className="max-w-xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            <span className="block">TRAIN WITH INTENT. LOG</span>
            <span className="mt-2 block text-white">EVERY SET.</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
            and watch the week&apos;s work add up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#library"
              className="inline-flex items-center justify-center rounded-2xl bg-[#ccff00] px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-[#ccff00]">
              <span aria-hidden="true" className="mr-2 text-base">↘</span>
              <span>BROWSE WORKOUTS</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src={heroImg}
            alt="FitLog workout illustration"
            width={800}
            height={650}
            priority
            className="h-auto w-full max-w-xl object-contain"
          />
        </div>
      </section>
    );
};

export default Hero;