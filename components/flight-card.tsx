"use client"

import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  type CabinClass,
  type Flight,
  formatDuration,
  formatTime,
  priceFor,
} from "@/lib/flights"

type Props = {
  flight: Flight
  cabin: CabinClass
  passengers: number
  onSelect: (flight: Flight) => void
}

export function FlightCard({ flight, cabin, passengers, onSelect }: Props) {
  const total = priceFor(flight, cabin, passengers)
  const perPerson = Math.round(total / passengers)

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-primary/10 text-primary">
              <Plane className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="font-medium text-foreground">{flight.airline}</span>
            <span>{flight.flightNumber}</span>
            <span className="hidden md:inline">{"\u00B7"}</span>
            <span className="hidden md:inline">{flight.aircraft}</span>
          </div>

          <div className="mt-3 flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-semibold tabular-nums">{formatTime(flight.departTime)}</div>
              <div className="text-sm text-muted-foreground">{flight.from.code}</div>
            </div>

            <div className="flex flex-1 flex-col items-center px-2">
              <span className="text-xs text-muted-foreground">{formatDuration(flight.durationMinutes)}</span>
              <div className="my-1 flex w-full items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
                <span className="h-px flex-1 bg-border" />
                <Plane className="h-3.5 w-3.5 rotate-90 text-muted-foreground" aria-hidden="true" />
                <span className="h-px flex-1 bg-border" />
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
              </div>
              <span className="text-xs text-muted-foreground">
                {flight.stops === 0 ? "Nonstop" : `1 stop \u00B7 ${flight.stopCity}`}
              </span>
            </div>

            <div className="text-center">
              <div className="text-2xl font-semibold tabular-nums">{formatTime(flight.arriveTime)}</div>
              <div className="text-sm text-muted-foreground">{flight.to.code}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-border pt-4 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="text-right">
            {flight.stops === 0 && (
              <Badge variant="secondary" className="mb-1 text-[10px]">Nonstop</Badge>
            )}
            <div className="text-2xl font-semibold tabular-nums text-foreground">${perPerson}</div>
            <div className="text-xs text-muted-foreground">per person</div>
          </div>
          <Button onClick={() => onSelect(flight)} className="whitespace-nowrap">
            Select
          </Button>
        </div>
      </div>
    </div>
  )
}
