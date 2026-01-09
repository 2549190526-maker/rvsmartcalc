"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Scale, Truck, AlertTriangle, CheckCircle, Info, ExternalLink } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function TowingCalculator() {
  // Vehicle Stats
  const [payloadCapacity, setPayloadCapacity] = useState(1800)
  const [towingCapacity, setTowingCapacity] = useState(11000)

  // Your Load
  const [passengerWeight, setPassengerWeight] = useState(400)
  const [truckCargo, setTruckCargo] = useState(100)

  // RV Specs
  const [rvDryWeight, setRvDryWeight] = useState(7000)
  const [rvCargo, setRvCargo] = useState(800)
  const [tongueWeightRatio, setTongueWeightRatio] = useState([13])

  // Calculations
  const totalRvWeight = rvDryWeight + rvCargo
  const estimatedTongueWeight = Math.round(totalRvWeight * (tongueWeightRatio[0] / 100))
  const totalPayloadUsed = estimatedTongueWeight + passengerWeight + truckCargo
  const remainingPayload = payloadCapacity - totalPayloadUsed
  const payloadPercentage = Math.round((totalPayloadUsed / payloadCapacity) * 100)
  const towingPercentage = Math.round((totalRvWeight / towingCapacity) * 100)

  // Safety Status
  const isPayloadSafe = payloadPercentage <= 85
  const isPayloadCaution = payloadPercentage > 85 && payloadPercentage < 100
  const isPayloadDanger = payloadPercentage >= 100
  const isTowingSafe = towingPercentage <= 100

  const overallSafe = isPayloadSafe && isTowingSafe

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-x-hidden">
      {/* Ad Banner Top */}
      <div id="ad-banner-top" className="hidden" />

      {/* Hero Section */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Scale className="h-8 w-8 text-[#d4af37]" />
            <h1 className="text-4xl md:text-5xl font-bold text-white font-serif">RVSmartCalc</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {"The life-saving calculator that reveals if your truck can "}
            <span className="text-[#d4af37] font-semibold">safely tow</span>
            {" your RV. Most people check towing capacity, but fail due to "}
            <span className="text-[#d4af37] font-semibold">payload capacity</span>
            {"."}
          </p>
        </div>
      </div>

      {/* Main Calculator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT COLUMN: Inputs */}
          <div className="space-y-6">
            {/* Vehicle Stats */}
            <Card className="bg-white border-[#d4af37]/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-[#d4af37]" />
                  Vehicle Stats
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {"Find these values on your driver's door jamb"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="payload" className="text-[#0f172a] font-semibold">
                      Payload Capacity (Lbs)
                    </Label>
                    <HoverCard>
                      <HoverCardTrigger>
                        <Info className="h-4 w-4 text-[#d4af37] cursor-help" />
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          {
                            "Look for the yellow sticker on your driver's door jamb. This is the CRITICAL number most people ignore."
                          }
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                  <Input
                    id="payload"
                    type="number"
                    value={payloadCapacity}
                    onChange={(e) => setPayloadCapacity(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37] text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="towing" className="text-[#0f172a] font-semibold">
                    Towing Capacity (Lbs)
                  </Label>
                  <Input
                    id="towing"
                    type="number"
                    value={towingCapacity}
                    onChange={(e) => setTowingCapacity(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37] text-lg"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Your Load */}
            <Card className="bg-white border-[#d4af37]/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#d4af37]" />
                  Your Load (The Hidden Weight)
                </CardTitle>
                <CardDescription className="text-gray-300">Everything in your truck adds up fast</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="passengers" className="text-[#0f172a] font-semibold">
                    Passenger Weight (Lbs)
                  </Label>
                  <Input
                    id="passengers"
                    type="number"
                    value={passengerWeight}
                    onChange={(e) => setPassengerWeight(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37]"
                    placeholder="Driver + Family + Pets"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo" className="text-[#0f172a] font-semibold">
                    Cargo in Truck Bed (Lbs)
                  </Label>
                  <Input
                    id="cargo"
                    type="number"
                    value={truckCargo}
                    onChange={(e) => setTruckCargo(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37]"
                    placeholder="Tools, Firewood, Hitch"
                  />
                </div>
              </CardContent>
            </Card>

            {/* RV Specs */}
            <Card className="bg-white border-[#d4af37]/20 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white">
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-[#d4af37]" />
                  RV Specifications
                </CardTitle>
                <CardDescription className="text-gray-300">Check your RV manual for accurate weights</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rvDry" className="text-[#0f172a] font-semibold">
                    RV Dry Weight (Lbs)
                  </Label>
                  <Input
                    id="rvDry"
                    type="number"
                    value={rvDryWeight}
                    onChange={(e) => setRvDryWeight(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rvCargo" className="text-[#0f172a] font-semibold">
                    Cargo in RV (Lbs)
                  </Label>
                  <Input
                    id="rvCargo"
                    type="number"
                    value={rvCargo}
                    onChange={(e) => setRvCargo(Number(e.target.value))}
                    className="border-[#d4af37]/30 focus:border-[#d4af37]"
                    placeholder="Water, Gear, Supplies"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-[#0f172a] font-semibold">Tongue Weight Ratio</Label>
                    <span className="text-[#d4af37] font-bold text-lg">{tongueWeightRatio[0]}%</span>
                  </div>
                  <Slider
                    value={tongueWeightRatio}
                    onValueChange={setTongueWeightRatio}
                    min={10}
                    max={15}
                    step={1}
                    className="[&_[role=slider]]:bg-[#d4af37] [&_[role=slider]]:border-[#d4af37]"
                  />
                  <p className="text-xs text-gray-600">{"Typical range: 10-15%. Higher for travel trailers."}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: Results */}
          <div className="space-y-6">
            {/* Ad Sidebar */}
            <div id="ad-sidebar" className="hidden" />

            {/* Verdict Card - Sticky */}
            <div className="lg:sticky lg:top-8">
              <Card className="bg-white border-2 border-[#d4af37] shadow-2xl">
                <CardHeader
                  className={`${
                    isPayloadDanger
                      ? "bg-gradient-to-r from-red-600 to-red-700"
                      : isPayloadCaution
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600"
                        : "bg-gradient-to-r from-green-600 to-green-700"
                  } text-white`}
                >
                  <CardTitle className="text-2xl flex items-center gap-3">
                    {overallSafe ? <CheckCircle className="h-8 w-8" /> : <AlertTriangle className="h-8 w-8" />}
                    {overallSafe ? "✅ Safe to Tow!" : "⛔ STOP! Overloaded"}
                  </CardTitle>
                  <CardDescription className="text-white/90 text-base">
                    {overallSafe
                      ? "Your vehicle can safely handle this load"
                      : "Your vehicle cannot safely tow this RV"}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-6 space-y-6">
                  {/* Payload Gauge */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#0f172a] flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-[#d4af37]" />
                        Payload Safety (CRITICAL)
                      </h3>
                      <span
                        className={`font-bold text-lg ${
                          isPayloadDanger ? "text-red-600" : isPayloadCaution ? "text-yellow-600" : "text-green-600"
                        }`}
                      >
                        {payloadPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={Math.min(payloadPercentage, 100)}
                      className={`h-4 ${
                        isPayloadDanger
                          ? "[&>div]:bg-red-600"
                          : isPayloadCaution
                            ? "[&>div]:bg-yellow-500"
                            : "[&>div]:bg-green-600"
                      }`}
                    />
                    <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="text-gray-600">Used</p>
                        <p className="font-bold text-[#0f172a]">{totalPayloadUsed.toLocaleString()} lbs</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Remaining</p>
                        <p className={`font-bold ${remainingPayload < 0 ? "text-red-600" : "text-green-600"}`}>
                          {remainingPayload.toLocaleString()} lbs
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Towing Gauge */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-[#0f172a] flex items-center gap-2">
                        <Truck className="h-5 w-5 text-[#d4af37]" />
                        Towing Capacity
                      </h3>
                      <span
                        className={`font-bold text-lg ${towingPercentage > 100 ? "text-red-600" : "text-green-600"}`}
                      >
                        {towingPercentage}%
                      </span>
                    </div>
                    <Progress
                      value={Math.min(towingPercentage, 100)}
                      className={`h-4 ${towingPercentage > 100 ? "[&>div]:bg-red-600" : "[&>div]:bg-blue-600"}`}
                    />
                    <div className="grid grid-cols-2 gap-4 text-sm bg-gray-50 p-3 rounded-lg">
                      <div>
                        <p className="text-gray-600">Total RV Weight</p>
                        <p className="font-bold text-[#0f172a]">{totalRvWeight.toLocaleString()} lbs</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Tongue Weight</p>
                        <p className="font-bold text-[#d4af37]">{estimatedTongueWeight.toLocaleString()} lbs</p>
                      </div>
                    </div>
                  </div>

                  {/* Breakdown */}
                  <Alert className="border-[#d4af37]/30 bg-[#0f172a]/5">
                    <Info className="h-4 w-4 text-[#d4af37]" />
                    <AlertTitle className="text-[#0f172a]">Weight Breakdown</AlertTitle>
                    <AlertDescription className="space-y-1 text-sm text-gray-700">
                      <div className="flex justify-between">
                        <span>Tongue Weight:</span>
                        <span className="font-semibold">{estimatedTongueWeight.toLocaleString()} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Passengers:</span>
                        <span className="font-semibold">{passengerWeight.toLocaleString()} lbs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Truck Cargo:</span>
                        <span className="font-semibold">{truckCargo.toLocaleString()} lbs</span>
                      </div>
                      <div className="flex justify-between border-t border-[#d4af37]/30 pt-1 mt-1">
                        <span className="font-bold">Total Payload:</span>
                        <span className="font-bold text-[#d4af37]">{totalPayloadUsed.toLocaleString()} lbs</span>
                      </div>
                    </AlertDescription>
                  </Alert>

                  {/* Affiliate Recommendations */}
                  <div className="pt-4 border-t border-gray-200">
                    {overallSafe ? (
                      <div className="space-y-3">
                        <h4 className="font-bold text-[#0f172a]">{"✨ Maximize Your Safety"}</h4>
                        <p className="text-sm text-gray-700">
                          {"Enhance stability and control with a "}
                          <span className="font-semibold text-[#d4af37]">Weight Distribution Hitch</span>
                          {". Essential for safe towing."}
                        </p>
                        <Button className="w-full bg-[#d4af37] hover:bg-[#e5c158] text-[#0f172a] font-semibold">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View on Amazon
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <h4 className="font-bold text-red-600">{"⚠️ Solution Required"}</h4>
                        <p className="text-sm text-gray-700">
                          {"You need a lighter RV or a Heavy Duty Truck. Consider "}
                          <span className="font-semibold text-[#d4af37]">Air Suspension Kits</span>
                          {" for marginal improvement."}
                        </p>
                        <Button className="w-full bg-[#0f172a] hover:bg-[#1e293b] text-white font-semibold">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Suspension Upgrades
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#d4af37]/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-400 text-sm">
            {"Always verify calculations with a professional. Towing safety is critical."}
          </p>
        </div>
      </div>
    </div>
  )
}
