"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function AdventureCostCalculator() {
  const [nightsPerYear, setNightsPerYear] = useState(30)
  const [tripsPerYear, setTripsPerYear] = useState(5)
  const [isHotelStyle, setIsHotelStyle] = useState(true)
  const [smartSavings, setSmartSavings] = useState(false)

  // Cost calculations
  const calculateTraditionalCost = () => {
    const accommodationCostPerNight = isHotelStyle ? 150 : 50
    const mealCostPerNight = isHotelStyle ? 80 : 40
    const totalNightCost = (accommodationCostPerNight + mealCostPerNight) * nightsPerYear
    const flightCost = tripsPerYear * 400
    return totalNightCost + flightCost
  }

  const calculateRVCost = () => {
    // Base costs
    const campsiteCostPerNight = 40
    const fuelCostPerTrip = 120
    const maintenancePerYear = 1200
    const insurancePerYear = 1200

    // Calculate totals
    let totalCampsite = campsiteCostPerNight * nightsPerYear
    let totalFuel = fuelCostPerTrip * tripsPerYear
    let totalMaintenance = maintenancePerYear

    // Apply smart savings
    if (smartSavings) {
      totalCampsite *= 0.5 // 50% off with memberships
      totalFuel *= 0.85 // 15% off with TSD Open Roads
      totalMaintenance *= 0.7 // DIY maintenance saves 30%
    }

    return totalCampsite + totalFuel + totalMaintenance + insurancePerYear
  }

  const traditionalCost = calculateTraditionalCost()
  const rvCost = calculateRVCost()
  const savings = traditionalCost - rvCost

  const chartData = [
    {
      name: "Annual Cost",
      "Traditional Vacation": traditionalCost,
      "RV Lifestyle": rvCost,
    },
  ]

  // Breakdown calculations
  const campsiteCost = 40 * nightsPerYear * (smartSavings ? 0.5 : 1)
  const fuelCost = 120 * tripsPerYear * (smartSavings ? 0.85 : 1)
  const maintenanceCost = 1200 * (smartSavings ? 0.7 : 1)

  return (
    <div className="min-h-screen w-full overflow-x-hidden pt-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">RVSmartCalc</h1>
          <p className="text-xl text-slate-300">Adventure Cost Optimizer</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Inputs */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Your Travel Style</CardTitle>
              <CardDescription className="text-slate-400">
                Adjust your preferences to see the cost comparison
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Nights per Year */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="nights" className="text-white text-lg">
                    Nights per Year
                  </Label>
                  <span className="text-2xl font-bold text-[#d4af37]">{nightsPerYear}</span>
                </div>
                <Slider
                  id="nights"
                  min={10}
                  max={60}
                  step={5}
                  value={[nightsPerYear]}
                  onValueChange={(value) => setNightsPerYear(value[0])}
                  className="w-full py-4 [&_.bg-primary]:bg-[#d4af37] [&_.bg-secondary]:bg-slate-700 [&_.border-primary]:border-[#d4af37]"
                />
              </div>

              {/* Trips per Year */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="trips" className="text-white text-lg">
                    Trips per Year
                  </Label>
                  <span className="text-2xl font-bold text-[#d4af37]">{tripsPerYear}</span>
                </div>
                <Slider
                  id="trips"
                  min={1}
                  max={10}
                  step={1}
                  value={[tripsPerYear]}
                  onValueChange={(value) => setTripsPerYear(value[0])}
                  className="w-full py-4 [&_.bg-primary]:bg-[#d4af37] [&_.bg-secondary]:bg-slate-700 [&_.border-primary]:border-[#d4af37]"
                />
              </div>

              {/* Travel Style Switch */}
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg">
                <div>
                  <Label htmlFor="travel-style" className="text-white text-lg">
                    Travel Style
                  </Label>
                  <p className="text-sm text-slate-400 mt-1">{isHotelStyle ? "Hotel/Resort" : "Camping"}</p>
                </div>
                <Switch id="travel-style" checked={isHotelStyle} onCheckedChange={setIsHotelStyle} />
              </div>

              {/* Smart Savings Mode */}
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border-2 border-[#d4af37]">
                <div>
                  <Label htmlFor="smart-savings" className="text-white text-lg">
                    Smart Savings Mode
                  </Label>
                  <p className="text-sm text-slate-400 mt-1">Use Memberships & DIY</p>
                </div>
                <Switch id="smart-savings" checked={smartSavings} onCheckedChange={setSmartSavings} />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - The Verdict */}
          <Card className="bg-[#0f172a] border-slate-700">
            <CardHeader>
              <CardTitle className="text-2xl text-white">The Verdict</CardTitle>
              <CardDescription className="text-slate-400">Your potential savings revealed</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Savings Headline */}
              <div className="text-center p-6 bg-slate-900 rounded-lg">
                <p className="text-slate-300 text-lg mb-2">You save</p>
                <p className="text-5xl font-bold text-[#d4af37]">${savings.toLocaleString()}</p>
                <p className="text-slate-400 mt-2">per year</p>
              </div>

              {/* The Chart */}
              <div className="h-[300px] w-full p-4 bg-white rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{ fill: "#000" }} axisLine={{ stroke: "#cbd5e1" }} />
                    <YAxis
                      tick={{ fill: "#000" }}
                      axisLine={{ stroke: "#cbd5e1" }}
                      tickFormatter={(value) => `$${value.toLocaleString()}`}
                    />
                    <Tooltip
                      formatter={(value: any, name: any) => [`$${Number(value).toLocaleString()}`, name]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                      itemStyle={{ color: "#000" }}
                      labelStyle={{ color: "#000", fontWeight: "bold" }}
                    />
                    <Legend wrapperStyle={{ color: "#000" }} iconType="square" />
                    <Bar dataKey="Traditional Vacation" fill="#94a3b8" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="RV Lifestyle" fill="#d4af37" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="fuel" className="border-slate-700">
                  <AccordionTrigger className="text-white hover:text-[#d4af37]">
                    Fuel Costs: ${fuelCost.toLocaleString()}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    <p className="mb-3">
                      Based on {tripsPerYear} trips at $120 per trip.
                      {smartSavings && " (15% discount applied)"}
                    </p>
                    <div className="p-3 bg-slate-900 rounded border border-[#d4af37]">
                      <p className="text-[#d4af37] font-semibold">💰 Save More!</p>
                      <a
                        href="https://tsdlogistics.com/open-roads/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-[#d4af37] underline"
                      >
                        Get 15% off diesel with TSD Open Roads
                      </a>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="campsites" className="border-slate-700">
                  <AccordionTrigger className="text-white hover:text-[#d4af37]">
                    Campsite Costs: ${campsiteCost.toLocaleString()}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    <p>
                      {nightsPerYear} nights at $40/night average.
                      {smartSavings && " (50% savings with memberships like Passport America)"}
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="maintenance" className="border-slate-700">
                  <AccordionTrigger className="text-white hover:text-[#d4af37]">
                    Maintenance & Insurance: ${(maintenanceCost + 1200).toLocaleString()}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-400">
                    <p>
                      Annual maintenance: ${maintenanceCost.toLocaleString()}
                      {smartSavings && " (30% savings with DIY maintenance)"}
                    </p>
                    <p className="mt-2">Annual insurance: $1,200</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
