import remarkGfm from "remark-gfm"
import ReactMarkdown from "react-markdown"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/articles"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShareButtons } from "@/components/share-buttons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator, ChevronRight, User, Calendar, Clock } from "lucide-react"

// 👇 1. 修改类型定义：params 变成了 Promise
type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  // 👇 2. 关键修复：必须先 await 等待参数解析，才能拿到 slug
  const { slug } = await params
  
  // 3. 获取文章数据
  const post = getArticleBySlug(slug)

  // 如果找不到文章，跳到 404
  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-muted/30 border-b">
          <div className="container mx-auto px-4 py-12 max-w-4xl">
             {/* 面包屑导航 */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
               <Link href="/blog" className="hover:text-primary">Blog</Link>
               <ChevronRight className="h-4 w-4" />
               <span className="text-primary font-medium">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-balance text-primary leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden">
                   <User className="h-4 w-4" />
                </div>
                <span className="font-medium text-primary">{post.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" /> {post.date}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" /> {post.readTime}
              </div>
            </div>

            <ShareButtons title={post.title} />
          </div>
        </div>
        {/* 顶部横幅广告位 (Top Banner) - 以后要用就解开注释 */}
        {/* <div className="container mx-auto px-4 mb-8">
          <div className="bg-gray-100 h-24 rounded-lg flex items-center justify-center border border-dashed border-gray-300">
            <span className="text-muted-foreground text-sm">Top Banner Ad Space</span>
          </div>
        </div> 
        */}

        <div className="container mx-auto px-4 py-12 max-w-6xl grid md:grid-cols-12 gap-12">
          {/* Main Content (Left) */}
          <article className="md:col-span-8 prose prose-lg dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.content}
            </ReactMarkdown>

            
            {/* CTA 卡片 */}
            <div className="not-prose my-12 p-8 bg-muted/50 rounded-2xl border border-dashed text-center">
               <h3 className="text-2xl font-bold mb-2">Planning your RV purchase?</h3>
               <p className="text-muted-foreground mb-6">Don't guess the numbers. Use our free calculators to see what fits your budget.</p>
               <Link href="/calculators/affordability">
                 <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8962e] text-white">Check Affordability</Button>
               </Link>
            </div>
          </article>

          {/* Sidebar (Right) */}
          <aside className="md:col-span-4 space-y-8">
            <div className="sticky top-24 space-y-8">
              {/* Tool Widget */}
              <Card className="bg-[#0f172a] text-white border-none overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-[#d4af37]" />
                    RV Loan Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-6">Calculate your monthly payments and see how different loan terms affect your total cost.</p>
                  <Link href="/calculators/rv-loan" className="w-full">
                    <Button className="w-full bg-[#d4af37] hover:bg-[#b8962e] text-white">Try Calculator</Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Advertisement Placeholder */}
              {/*<div className="bg-muted p-4 rounded-xl h-[400px] flex items-center justify-center text-muted-foreground text-sm border border-dashed">
                Ad Space (Vertical)
              </div> */}
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}