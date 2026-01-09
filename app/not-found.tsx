import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="bg-muted/30 p-6 rounded-full mb-6">
          <FileQuestion className="h-16 w-16 text-[#d4af37]" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-primary">Page Not Found</h1>
        <p className="text-muted-foreground text-lg max-w-md mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex gap-4">
          <Link href="/">
            <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8962e] text-white">
              Back to Home
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="lg" variant="outline">
              Read Our Blog
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  )
}