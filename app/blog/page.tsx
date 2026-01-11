import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, ChevronRight } from "lucide-react"
import { getAllArticles } from "@/lib/articles"
import SearchBar from "@/components/SearchBar"

// 1. 强制页面动态渲染，确保每次搜索都能即时过滤
export const dynamic = 'force-dynamic';

// 2. 将组件改为 async（异步），这是处理搜索参数的关键
export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>; // 在新版 Next.js 中这是一个 Promise
}) {
  // 3. 必须等待参数加载完成
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q?.toLowerCase() || "";
  
  const allArticles = getAllArticles();

  // 4. 执行过滤逻辑
  const filteredArticles = query
    ? allArticles.filter(article => 
        article.title.toLowerCase().includes(query) || 
        (article.excerpt && article.excerpt.toLowerCase().includes(query)) ||
        (article.category && article.category.toLowerCase().includes(query))
      )
    : allArticles;

  if (allArticles.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar /><div className="flex-1 flex items-center justify-center">No posts found.</div><Footer />
      </div>
    )
  }

  const featuredArticle = filteredArticles[0];
  const listArticles = filteredArticles.slice(1);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero & Search - 布局完全保持你要求的原始居中样式 */}
        <div className="bg-muted/30 border-b mb-8 md:mb-12">
          <div className="container mx-auto px-4 py-12 md:py-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-primary mb-4 font-serif">RV Lifestyle Insights</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
              Data-driven analysis, safety guides, and financial advice.
            </p>
            {/* 搜索栏组件 */}
            <SearchBar />
          </div>
        </div>

        <div className="container mx-auto px-4">
          {/* 搜索无结果提示 */}
          {query && filteredArticles.length === 0 && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold">No results found for "{query}"</h2>
              <Link href="/blog" className="text-blue-600 hover:underline mt-4 inline-block">Clear search and view all</Link>
            </div>
          )}

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12 block">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-[#d4af37] w-2 h-8 rounded-full inline-block"></span>
                {query ? `Top Result for "${query}"` : "Featured Story"}
              </h2>
              <Link href={`/blog/${featuredArticle.slug}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow border-none shadow-md group cursor-pointer">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="h-64 md:h-96 bg-slate-200 relative overflow-hidden">
                       <img src={featuredArticle.image} alt={featuredArticle.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      <Badge className="absolute top-4 left-4 bg-[#d4af37] text-white border-none">Featured</Badge>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center bg-card">
                      <div className="flex items-center gap-2 text-sm text-[#d4af37] font-semibold mb-3">
                        {featuredArticle.category} • {featuredArticle.date}
                      </div>
                      <h3 className="text-3xl font-bold mb-4 text-primary group-hover:text-blue-700 transition-colors">{featuredArticle.title}</h3>
                      <p className="text-muted-foreground text-lg mb-6 line-clamp-3">{featuredArticle.excerpt}</p>
                      <div className="flex items-center text-sm font-medium text-primary">Read Article <ChevronRight className="h-4 w-4 ml-1" /></div>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          )}

          {/* Article Grid */}
          {listArticles.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="bg-primary w-2 h-8 rounded-full inline-block md:hidden"></span>
                {query ? "Related Articles" : "Latest Articles"}
              </h2>
              <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
                {listArticles.map((article) => (
                  <Link key={article.slug} href={`/blog/${article.slug}`}>
                    <Card className="overflow-hidden hover:shadow-lg transition-shadow border h-full group cursor-pointer">
                      <div className="flex flex-row md:flex-col h-full">
                        <div className="w-32 h-32 md:w-full md:h-52 bg-slate-200 shrink-0 relative overflow-hidden">
                          <img src={article.image} alt={article.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <Badge className="hidden md:inline-flex absolute top-3 left-3 bg-white/90 text-primary border-none shadow-sm">{article.category}</Badge>
                        </div>
                        <div className="p-4 flex flex-col justify-between grow">
                          <div>
                            <div className="md:hidden text-xs font-bold text-[#d4af37] mb-1">{article.category}</div>
                            <h3 className="font-bold text-base md:text-xl mb-1 md:mb-2 text-primary leading-tight group-hover:text-blue-600">{article.title}</h3>
                            <p className="hidden md:block text-muted-foreground text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                          </div>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" /><span>{article.readTime}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground md:hidden" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}