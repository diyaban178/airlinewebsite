import { Armchair, Sparkles, Wine, Wifi } from "lucide-react"

const features = [
  {
    icon: Armchair,
    title: "Lie-flat suites",
    description: "Fully flat beds with privacy doors and premium bedding in Business and First.",
  },
  {
    icon: Wine,
    title: "Chef-curated dining",
    description: "Seasonal menus crafted by award-winning chefs, paired with fine wines.",
  },
  {
    icon: Wifi,
    title: "High-speed Wi-Fi",
    description: "Stay connected gate to gate with complimentary streaming-quality internet.",
  },
  {
    icon: Sparkles,
    title: "Aurelia Club",
    description: "Earn miles on every journey and unlock lounges in 60+ cities worldwide.",
  },
]

export function Experience() {
  return (
    <section id="experience" className="border-y border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent-foreground/70">The experience</p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Comfort that travels with you
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            From the moment you board, every detail is designed around your comfort. Discover what sets the
            Aurelia experience apart.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-background p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
