import React from "react";
import Hero from "./components/sections/Hero";
import Cards from "./components/stack/Cards";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Hero />
        <Cards />
      </div>
    </main>
  );
}
