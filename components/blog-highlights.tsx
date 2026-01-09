import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export function BlogHighlights() {
  const highlights = [
    {
      title: "Understanding RV Depreciation: A 5-Year Analysis",
      excerpt: "Comprehensive breakdown of how different RV classes depreciate over time, with data-driven insights for maximizing resale value.",
      // 👇 这里指向你刚上传的图片
      image: "/images/blog/financing.jpg", 
      link: "/blog/rv-financing-guide-2026"
    },
    {
      title: "Hidden Costs of RV Ownership: What Dealers Won't Tell You",
      excerpt: "From maintenance schedules to insurance premiums, discover the true expenses that impact your bottom line.",
      // 👇 这里指向你刚上传的图片
      image: "/images/blog/hidden-costs.jpg",
      link: "/blog/hidden-costs-2026"
    },
    {
      title: "Financing Strategies for Luxury RV Purchases",
      excerpt: "Expert insights on leveraging low-interest rates, optimal loan terms, and tax advantages for high-end recreational vehicles.",
      // 👇 这里指向你刚上传的图片 (既然是豪华房车，我们用 towing 或 financing 的图都可以，这里暂时复用一张，或者你可以再找一张 luxury.jpg)
      image: "/images/blog/towing.jpg", 
      link: "/blog/rv-financing-guide-2026"
    }
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Expert Insights</h2>
          <p className="text-muted-foreground">Latest guides and analysis for smart RV ownership.</p>
        </div>
        <Link href="/blog">
          <Button variant="outline" className="hidden md:flex">
            View All Articles <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {highlights.map((item, index) => (
          <Link href={item.link} key={index} className="group">
            <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-none shadow-sm">
              {/* 图片区域 */}
              <div className="relative h-48 w-full bg-muted">
                 {/* 使用标准的 img 标签以确保兼容性 */}
                 <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                 />
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                  {item.excerpt}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  Read Article <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link href="/blog">
          <Button variant="outline" className="w-full">
            View All Articles
          </Button>
        </Link>
      </div>
    </section>
  )
}