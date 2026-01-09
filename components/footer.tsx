import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 border-t border-border/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
            <div>
              <Link href="/" className="font-serif text-2xl font-bold hover:text-accent transition-colors">
                RVSmartCalc
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              <Link href="/privacy" className="text-sm hover:text-accent transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm hover:text-accent transition-colors">
                Terms of Service
              </Link>
              <Link href="/affiliate-disclosure" className="text-sm hover:text-accent transition-colors">
                Affiliate Disclosure
              </Link>
              <Link href="/contact" className="text-sm hover:text-accent transition-colors">
                Contact
              </Link>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/10">
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              <strong className="text-primary-foreground">Disclaimer:</strong> All calculations and projections provided
              by RVSmartCalc are estimates only and should not be considered financial advice. Actual costs, interest
              rates, and values will vary based on individual circumstances, market conditions, and location. We
              strongly recommend consulting with qualified financial, legal, and insurance professionals before making
              any RV purchase or financing decisions.
            </p>
            <p className="text-sm text-primary-foreground/50 mt-4">
              © {new Date().getFullYear()} RVSmartCalc. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
