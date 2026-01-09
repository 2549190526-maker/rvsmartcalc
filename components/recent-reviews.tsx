import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Star } from "lucide-react"

const reviews = [
  {
    id: 1,
    title: "2024 Airstream Classic: Timeless Design Meets Modern Engineering",
    excerpt:
      "After 6 months on the road, we analyze build quality, fuel efficiency, and long-term value retention of this iconic travel trailer.",
    rating: 4.5,
    author: "Michael Chen",
    href: "/reviews/airstream-classic-2024",
  },
  {
    id: 2,
    title: "Winnebago Revel 4x4: Is the Premium Worth It?",
    excerpt:
      "Class B excellence with off-road capability. Our comprehensive cost-benefit analysis reveals surprising insights.",
    rating: 4.8,
    author: "Sarah Martinez",
    href: "/reviews/winnebago-revel",
  },
  {
    id: 3,
    title: "Grand Design Reflection: Mid-Range Value Champion",
    excerpt: "Exceptional build quality at a competitive price point. We break down the numbers to help you decide.",
    rating: 4.3,
    author: "David Thompson",
    href: "/reviews/grand-design-reflection",
  },
  {
    id: 4,
    title: "Forest River FR3: Budget-Friendly Class A Analysis",
    excerpt: "Can you really get luxury RV features under $150k? Our detailed review examines the trade-offs.",
    rating: 4.0,
    author: "Jennifer Lee",
    href: "/reviews/forest-river-fr3",
  },
  {
    id: 5,
    title: "Lance 2465 Travel Trailer: Premium Construction Deep Dive",
    excerpt: "Industry-leading warranty and build quality under scrutiny. Is the premium pricing justified?",
    rating: 4.7,
    author: "Robert Anderson",
    href: "/reviews/lance-2465",
  },
]

export function RecentReviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">Independent Reviews</h2>
          <p className="text-muted-foreground mb-12 leading-relaxed">
            Unbiased analysis from our team of RV industry specialists.
          </p>

          <div className="space-y-6">
            {reviews.map((review) => (
              <Link key={review.id} href={review.href}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-32 flex items-center justify-center p-6 md:p-8 bg-secondary/50 flex-shrink-0">
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(review.rating)
                                  ? "fill-accent text-accent"
                                  : i < review.rating
                                    ? "fill-accent/50 text-accent"
                                    : "fill-none text-border"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-lg font-bold text-foreground">{review.rating}</span>
                      </div>
                    </div>
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors leading-snug">
                        {review.title}
                      </h3>
                      <p className="text-muted-foreground mb-3 leading-relaxed">{review.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">By {review.author}</span>
                        <span className="text-sm font-medium text-accent group-hover:text-accent/80 transition-colors inline-flex items-center gap-1">
                          Read Full Review
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
