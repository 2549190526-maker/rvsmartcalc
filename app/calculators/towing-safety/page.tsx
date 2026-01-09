import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import TowingCalculator from "@/components/towing-calculator" // 注意这里的文件名
import { InsightsSection } from "@/components/insights-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navbar />

      {/* pt-24 是为了防止被吸顶导航栏遮挡 */}
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-primary">
            Towing Safety Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Don't guess with your safety. Verify your Payload and Towing Capacity before you hit the road.
          </p>
          
          {/* 广告位 */}
          <div id="ad-banner-top" className="hidden w-full h-24 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            Ad Space (Top Banner)
          </div>
        </div>

        <div className="mb-16">
          <TowingCalculator />
        </div>

        <div className="mb-16">
          <InsightsSection />
        </div>
      </main>

      <Footer />
    </div>
  )
}