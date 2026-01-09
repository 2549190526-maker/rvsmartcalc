"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingDown, TrendingUp, MapPin, Calculator } from "lucide-react"

export default function RVSmartCalculator() {
  // Primary User Input
  const [daysPerYear, setDaysPerYear] = useState(14)

  // Purchase Inputs
  const [rvPrice, setRvPrice] = useState(60000)
  const [downPayment, setDownPayment] = useState(12000)
  const [loanTerm, setLoanTerm] = useState(10)
  const [interestRate, setInterestRate] = useState(6.5)
  const [annualMaintenance, setAnnualMaintenance] = useState(1000)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [annualDepreciation, setAnnualDepreciation] = useState(10)

  // Rental Inputs
  const [dailyRentalRate, setDailyRentalRate] = useState(225)

  // Calculate Costs
  const calculations = useMemo(() => {
    // Rental Cost (5 years)
    const rentalCost5yr = dailyRentalRate * daysPerYear * 5

    // Ownership Cost (5 years)
    const loanAmount = rvPrice - downPayment
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12
    const monthlyPayment =
      monthlyRate > 0
        ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
        : loanAmount / numberOfPayments

    const totalPayments5yr = Math.min(monthlyPayment * 12 * 5, loanAmount + monthlyPayment * 12 * 5)
    const maintenanceCost5yr = annualMaintenance * 5
    const insuranceCost5yr = annualInsurance * 5
    const depreciationLoss = rvPrice * (annualDepreciation / 100) * 5
    const resaleValue = Math.max(rvPrice - depreciationLoss, rvPrice * 0.4)

    const ownershipCost5yr = downPayment + totalPayments5yr + maintenanceCost5yr + insuranceCost5yr - resaleValue

    // Break-even calculation
    const fixedOwnershipCosts =
      downPayment +
      (annualMaintenance + annualInsurance) * 5 +
      loanAmount * (interestRate / 100) * Math.min(5, loanTerm) -
      resaleValue
    const breakEvenDays = Math.ceil(fixedOwnershipCosts / (dailyRentalRate * 5))

    return {
      rentalCost5yr,
      ownershipCost5yr,
      breakEvenDays,
      isRentingCheaper: rentalCost5yr < ownershipCost5yr,
      savingsAmount: Math.abs(rentalCost5yr - ownershipCost5yr),
    }
  }, [
    daysPerYear,
    rvPrice,
    downPayment,
    loanTerm,
    interestRate,
    annualMaintenance,
    annualInsurance,
    annualDepreciation,
    dailyRentalRate,
  ])

  const chartData = [
    {
      name: "Renting",
      cost: calculations.rentalCost5yr,
    },
    {
      name: "Buying",
      cost: calculations.ownershipCost5yr,
    },
  ]

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Ad Banner Top */}
      <div id="ad-banner-top" className="hidden" />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">
            RV<span className="text-[#d4af37]">Smart</span>Calc
          </h1>
          <p className="text-lg text-slate-300">Honest Math for Your RV Decision</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT COLUMN: Inputs */}
          <div className="space-y-6">
            <Card className="border-slate-700 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Your Usage</CardTitle>
                <CardDescription className="text-slate-400">How many days will you RV per year?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Days Per Year</Label>
                    <Badge variant="secondary" className="bg-[#d4af37] text-[#0f172a]">
                      {daysPerYear} days
                    </Badge>
                  </div>
                  <Slider
                    value={[daysPerYear]}
                    onValueChange={(value) => setDaysPerYear(value[0])}
                    max={90}
                    step={1}
                    className="[&_[role=slider]]:bg-[#d4af37] [&_[role=slider]]:border-[#d4af37]"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>0 days</span>
                    <span>90 days</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Purchase Options</CardTitle>
                <CardDescription className="text-slate-400">What RV are you considering?</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">RV Price ($)</Label>
                  <Input
                    type="number"
                    value={rvPrice}
                    onChange={(e) => setRvPrice(Number(e.target.value))}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="advanced" className="border-slate-700">
                    <AccordionTrigger className="text-[#d4af37] hover:text-[#d4af37]/80">
                      Advanced Settings
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label className="text-white">Down Payment ($)</Label>
                        <Input
                          type="number"
                          value={downPayment}
                          onChange={(e) => setDownPayment(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Loan Term (Years)</Label>
                        <Input
                          type="number"
                          value={loanTerm}
                          onChange={(e) => setLoanTerm(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Interest Rate (%)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Annual Maintenance ($)</Label>
                        <Input
                          type="number"
                          value={annualMaintenance}
                          onChange={(e) => setAnnualMaintenance(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Annual Insurance ($)</Label>
                        <Input
                          type="number"
                          value={annualInsurance}
                          onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-white">Annual Depreciation (%)</Label>
                        <Input
                          type="number"
                          value={annualDepreciation}
                          onChange={(e) => setAnnualDepreciation(Number(e.target.value))}
                          className="border-slate-700 bg-slate-800 text-white"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="border-slate-700 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Rental Options</CardTitle>
                <CardDescription className="text-slate-400">What's the daily rental rate?</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label className="text-white">Daily Rental Rate ($)</Label>
                  <Input
                    type="number"
                    value={dailyRentalRate}
                    onChange={(e) => setDailyRentalRate(Number(e.target.value))}
                    className="border-slate-700 bg-slate-800 text-white"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Ad Sidebar */}
            <div id="ad-sidebar" className="hidden" />

            <Card
              className={`border-2 ${
                calculations.isRentingCheaper
                  ? "border-blue-500 bg-gradient-to-br from-blue-950/50 to-slate-900/50"
                  : "border-[#d4af37] bg-gradient-to-br from-amber-950/50 to-slate-900/50"
              } backdrop-blur`}
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  {calculations.isRentingCheaper ? (
                    <TrendingDown className="h-8 w-8 text-blue-400" />
                  ) : (
                    <TrendingUp className="h-8 w-8 text-[#d4af37]" />
                  )}
                  <CardTitle className="text-2xl text-white">
                    {calculations.isRentingCheaper ? (
                      <>📉 RENTING is the Smarter Choice</>
                    ) : (
                      <>🏆 BUYING Saves You Money</>
                    )}
                  </CardTitle>
                </div>
                <CardDescription className="text-lg text-slate-300">
                  Based on {daysPerYear} days per year over 5 years
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-lg bg-slate-800/50 p-4">
                  <p className="mb-2 text-sm text-slate-400">Break-Even Point</p>
                  <p className="text-balance text-lg leading-relaxed text-white">
                    You need to RV for at least{" "}
                    <span className="font-bold text-[#d4af37]">{calculations.breakEvenDays} days/year</span> to make
                    buying worth it.
                  </p>
                </div>

                <div className="rounded-lg bg-slate-800/50 p-4">
                  <p className="mb-2 text-sm text-slate-400">5-Year Savings</p>
                  <p className="text-3xl font-bold text-[#d4af37]">${calculations.savingsAmount.toLocaleString()}</p>
                  <p className="text-sm text-slate-400">
                    {calculations.isRentingCheaper ? "saved by renting" : "saved by buying"}
                  </p>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1e293b",
                          border: "1px solid #475569",
                          borderRadius: "8px",
                          color: "#fff",
                        }}
                        formatter={(value: any ) => [`$${value.toLocaleString()}`, "Total Cost"]}
                      />
                      <Legend />
                      <Bar
                        dataKey="cost"
                        fill={calculations.isRentingCheaper ? "#3b82f6" : "#d4af37"}
                        name="5-Year Total Cost"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Button
                  className={`w-full ${
                    calculations.isRentingCheaper
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-[#d4af37] hover:bg-[#d4af37]/90 text-[#0f172a]"
                  } font-semibold`}
                  size="lg"
                >
                  {calculations.isRentingCheaper ? (
                    <>
                      <MapPin className="mr-2 h-5 w-5" />
                      Find Rentals on Outdoorsy
                    </>
                  ) : (
                    <>
                      <Calculator className="mr-2 h-5 w-5" />
                      See Pre-Qualified Loan Rates
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
