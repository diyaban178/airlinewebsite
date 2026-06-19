"use client"

import { useMemo, useState } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FlightSearchForm } from "@/components/flight-search-form"
import { FlightCard } from "@/components/flight-card"
import {
  CABIN_LABELS,
  type Flight,
  type SearchParams,
  formatDate,
  getAirport,
  priceFor,
  searchFlights,
} from "@/lib/flights"

type SortKey = "best" | "price" | "duration" | "departure"

type Props = {
  params: SearchParams
  onSearch: (params: SearchParams) => void
  onSelect: (flight: Flight) => void
  onBack: () => void
}

export function FlightResults({ params, onSearch, onSelect, onBack }: Props) {
  const [sort, setSort] = useState<SortKey>("best")
  const flights = useMemo(() => searchFlights(params), [params])
  const from = getAirport(params.from)
  const to = getAirport(params.to)

  const sorted = useMemo(() => {
    const list = [...flights]
    switch (sort) {
      case "price":
        return list.sort((a, b) => priceFor(a, params.cabin, 1) - priceFor(b, params.cabin, 1))
      case "duration":
        return list.sort((a, b) => a.durationMinutes - b.durationMinutes)
      case "departure":
        return list.sort((a, b) => new Date(a.departTime).getTime() - new Date(b.departTime).getTime())
      default:
        return list.sort(
          (a, b) =>
            priceFor(a, params.cabin, 1) + a.durationMinutes * 0.5 -
            (priceFor(b, params.cabin, 1) + b.durationMinutes * 0.5),
        )
    }
  }, [flights, sort, params.cabin])

  const sortOptions: { key: SortKey; label: string }[] = [
    { key: "best", label: "Best" },
    { key: "price", label: "Cheapest" },
    { key: "duration", label: "Fastest" },
    { key: "departure", label: "Earliest" },
  ]

  return (
    <div className="bg-secondary/40">
      <div className="border-b border-border bg-primary">
        <div className="mx-auto max-w-6xl px-4 pb-6 pt-24 md:px-6 md:pt-28">
          <button
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-primary-foreground/80 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </button>
          <FlightSearchForm onSearch={onSearch} initial={params} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">
              {from?.city} to {to?.city}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDate(params.date)} {"\u00B7"} {params.passengers}{" "}
              {params.passengers === 1 ? "passenger" : "passengers"} {"\u00B7"} {CABIN_LABELS[params.cabin]}{" "}
              {"\u00B7"} {sorted.length} flights
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
            {sortOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSort(opt.key)}
                className={
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors " +
                  (sort === opt.key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:text-foreground")
                }
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {sorted.length === 0 ? (
            <div className="rounded-xl border border-border bg-card p-10 text-center">
              <p className="text-foreground">No flights found for this route.</p>
              <p className="mt-1 text-sm text-muted-foreground">Try a different origin or destination.</p>
              <Button onClick={onBack} className="mt-4">Back to search</Button>
            </div>
          ) : (
            sorted.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                cabin={params.cabin}
                passengers={params.passengers}
                onSelect={onSelect}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
