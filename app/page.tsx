import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CalculatorMatrix } from "@/components/calculator-matrix"
import { BlogHighlights } from "@/components/blog-highlights"
import { RecentReviews } from "@/components/recent-reviews"
import { FAQSection } from "@/components/faq-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* 👇 1. 新的 Hero Section (直接包含背景图逻辑) */}
        <section 
          className="relative border-b bg-muted/30 min-h-[500px] flex items-center bg-cover bg-center bg-no-repeat"
          style={{ 
            // 确保你的图片已经在 public/images/hero-bg.jpg
            backgroundImage: "url('/images/hero-bg.jpg')" 
          }}
        >
          {/* 黑色遮罩层 (让文字更清晰) */}
          <div className="absolute inset-0 bg-black/60"></div>

          <div className="container relative z-10 mx-auto px-4 py-20 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Master Your RV Finances
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10">
              Stop guessing. Use our professional calculators to determine affordability, loan payments, and true cost of ownership.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/#calculators">
                <Button size="lg" className="w-full sm:w-auto bg-[#d4af37] hover:bg-[#b8962e] text-white border-none text-lg px-8 h-12">
                  Try Calculators
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-white text-white hover:bg-white hover:text-black text-lg px-8 h-12">
                  Read Guides
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* 👇 2. 计算器矩阵 (带有 ID 方便跳转) */}
        <div id="calculators" className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Financial Tools</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Everything you need to plan your purchase and manage ownership costs.
              </p>
            </div>
            <CalculatorMatrix />
          </div>
        </div>

        {/* 👇 3. 博客精选 */}
        <div className="py-16 bg-muted/30">
          <BlogHighlights />
        </div>

        {/* 👇 4. 评论与 FAQ */}
        <RecentReviews />
        <FAQSection />
      </main>

      <Footer />
    </div>
  )
}