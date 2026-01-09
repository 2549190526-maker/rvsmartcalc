import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 md:py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2024</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using RVSmartCalc, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Financial Disclaimer (Important)</h2>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-700 dark:text-yellow-400">
              <p className="font-semibold">
                The calculators and content provided on this website are for informational and educational purposes only.
              </p>
              <p className="mt-2 text-sm">
                They do not constitute financial advice. While we strive for accuracy, actual costs, loan rates, and terms will vary. You should consult with a qualified financial advisor or loan officer before making any major financial decisions. We are not responsible for any financial losses or damages resulting from the use of our tools.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The content, layout, design, data, databases and graphics on this website are protected by United States and other international intellectual property laws and are owned by RVSmartCalc.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall RVSmartCalc be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}