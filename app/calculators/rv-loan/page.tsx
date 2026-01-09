import { Navbar } from "@/components/navbar"
import { Calculator } from "@/components/calculator"
import { InsightsSection } from "@/components/insights-section"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons";

export default function Home() {
  // true 表示显示广告，false 表示隐藏广告
const showAds = false;
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Ad Slot 1 - Top Banner */}
      <div className="container mx-auto px-4 sm:px-6 pt-20">
        <p className="text-xs text-muted-foreground text-center mb-1">Advertisement</p>
      </div>
      {showAds && (
      <div
        id="ad-banner-top"
        className="bg-gray-100 h-24 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 mx-4 sm:mx-6"
      >
        Ad Space (Top)
      </div>
      )}

      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 text-balance">
              RV Loan Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Calculate your RV financing with precision and clarity. Make informed decisions with our premium financial
              tool.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <ShareButtons title="RV Loan Calculator"/>
          </div>

          <Calculator />
        </div>

        <InsightsSection />
      </main>

      <Footer />
    </div>
  )
}

