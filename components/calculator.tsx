"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { DollarSign, TrendingDown } from "lucide-react"
import { LoanChart } from "@/components/loan-chart"

export function Calculator() {
  const [vehiclePrice, setVehiclePrice] = useState(85000)
  const [tradeInValue, setTradeInValue] = useState(0)
  const [downPayment, setDownPayment] = useState(10000)
  const [downPaymentType, setDownPaymentType] = useState<"dollar" | "percent">("dollar")
  const [interestRate, setInterestRate] = useState(7.5)
  const [loanTerm, setLoanTerm] = useState(15)
  const [rentToOwn, setRentToOwn] = useState(false)
  const [rentalIncome, setRentalIncome] = useState(400)
  const [email, setEmail] = useState("")

  const calculateLoan = () => {
    const principal =
      vehiclePrice - tradeInValue - (downPaymentType === "dollar" ? downPayment : (vehiclePrice * downPayment) / 100)
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)

    return {
      monthlyPayment: monthlyPayment,
      grossPayment: monthlyPayment,
      netPayment: rentToOwn ? monthlyPayment - rentalIncome : monthlyPayment,
      totalPaid: monthlyPayment * numberOfPayments,
      totalInterest: monthlyPayment * numberOfPayments - principal,
      principal: principal,
    }
  }

  const loan = calculateLoan()

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    // Handle email submission
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start" id="calculator">
      {/* Left Column: Inputs */}
      <div className="w-full lg:flex-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-2xl">Loan Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Vehicle Price */}
            <div className="space-y-2">
              <Label htmlFor="vehicle-price">Vehicle Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="vehicle-price"
                  type="number"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Trade-in Value */}
            <div className="space-y-2">
              <Label htmlFor="trade-in">Trade-in Value</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="trade-in"
                  type="number"
                  value={tradeInValue}
                  onChange={(e) => setTradeInValue(Number(e.target.value))}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Down Payment with Toggle */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="down-payment">Down Payment</Label>
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={downPaymentType === "dollar" ? "text-foreground font-medium" : "text-muted-foreground"}
                  >
                    $
                  </span>
                  <Switch
                    checked={downPaymentType === "percent"}
                    onCheckedChange={(checked) => setDownPaymentType(checked ? "percent" : "dollar")}
                  />
                  <span
                    className={downPaymentType === "percent" ? "text-foreground font-medium" : "text-muted-foreground"}
                  >
                    %
                  </span>
                </div>
              </div>
              <div className="relative">
                {downPaymentType === "dollar" ? (
                  <>
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="down-payment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-9"
                    />
                  </>
                ) : (
                  <Input
                    id="down-payment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    min={0}
                    max={100}
                  />
                )}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <Label htmlFor="interest-rate">Interest Rate (%)</Label>
              <Input
                id="interest-rate"
                type="number"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            {/* Loan Term with Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="loan-term">Loan Term (Years)</Label>
                <span className="text-2xl font-semibold text-foreground">{loanTerm}</span>
              </div>
              <Slider
                id="loan-term"
                min={1}
                max={20}
                step={1}
                value={[loanTerm]}
                onValueChange={([value]) => setLoanTerm(value)}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1 year</span>
                <span>20 years</span>
              </div>
            </div>

            {/* Rent-to-Own Toggle */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20">
              <div className="space-y-1">
                <Label htmlFor="rent-to-own" className="text-base">
                  Factor in Rental Income?
                </Label>
                <p className="text-sm text-muted-foreground">Enable if you plan to rent out your RV</p>
              </div>
              <Switch id="rent-to-own" checked={rentToOwn} onCheckedChange={setRentToOwn} />
            </div>

            {rentToOwn && (
              <div className="space-y-2">
                <Label htmlFor="rental-income">Monthly Rental Income</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="rental-income"
                    type="number"
                    value={rentalIncome}
                    onChange={(e) => setRentalIncome(Number(e.target.value))}
                    className="pl-9"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Results (Sticky) */}
      <div className="w-full lg:w-[400px] space-y-6 lg:sticky lg:top-24">
        <Card className="shadow-lg border-yellow-500/30">
          <CardHeader className="bg-primary text-primary-foreground">
            <CardTitle className="font-serif text-lg">Your Monthly Payment</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {rentToOwn ? (
              <div className="space-y-2">
                <div className="flex items-baseline justify-between text-muted-foreground">
                  <span>Gross Payment:</span>
                  <span className="text-xl font-semibold">${loan.grossPayment.toFixed(0)}</span>
                </div>
                <div className="flex items-baseline justify-between text-muted-foreground">
                  <span>Rental Income:</span>
                  <span className="text-xl font-semibold text-secondary">- ${rentalIncome}</span>
                </div>
                <div className="h-px bg-border my-2" />
                <div className="flex items-baseline justify-between">
                  <span className="text-lg font-medium">Net Cost:</span>
                  <span className="font-serif text-5xl font-bold text-foreground">
                    ${loan.netPayment.toFixed(0)}
                    <span className="text-xl text-muted-foreground">/mo</span>
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <p className="font-serif text-6xl font-bold text-foreground">
                  ${loan.monthlyPayment.toFixed(0)}
                  <span className="text-2xl text-muted-foreground">/mo</span>
                </p>
              </div>
            )}

            <div className="space-y-2 pt-4 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Paid:</span>
                <span className="font-semibold">
                  ${loan.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Interest:</span>
                <span className="font-semibold">
                  ${loan.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>

            {/* Affiliate Button */}
            <Button
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold h-12"
              size="lg"
            >
              <TrendingDown className="mr-2 h-5 w-5" />
              Check Live Rates & Approval
            </Button>

            <p className="text-xs text-muted-foreground text-center -mt-2">
              We may earn a commission from partner links. Rates subject to approval.
            </p>
          </CardContent>
        </Card>

        {/* Ad Slot 2 - Sidebar */}
        {/*<div className="space-y-1">
          <p className="text-xs text-muted-foreground">Sponsored</p>
          <div
            id="ad-sidebar"
            className="bg-gray-100 h-64 flex items-center justify-center text-gray-400 text-sm border border-dashed border-gray-300 rounded-lg"
          >
            Ad Space (Sidebar)
          </div>
        </div>*/}

        {/* Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif text-lg">Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <LoanChart principal={loan.principal} interest={loan.totalInterest} totalPaid={loan.totalPaid} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
