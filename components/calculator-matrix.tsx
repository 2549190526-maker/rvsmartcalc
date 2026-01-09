import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Calculator, Truck, DollarSign, Scale, Receipt } from "lucide-react"

const calculators = [
  {
    id: "rv-loan",
    title: "RV Loan Calculator",
    icon: Calculator,
    href: "/calculators/rv-loan",
  },
  {
    id: "towing",
    title: "Towing Calculator",
    icon: Truck,
    href: "/calculators/towing-safety",
  },
  {
    id: "affordability",
    title: "Affordability Calculator",
    icon: DollarSign,
    href: "/calculators/affordability",
  },
  {
    id: "rent-vs-buy",
    title: "Rent vs. Buy Analysis",
    icon: Scale,
    href: "/calculators/rent-vs-buy",
  },
  {
    id: "total-cost",
    title: "True Cost of Ownership",
    icon: Receipt,
    href: "/calculators/adventure-cost",
  },
]

export function CalculatorMatrix() {
  return (
    <section id="calculators" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => {
            const Icon = calc.icon
            return (
              <Link key={calc.id} href={calc.href}>
                <Card className="p-8 hover:shadow-lg hover:border-accent/50 transition-all duration-300 cursor-pointer group h-full">
                  <div className="flex flex-col items-center text-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-6 h-6 text-primary group-hover:text-accent transition-colors" />
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
                      {calc.title}
                    </h3>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors inline-flex items-center gap-1">
                      Start Calculation
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
