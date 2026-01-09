import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import AdventureCostCalculator from "@/components/adventure-cost-calculator" // 引用刚才那个组件
import { InsightsSection } from "@/components/insights-section"

export default function Page() {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      {/* 1. 导航栏 */}
      <Navbar />

      {/* 2. 主体区域 (pt-24 防止被导航栏遮挡) */}
      <main className="container mx-auto px-4 py-8 pt-24">
        
        {/* 标题区 */}
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-primary">
            Adventure Cost Optimizer
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the true ROI of the RV lifestyle. See how "Smart Ownership" beats traditional vacations.
          </p>
          
          {/* 顶部广告位 (默认隐藏) */}
          {/* <div id="ad-banner-top" className="hidden w-full h-24 bg-muted/50 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
            Ad Space (Top Banner)
          </div>*/}
        </div>

        {/* 3. 核心计算器 */}
        <div className="mb-16">
          <AdventureCostCalculator />
        </div>

        {/* 4. 博客推荐 */}
        <div className="mb-16">
          <InsightsSection />
        </div>
      </main>

      {/* 5. 页脚 */}
      <Footer />
    </div>
  )
}