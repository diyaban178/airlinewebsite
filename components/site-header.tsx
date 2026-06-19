"use client"

import { Plane } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-6">
        <a href="/" className="flex items-center gap-2 text-primary-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
            <Plane className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight">Aurelia Air</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-primary-foreground/90 md:flex">
          <a href="#search" className="transition-colors hover:text-accent">
            Book
          </a>
          <a href="#destinations" className="transition-colors hover:text-accent">
            Destinations
          </a>
          <a href="#experience" className="transition-colors hover:text-accent">
            Experience
          </a>
        </nav>

        <Button
          variant="outline"
          className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          Sign in
        </Button>
      </div>
    </header>
  )
}
