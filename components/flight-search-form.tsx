"use client"

import { useState } from "react"
import { ArrowLeftRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AIRPORTS, CABIN_LABELS, type CabinClass, type SearchParams } from "@/lib/flights"

type Props = {
  onSearch: (params: SearchParams) => void
  initial?: Partial<SearchParams>
  variant?: "hero" | "inline"
}

function todayPlus(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

export function FlightSearchForm({ onSearch, initial, variant = "hero" }: Props) {
  const [from, setFrom] = useState(initial?.from ?? "JFK")
  const [to, setTo] = useState(initial?.to ?? "HND")
  const [date, setDate] = useState(initial?.date ?? todayPlus(14))
  const [passengers, setPassengers] = useState(String(initial?.passengers ?? 1))
  const [cabin, setCabin] = useState<CabinClass>(initial?.cabin ?? "economy")
  const [error, setError] = useState<string | null>(null)

  function swap() {
    setFrom(to)
    setTo(from)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (from === to) {
      setError("Origin and destination must be different.")
      return
    }
    setError(null)
    onSearch({ from, to, date, passengers: Number(passengers), cabin })
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-border bg-card p-4 shadow-xl shadow-primary/5 md:p-5"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_1fr_1fr_auto] md:items-end">
        {/* From */}
        <div className="space-y-1.5">
          <Label htmlFor="from" className="text-xs font-medium text-muted-foreground">From</Label>
          <Select value={from} onValueChange={setFrom}>
            <SelectTrigger id="from" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AIRPORTS.map((a) => (
                <SelectItem key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Swap */}
        <div className="hidden pb-1 md:block">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={swap}
            aria-label="Swap origin and destination"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        {/* To */}
        <div className="space-y-1.5">
          <Label htmlFor="to" className="text-xs font-medium text-muted-foreground">To</Label>
          <Select value={to} onValueChange={setTo}>
            <SelectTrigger id="to" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AIRPORTS.map((a) => (
                <SelectItem key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-1.5">
          <Label htmlFor="date" className="text-xs font-medium text-muted-foreground">Departure</Label>
          <input
            id="date"
            type="date"
            value={date}
            min={todayPlus(0)}
            onChange={(e) => setDate(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Passengers */}
        <div className="space-y-1.5">
          <Label htmlFor="pax" className="text-xs font-medium text-muted-foreground">Passengers</Label>
          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger id="pax" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={String(n)}>
                  {n} {n === 1 ? "passenger" : "passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button type="submit" size="lg" className="h-9 gap-2 md:h-9">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground">Cabin:</span>
        {(Object.keys(CABIN_LABELS) as CabinClass[]).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCabin(c)}
            className={
              "rounded-full px-3 py-1 text-xs font-medium transition-colors " +
              (cabin === c
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted")
            }
          >
            {CABIN_LABELS[c]}
          </button>
        ))}
      </div>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </form>
  )
}
