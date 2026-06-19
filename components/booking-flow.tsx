"use client"

import { useState } from "react"
import { ArrowLeft, CheckCircle2, Plane, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  CABIN_LABELS,
  type CabinClass,
  type Flight,
  formatDate,
  formatDuration,
  formatTime,
  priceFor,
} from "@/lib/flights"

type Props = {
  flight: Flight
  cabin: CabinClass
  passengers: number
  onBack: () => void
  onDone: () => void
}

export function BookingFlow({ flight, cabin, passengers, onBack, onDone }: Props) {
  const [confirmed, setConfirmed] = useState(false)
  const fare = priceFor(flight, cabin, passengers)
  const taxes = Math.round(fare * 0.12)
  const total = fare + taxes
  const reference = "AU" + Math.random().toString(36).slice(2, 8).toUpperCase()

  function submit(e: React.FormEvent) {
    e.preventDefault()
    setConfirmed(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
          <CheckCircle2 className="h-8 w-8 text-accent" />
        </span>
        <h1 className="mt-6 font-serif text-3xl font-semibold text-foreground">Booking confirmed</h1>
        <p className="mt-2 text-muted-foreground">
          Your trip to {flight.to.city} is booked. A confirmation has been sent to your email.
        </p>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Booking reference</span>
            <span className="font-mono text-lg font-semibold tracking-wider text-foreground">{reference}</span>
          </div>
          <Separator className="my-4" />
          <FlightSummaryRow flight={flight} cabin={cabin} passengers={passengers} />
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">Total paid</span>
            <span className="text-xl font-semibold tabular-nums text-foreground">${total}</span>
          </div>
        </div>

        <Button onClick={onDone} size="lg" className="mt-8">
          Book another flight
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 pt-24 md:px-6 md:pt-28">
      <button
        onClick={onBack}
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Back to results
      </button>

      <h1 className="font-serif text-3xl font-semibold text-foreground">Complete your booking</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={submit} className="space-y-8">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Passenger details</h2>
            <p className="mt-1 text-sm text-muted-foreground">Lead passenger for this booking</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field id="firstName" label="First name" placeholder="Jane" required />
              <Field id="lastName" label="Last name" placeholder="Doe" required />
              <Field id="email" label="Email" type="email" placeholder="jane@example.com" required />
              <Field id="phone" label="Phone" type="tel" placeholder="+1 555 000 0000" required />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Payment</h2>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-accent" /> Encrypted and secure
            </p>
            <div className="mt-5 grid gap-4">
              <Field id="card" label="Card number" placeholder="4242 4242 4242 4242" required inputMode="numeric" />
              <div className="grid grid-cols-2 gap-4">
                <Field id="expiry" label="Expiry" placeholder="MM / YY" required />
                <Field id="cvc" label="CVC" placeholder="123" required inputMode="numeric" />
              </div>
              <Field id="name" label="Name on card" placeholder="Jane Doe" required />
            </div>
          </section>

          <Button type="submit" size="lg" className="w-full">
            Pay ${total}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            This is a demo booking flow. No real payment is processed.
          </p>
        </form>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-base font-semibold text-foreground">Trip summary</h2>
            <Separator className="my-4" />
            <FlightSummaryRow flight={flight} cabin={cabin} passengers={passengers} />
            <Separator className="my-4" />
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Fare ({passengers} {passengers === 1 ? "traveler" : "travelers"})
                </dt>
                <dd className="tabular-nums">${fare}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Taxes & fees</dt>
                <dd className="tabular-nums">${taxes}</dd>
              </div>
            </dl>
            <Separator className="my-4" />
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">Total</span>
              <span className="text-xl font-semibold tabular-nums text-foreground">${total}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

function FlightSummaryRow({
  flight,
  cabin,
  passengers,
}: {
  flight: Flight
  cabin: CabinClass
  passengers: number
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Plane className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="font-medium text-foreground">{flight.airline}</span>
        <span>{flight.flightNumber}</span>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold tabular-nums">{formatTime(flight.departTime)}</div>
          <div className="text-xs text-muted-foreground">{flight.from.code}</div>
        </div>
        <div className="px-2 text-center text-xs text-muted-foreground">
          <div>{formatDuration(flight.durationMinutes)}</div>
          <div>{flight.stops === 0 ? "Nonstop" : "1 stop"}</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold tabular-nums">{formatTime(flight.arriveTime)}</div>
          <div className="text-xs text-muted-foreground">{flight.to.code}</div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        {formatDate(flight.departTime)} {"\u00B7"} {CABIN_LABELS[cabin]}
      </p>
    </div>
  )
}

function Field({
  id,
  label,
  ...props
}: { id: string; label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <Input id={id} {...props} />
    </div>
  )
}
