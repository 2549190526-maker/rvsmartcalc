import Link from "next/link"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Shield, Calculator } from "lucide-react"

export function InsightsSection() {
  const insights = [
    {
      title: "Understanding RV Loan Terms",
      description:
        "Learn how different loan terms affect your monthly payments and total interest paid over the life of your RV loan.",
      image: "/rv-parked-scenic-location.jpg",
      icon: Calculator,
    },
    {
      title: "Maximizing Your Trade-In Value",
      description: "Discover strategies to get the best value for your current RV when trading in for a new model.",
      image: "/rv-dealership-modern.jpg",
      icon: TrendingUp,
    },
    {
      title: "RV Rental Income Strategies",
      description: "Explore how renting out your RV can offset loan payments and even generate passive income.",
      image: "/rv-rental-happy-customers.jpg",
      icon: Shield,
    },
  ]

  return (
    <section id="insights" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Financial Insights</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Expert guidance to help you make informed decisions about your RV financing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((insight, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img
                  src={insight.image || "/placeholder.svg"}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/10 text-secondary shrink-0">
                    <insight.icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-semibold text-foreground">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
              View All Articles
            </Button>
          </Link>
        </div>
        
      </div>
    </section>
  )
}
