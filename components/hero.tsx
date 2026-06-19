"use client"

import { FlightSearchForm } from "@/components/flight-search-form"
import type { SearchParams } from "@/lib/flights"

export function Hero({ onSearch }: { onSearch: (params: SearchParams) => void }) {
  return (
    <section id="search" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="/hero-aircraft.png"
          alt="View of an airliner wing above the clouds at golden hour"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/55 to-primary/85" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pb-10 pt-32 md:px-6 md:pb-16 md:pt-44">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent">Aurelia Air</p>
          <h1 className="mt-3 text-balance font-serif text-4xl font-semibold leading-tight text-primary-foreground md:text-6xl">
            The world, in exceptional comfort
          </h1>
          <p className="mt-4 max-w-lg text-pretty text-base leading-relaxed text-primary-foreground/80 md:text-lg">
            Fly to over 120 destinations with award-winning cabins, lie-flat suites, and seamless booking.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <FlightSearchForm onSearch={onSearch} />
        </div>
      </div>
    </section>
  )
}
