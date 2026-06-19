"use client"

import { useState } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/hero"
import { Destinations } from "@/components/destinations"
import { Experience } from "@/components/experience"
import { FlightResults } from "@/components/flight-results"
import { BookingFlow } from "@/components/booking-flow"
import type { Flight, SearchParams } from "@/lib/flights"

type View = "home" | "results" | "booking"

export default function Page() {
  const [view, setView] = useState<View>("home")
  const [params, setParams] = useState<SearchParams | null>(null)
  const [selected, setSelected] = useState<Flight | null>(null)

  function handleSearch(next: SearchParams) {
    setParams(next)
    setView("results")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handlePickDestination(code: string) {
    handleSearch({ from: "JFK", to: code, date: defaultDate(), passengers: 1, cabin: "economy" })
  }

  function handleSelect(flight: Flight) {
    setSelected(flight)
    setView("booking")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function reset() {
    setView("home")
    setSelected(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {view === "home" && (
          <>
            <Hero onSearch={handleSearch} />
            <Destinations onPick={handlePickDestination} />
            <Experience />
          </>
        )}

        {view === "results" && params && (
          <FlightResults
            params={params}
            onSearch={handleSearch}
            onSelect={handleSelect}
            onBack={reset}
          />
        )}

        {view === "booking" && selected && params && (
          <BookingFlow
            flight={selected}
            cabin={params.cabin}
            passengers={params.passengers}
            onBack={() => setView("results")}
            onDone={reset}
          />
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

function defaultDate(): string {
  const d = new Date()
  d.setDate(d.getDate() + 14)
  return d.toISOString().slice(0, 10)
}
