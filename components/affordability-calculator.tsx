"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, DollarSign, Award } from "lucide-react"

type CreditScore = "excellent" | "good" | "fair" | "poor"

interface CreditTier {
  label: string
  rate: number
  badge: string
}

const creditTiers: Record<CreditScore, CreditTier> = {
  excellent: { label: "Excellent (760+)", rate: 6.0, badge: "Best Rate Unlocked!" },
  good: { label: "Good (700-759)", rate: 7.5, badge: "Great Rate" },
  fair: { label: "Fair (640-699)", rate: 10.0, badge: "Fair Rate" },
  poor: { label: "Poor (<640)", rate: 13.5, badge: "Higher Rate" },
}

export default function AffordabilityCalculator() {
  const [monthlyPayment, setMonthlyPayment] = useState(1500)
  const [downPayment, setDownPayment] = useState(10000)
  const [tradeInValue, setTradeInValue] = useState(5000)
  const [creditScore, setCreditScore] = useState<CreditScore>("excellent")
  const [loanTerm, setLoanTerm] = useState(15)

  // Calculate total affordability using Present Value formula
  const calculations = useMemo(() => {
    const rate = creditTiers[creditScore].rate / 100 / 12 // Monthly rate
    const months = loanTerm * 12

    // Present Value formula: PV = PMT × [(1 - (1 + r)^-n) / r]
    const presentValue = monthlyPayment * ((1 - Math.pow(1 + rate, -months)) / rate)

    const totalAffordability = presentValue + downPayment + tradeInValue
    const bankMoney = presentValue
    const yourMoney = downPayment + tradeInValue
    const percentageYourMoney = (yourMoney / totalAffordability) * 100

    // Calculate potential increase if extending to 20 years
    const extendedMonths = 20 * 12
    const extendedPV = monthlyPayment * ((1 - Math.pow(1 + rate, -extendedMonths)) / rate)
    const extendedTotal = extendedPV + downPayment + tradeInValue
    const potentialIncrease = extendedTotal - totalAffordability

    return {
      totalAffordability,
      bankMoney,
      yourMoney,
      percentageYourMoney,
      potentialIncrease: loanTerm < 20 ? potentialIncrease : 0,
    }
  }, [monthlyPayment, downPayment, tradeInValue, creditScore, loanTerm])

  return (
    <div className="overflow-x-hidden w-full max-w-[100vw]">
      <div className="container mx-auto px-4 py-8 md:py-16 max-w-7xl">
        <div id="ad-banner-top" className="hidden mb-6 h-24 bg-muted rounded-lg" />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 text-balance">RVSmartCalc</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Reverse Engineering Your Dream: Discover the RV you can truly afford
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Input "Safe Space" */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">Your Budget Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Payment */}
              <div className="space-y-3">
                <Label htmlFor="monthly-payment" className="text-base font-semibold">
                  What&apos;s your max monthly budget?
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="monthly-payment"
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                    className="pl-10 text-lg h-12"
                    min={0}
                  />
                </div>
              </div>

              {/* Cash Down Payment */}
              <div className="space-y-3">
                <Label htmlFor="down-payment" className="text-base font-semibold">
                  Cash Down
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="pl-10 text-lg h-12"
                    min={0}
                  />
                </div>
              </div>

              {/* Trade-in Value */}
              <div className="space-y-3">
                <Label htmlFor="trade-in" className="text-base font-semibold">
                  Trade-in Value
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="trade-in"
                    type="number"
                    value={tradeInValue}
                    onChange={(e) => setTradeInValue(Number(e.target.value))}
                    className="pl-10 text-lg h-12"
                    min={0}
                  />
                </div>
              </div>

              {/* Credit Score Selector */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Credit Score</Label>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(creditTiers) as CreditScore[]).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => setCreditScore(tier)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        creditScore === tier
                          ? "border-accent bg-accent/10 shadow-md"
                          : "border-border hover:border-accent/50"
                      }`}
                    >
                      <div className="font-semibold text-sm mb-1">{creditTiers[tier].label.split(" ")[0]}</div>
                      <div className="text-xs text-muted-foreground mb-2">{creditTiers[tier].rate}% APR</div>
                      {creditScore === tier && tier === "excellent" && (
                        <Badge className="bg-accent text-accent-foreground text-xs">
                          <Award className="h-3 w-3 mr-1" />
                          {creditTiers[tier].badge}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Term Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Loan Term</Label>
                  <span className="text-2xl font-bold text-accent">{loanTerm} years</span>
                </div>
                <Slider
                  value={[loanTerm]}
                  onValueChange={(value) => setLoanTerm(value[0])}
                  min={1}
                  max={20}
                  step={1}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 year</span>
                  <span>20 years</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: Results "Wow Moment" */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <Card className="border-2 border-accent bg-gradient-to-br from-card to-accent/5">
              <CardHeader>
                <CardTitle className="text-xl text-primary flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Your Buying Power
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Main Affordability Number */}
                <div className="text-center py-4">
                  <div className="text-6xl md:text-7xl font-bold text-accent mb-2">
                    ${calculations.totalAffordability.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-muted-foreground">Total RV Affordability</p>
                </div>

                {/* Visual Breakdown */}
                <div className="space-y-4">
                  <div className="h-8 w-full bg-muted rounded-full overflow-hidden flex">
                    <div
                      className="bg-primary flex items-center justify-center text-xs text-primary-foreground font-semibold transition-all duration-500"
                      style={{ width: `${100 - calculations.percentageYourMoney}%` }}
                    >
                      {100 - calculations.percentageYourMoney > 15 && "Bank"}
                    </div>
                    <div
                      className="bg-accent flex items-center justify-center text-xs text-accent-foreground font-semibold transition-all duration-500"
                      style={{ width: `${calculations.percentageYourMoney}%` }}
                    >
                      {calculations.percentageYourMoney > 15 && "You"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <div>
                        <div className="font-semibold">Bank Money</div>
                        <div className="text-muted-foreground">
                          ${calculations.bankMoney.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <div>
                        <div className="font-semibold">Your Money</div>
                        <div className="text-muted-foreground">
                          ${calculations.yourMoney.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upsell Tip */}
                {calculations.potentialIncrease > 0 && (
                  <div className="bg-accent/10 border-2 border-accent rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-sm mb-1">💡 Increase Your Budget</div>
                        <div className="text-sm text-muted-foreground">
                          Extend to 20 years to increase budget by ~$
                          {calculations.potentialIncrease.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                  View RVs Under $
                  {calculations.totalAffordability.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                </Button>
              </CardContent>
            </Card>

            <div id="ad-sidebar" className="hidden h-64 bg-muted rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
