import { Plane } from "lucide-react"

const columns = [
  { title: "Fly", links: ["Book a flight", "Manage booking", "Flight status", "Check-in"] },
  { title: "Experience", links: ["Cabins", "Lounges", "Dining", "Aurelia Club"] },
  { title: "Company", links: ["About us", "Careers", "Sustainability", "Press"] },
  { title: "Support", links: ["Help center", "Contact", "Baggage", "Accessibility"] },
]

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Plane className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-lg font-semibold">Aurelia Air</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Premium travel, reimagined. Fly to over 120 destinations worldwide.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-accent">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/60 md:flex-row md:items-center">
          <p>{`\u00A9 ${new Date().getFullYear()} Aurelia Air. All rights reserved.`}</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-primary-foreground">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary-foreground">Terms</a>
            <a href="#" className="transition-colors hover:text-primary-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
