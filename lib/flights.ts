export type Airport = {
  code: string
  city: string
  name: string
  country: string
}

export type CabinClass = "economy" | "premium" | "business" | "first"

export type Flight = {
  id: string
  airline: string
  flightNumber: string
  from: Airport
  to: Airport
  departTime: string // ISO
  arriveTime: string // ISO
  durationMinutes: number
  stops: number
  stopCity?: string
  aircraft: string
  basePrice: number // economy price in USD
}

export const AIRPORTS: Airport[] = [
  { code: "JFK", city: "New York", name: "John F. Kennedy Intl", country: "United States" },
  { code: "LHR", city: "London", name: "Heathrow", country: "United Kingdom" },
  { code: "CDG", city: "Paris", name: "Charles de Gaulle", country: "France" },
  { code: "DXB", city: "Dubai", name: "Dubai Intl", country: "UAE" },
  { code: "HND", city: "Tokyo", name: "Haneda", country: "Japan" },
  { code: "SIN", city: "Singapore", name: "Changi", country: "Singapore" },
  { code: "LAX", city: "Los Angeles", name: "Los Angeles Intl", country: "United States" },
  { code: "SFO", city: "San Francisco", name: "San Francisco Intl", country: "United States" },
  { code: "FCO", city: "Rome", name: "Fiumicino", country: "Italy" },
  { code: "SYD", city: "Sydney", name: "Kingsford Smith", country: "Australia" },
  { code: "HKG", city: "Hong Kong", name: "Hong Kong Intl", country: "Hong Kong" },
  { code: "FRA", city: "Frankfurt", name: "Frankfurt am Main", country: "Germany" },
]

export const CABIN_LABELS: Record<CabinClass, string> = {
  economy: "Economy",
  premium: "Premium Economy",
  business: "Business",
  first: "First",
}

export const CABIN_MULTIPLIER: Record<CabinClass, number> = {
  economy: 1,
  premium: 1.8,
  business: 3.4,
  first: 5.6,
}

const AIRLINES = [
  { name: "Aurelia Air", prefix: "AU" },
  { name: "Aurelia Air", prefix: "AU" },
  { name: "SkyPartner", prefix: "SP" },
]

const AIRCRAFT = ["Boeing 787-9", "Airbus A350-1000", "Airbus A380", "Boeing 777-300ER"]

export function getAirport(code: string): Airport | undefined {
  return AIRPORTS.find((a) => a.code === code)
}

// Deterministic pseudo-random so results are stable for a given route/date.
function seeded(seed: number) {
  let s = seed % 2147483647
  if (s <= 0) s += 2147483646
  return () => {
    s = (s * 16807) % 2147483647
    return (s - 1) / 2147483646
  }
}

function hashString(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i)
    h |= 0
  }
  return Math.abs(h)
}

export type SearchParams = {
  from: string
  to: string
  date: string // yyyy-mm-dd
  passengers: number
  cabin: CabinClass
}

export function searchFlights(params: SearchParams): Flight[] {
  const from = getAirport(params.from)
  const to = getAirport(params.to)
  if (!from || !to || from.code === to.code) return []

  const rand = seeded(hashString(`${params.from}-${params.to}-${params.date}`))
  // Base duration loosely tied to a code distance heuristic.
  const baseDuration = 180 + (hashString(from.code + to.code) % 720)
  const basePrice = 240 + (hashString(to.code + from.code) % 520)

  const count = 5 + Math.floor(rand() * 3)
  const flights: Flight[] = []

  for (let i = 0; i < count; i++) {
    const airline = AIRLINES[Math.floor(rand() * AIRLINES.length)]
    const departHour = 6 + Math.floor(rand() * 15)
    const departMin = Math.floor(rand() * 4) * 15
    const stops = rand() > 0.62 ? 1 : 0
    const duration = Math.round(baseDuration * (stops ? 1.35 : 1) + rand() * 90)

    const depart = new Date(`${params.date}T00:00:00`)
    depart.setHours(departHour, departMin, 0, 0)
    const arrive = new Date(depart.getTime() + duration * 60000)

    const priceJitter = 0.82 + rand() * 0.5
    const price = Math.round((basePrice * priceJitter) / 5) * 5

    const stopPool = AIRPORTS.filter((a) => a.code !== from.code && a.code !== to.code)
    const stopCity = stops ? stopPool[Math.floor(rand() * stopPool.length)].city : undefined

    flights.push({
      id: `${params.from}${params.to}${params.date}-${i}`,
      airline: airline.name,
      flightNumber: `${airline.prefix}${100 + Math.floor(rand() * 800)}`,
      from,
      to,
      departTime: depart.toISOString(),
      arriveTime: arrive.toISOString(),
      durationMinutes: duration,
      stops,
      stopCity,
      aircraft: AIRCRAFT[Math.floor(rand() * AIRCRAFT.length)],
      basePrice: price,
    })
  }

  return flights.sort((a, b) => new Date(a.departTime).getTime() - new Date(b.departTime).getTime())
}

export function priceFor(flight: Flight, cabin: CabinClass, passengers: number): number {
  return Math.round(flight.basePrice * CABIN_MULTIPLIER[cabin]) * passengers
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })
}

export function formatDuration(min: number): string {
  const h = Math.floor(min / 60)
  const m = min % 60
  return `${h}h ${m.toString().padStart(2, "0")}m`
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
}

export const DESTINATIONS = [
  { code: "HND", city: "Tokyo", country: "Japan", price: 689, image: "/dest-tokyo.png" },
  { code: "CDG", city: "Paris", country: "France", price: 459, image: "/dest-paris.png" },
  { code: "DXB", city: "Dubai", country: "UAE", price: 540, image: "/dest-dubai.png" },
  { code: "JFK", city: "New York", country: "United States", price: 399, image: "/dest-newyork.png" },
]
