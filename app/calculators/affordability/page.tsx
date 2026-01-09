import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import AffordabilityCalculator from "@/components/affordability-calculator"
import { InsightsSection } from "@/components/insights-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      {/* 这里是刚才加的 Navbar */}
      <Navbar />

      <main className="pt-24">
         <AffordabilityCalculator />
         <InsightsSection />
      </main>

      {/* 这里是刚才加的 Footer */}
      <Footer />
    </div>
  )
}
//export default function Page() {
  //return (
   // <div className="min-h-screen bg-background overflow-x-hidden w-full">
   //   <AffordabilityCalculator />
   //   <InsightsSection />
   // </div>
  //)
//}
