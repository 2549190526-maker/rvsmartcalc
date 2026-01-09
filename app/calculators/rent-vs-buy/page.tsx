import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import RentVsBuyCalculator from "@/components/rent-vs-buy-calculator"
import { InsightsSection } from "@/components/insights-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* 1. 顶部导航栏 */}
      <Navbar />

      <main className="container mx-auto px-4 py-8 pt-24">
        {/* 2. 页面标题区域 */}
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-primary">
            Rent vs. Buy Calculator
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the honest math behind RV ownership. Find your break-even point and decide what's right for your lifestyle.
          </p>
          
          {/* 预留广告位 (默认隐藏) */}
          <div id="ad-banner-top" className="hidden w-full h-24 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            Ad Space (Top Banner)
          </div>
        </div>

        {/* 3. 核心计算器组件 */}
        <div className="mb-16">
          <RentVsBuyCalculator />
        </div>

        {/* 4. 博客推荐/洞察区域 (复用之前的组件) */}
        <div className="mb-16">
          <InsightsSection />
        </div>
      </main>

      {/* 5. 底部页脚 */}
      <Footer />
    </div>
  )
}