import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 md:py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last Updated: March 15, 2024</p>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to RVSmartCalc ("we," "our," or "us"). We are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website use our calculators.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
              <li><strong>Usage Data:</strong> We may collect non-personal information about how you interact with our website (e.g., pages visited, time spent) to improve our user experience.</li>
              <li><strong>Calculator Data:</strong> Information you input into our calculators is processed locally on your device or temporarily on our servers to provide results. We do not permanently store your financial inputs.</li>
              <li><strong>Cookies:</strong> We use cookies to analyze website traffic and optimize your experience.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Affiliate Disclosure</h2>
            <p className="text-muted-foreground">
              RVSmartCalc participates in various affiliate marketing programs. This means we may get paid commissions on editorially chosen products purchased through our links to retailer sites. This comes at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement reasonable security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at: support@rvsmartcalc.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}