import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What Are RV Loans?",
    answer:
      "RV loans are specialized financing options designed for purchasing recreational vehicles, including motorhomes, travel trailers, and fifth wheels. These secured loans use the RV itself as collateral, typically offering terms from 10 to 20 years depending on the vehicle's value and your creditworthiness. Interest rates are generally higher than traditional auto loans but lower than unsecured personal loans.",
  },
  {
    question: "How Do RV Loans Work?",
    answer:
      "RV loans function similarly to auto loans. You borrow a lump sum to purchase the vehicle and repay it over time with interest. Lenders typically require a down payment of 10-20% of the purchase price. The loan is secured by the RV, meaning the lender can repossess it if you default. Monthly payments are calculated based on the loan amount, interest rate, and term length.",
  },
  {
    question: "Can I Get RV Financing With Bad Credit?",
    answer:
      "Yes, but expect higher interest rates and stricter terms. Lenders may require a larger down payment (20-30%) and limit loan terms to reduce their risk. Credit unions and specialized RV lenders are often more flexible than traditional banks. Consider improving your credit score before applying, or explore co-signer options to secure better rates.",
  },
  {
    question: "What Are Typical Costs of RV Ownership?",
    answer:
      "Beyond the purchase price, budget for insurance ($1,000-$4,000/year), maintenance and repairs ($500-$2,000/year), storage fees ($50-$450/month if not storing at home), fuel costs (varies by usage), campground fees ($30-$100/night), and registration/licensing. Don't forget depreciation—RVs typically lose 20-30% of their value in the first year.",
  },
  {
    question: "Standard Credit Score Ranges for RV Loans",
    answer:
      "Excellent (750+): Qualify for the best rates, typically 5-7% APR. Good (700-749): Competitive rates around 7-9% APR. Fair (650-699): Higher rates of 9-12% APR with larger down payments. Poor (below 650): Limited options with rates exceeding 12% APR, may require co-signers. Some specialized lenders work with scores as low as 550, but expect significantly higher costs.",
  },
]

export function FAQSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            Everything you need to know about RV financing and ownership costs.
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg font-semibold text-foreground hover:text-accent transition-colors py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
