"use client"

import { ArrowUpRight } from "lucide-react"
import { DESTINATIONS } from "@/lib/flights"

export function Destinations({ onPick }: { onPick: (code: string) => void }) {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">Where to next</p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Popular destinations
          </h2>
        </div>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground sm:mt-0 sm:text-right">
          Round-trip fares from New York, including taxes. Select a city to start your search.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {DESTINATIONS.map((d) => (
          <button
            key={d.code}
            onClick={() => onPick(d.code)}
            className="group relative aspect-[3/4] overflow-hidden rounded-2xl text-left"
          >
            <img
              src={d.image || "/placeholder.svg"}
              alt={`${d.city}, ${d.country}`}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 text-primary-foreground">
              <div>
                <p className="text-xs uppercase tracking-wide text-primary-foreground/70">{d.country}</p>
                <h3 className="font-serif text-xl font-semibold">{d.city}</h3>
                <p className="mt-1 text-sm text-accent">from ${d.price}</p>
              </div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
