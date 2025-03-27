"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from "lucide-react"
import { PaymentTimeline } from "./payment-timeline"
import { AnnuityPieChart } from "./annuity-pie-chart"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function AnnuityCalculator() {
  const [pvPayment, setPvPayment] = useState(1000)
  const [pvRate, setPvRate] = useState(5)
  const [pvPeriods, setPvPeriods] = useState(10)
  const [pvResult, setPvResult] = useState(null)
  const [showPvTimeline, setShowPvTimeline] = useState(false)
  const [pvPrincipal, setPvPrincipal] = useState(0)
  const [pvAnnuityType, setPvAnnuityType] = useState("ordinary")

  const [fvPayment, setFvPayment] = useState(1000)
  const [fvRate, setFvRate] = useState(5)
  const [fvPeriods, setFvPeriods] = useState(10)
  const [fvResult, setFvResult] = useState(null)
  const [showFvTimeline, setShowFvTimeline] = useState(false)
  const [fvPrincipal, setFvPrincipal] = useState(0)
  const [fvAnnuityType, setFvAnnuityType] = useState("ordinary")

  // Calculate Present Value of Annuity
  const calculatePV = () => {
    if (pvRate === 0) {
      setPvResult(pvPrincipal + pvPayment * pvPeriods)
    } else {
      const r = pvRate / 100
      const n = pvPeriods
      const pmt = pvPayment
      const principal = pvPrincipal

      // Base PV calculation for ordinary annuity
      let pv = principal + pmt * ((1 - Math.pow(1 + r, -n)) / r)

      // Adjust for annuity due if selected
      if (pvAnnuityType === "due") {
        pv = principal + pmt * ((1 - Math.pow(1 + r, -n)) / r) * (1 + r)
      }

      setPvResult(pv)
    }

    setShowPvTimeline(true)
  }

  // Calculate Future Value of Annuity
  const calculateFV = () => {
    if (fvRate === 0) {
      setFvResult(fvPrincipal + fvPayment * fvPeriods)
    } else {
      const r = fvRate / 100
      const n = fvPeriods
      const pmt = fvPayment
      const principal = fvPrincipal

      // Base FV calculation for ordinary annuity
      const principalFV = principal * Math.pow(1 + r, n)
      let paymentsFV = pmt * ((Math.pow(1 + r, n) - 1) / r)

      // Adjust for annuity due if selected
      if (fvAnnuityType === "due") {
        paymentsFV = pmt * ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
      }

      const fv = principalFV + paymentsFV
      setFvResult(fv)
    }

    setShowFvTimeline(true)
  }

  const formatCurrency = (value) => {
    if (value === null) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Reset function for Present Value tab
  const resetPV = () => {
    setPvPayment(1000)
    setPvRate(5)
    setPvPeriods(10)
    setPvPrincipal(0)
    setPvResult(null)
    setShowPvTimeline(false)
    setPvAnnuityType("ordinary")
  }

  // Reset function for Future Value tab
  const resetFV = () => {
    setFvPayment(1000)
    setFvRate(5)
    setFvPeriods(10)
    setFvPrincipal(0)
    setFvResult(null)
    setShowFvTimeline(false)
    setFvAnnuityType("ordinary")
  }

  return (
    <div>
      <h1 className="my-4 text-xl font-semibold"> Annuity Calculator </h1>
      <div className="grid grid-cols-2 gap-5 ">
        <Tabs
          defaultValue="pv"
          className="col-span-1"
          onValueChange={(value) => {
            if (value === "pv") {
              setShowFvTimeline(false)
              setFvResult(null)
            } else {
              setShowPvTimeline(false)
              setPvResult(null)
            }
          }}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pv">Present Value</TabsTrigger>
            <TabsTrigger value="fv">Future Value</TabsTrigger>
          </TabsList>

          <TabsContent value="pv">
            <Card>
              <CardHeader>
                <CardTitle>Present Value of Annuity</CardTitle>
                <CardDescription>Calculate the current value of a series of equal payments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Annuity Type</Label>
                  <RadioGroup
                    value={pvAnnuityType}
                    onValueChange={(value) => {
                      setPvAnnuityType(value)
                      // Reset values but keep the new annuity type
                      setPvPayment(1000)
                      setPvRate(5)
                      setPvPeriods(10)
                      setPvPrincipal(0)
                      setPvResult(null)
                      setShowPvTimeline(false)
                    }}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ordinary" id="pv-ordinary" />
                      <Label htmlFor="pv-ordinary" className="cursor-pointer">
                        Ordinary Annuity
                        <p className="text-xs text-muted-foreground">Payments at the end of each period</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="due" id="pv-due" />
                      <Label htmlFor="pv-due" className="cursor-pointer">
                        Annuity Due
                        <p className="text-xs text-muted-foreground">Payments at the beginning of each period</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pv-payment">Payment Amount ($)</Label>
                  <Input
                    id="pv-payment"
                    type="number"
                    value={pvPayment}
                    onChange={(e) => setPvPayment(Number.parseFloat(e.target.value) || 0)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pv-rate">Interest Rate (% per period)</Label>
                  <Input
                    id="pv-rate"
                    type="number"
                    value={pvRate}
                    onChange={(e) => setPvRate(Number.parseFloat(e.target.value) || 0)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pv-periods">Number of Periods</Label>
                  <Input
                    id="pv-periods"
                    type="number"
                    value={pvPeriods}
                    onChange={(e) => setPvPeriods(Number.parseInt(e.target.value) || 0)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pv-principal">Starting Principal ($)</Label>
                  <Input
                    id="pv-principal"
                    type="number"
                    value={pvPrincipal}
                    onChange={(e) => setPvPrincipal(Number.parseFloat(e.target.value) || 0)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <Button onClick={calculatePV} className="w-full">
                  Calculate Present Value
                </Button>

                <Button onClick={resetPV} variant="outline" className="w-full mt-2">
                  Reset Values
                </Button>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Present Value:</h3>
                      <InfoCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xl font-bold">{formatCurrency(pvResult)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is how much money you would need today to achieve the same future value as the annuity
                    payments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fv">
            <Card>
              <CardHeader>
                <CardTitle>Future Value of Annuity</CardTitle>
                <CardDescription>Calculate the future value of a series of equal payments.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Annuity Type</Label>
                  <RadioGroup
                    value={fvAnnuityType}
                    onValueChange={(value) => {
                      setFvAnnuityType(value)
                      // Reset values but keep the new annuity type
                      setFvPayment(1000)
                      setFvRate(5)
                      setFvPeriods(10)
                      setFvPrincipal(0)
                      setFvResult(null)
                      setShowFvTimeline(false)
                    }}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ordinary" id="fv-ordinary" />
                      <Label htmlFor="fv-ordinary" className="cursor-pointer">
                        Ordinary Annuity
                        <p className="text-xs text-muted-foreground">Payments at the end of each period</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="due" id="fv-due" />
                      <Label htmlFor="fv-due" className="cursor-pointer">
                        Annuity Due
                        <p className="text-xs text-muted-foreground">Payments at the beginning of each period</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fv-payment">Payment Amount ($)</Label>
                  <Input
                    id="fv-payment"
                    type="number"
                    value={fvPayment}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setFvPayment(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fv-rate">Interest Rate (% per period)</Label>
                  <Input
                    id="fv-rate"
                    type="number"
                    value={fvRate}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setFvRate(Number.parseFloat(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fv-periods">Number of Periods</Label>
                  <Input
                    id="fv-periods"
                    type="number"
                    value={fvPeriods}
                    onWheel={(e) => e.target.blur()}
                    onChange={(e) => setFvPeriods(Number.parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fv-principal">Starting Principal ($)</Label>
                  <Input
                    id="fv-principal"
                    type="number"
                    value={fvPrincipal}
                    onChange={(e) => setFvPrincipal(Number.parseFloat(e.target.value) || 0)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>

                <Button onClick={calculateFV} className="w-full">
                  Calculate Future Value
                </Button>

                <Button onClick={resetFV} variant="outline" className="w-full mt-2">
                  Reset Values
                </Button>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium">Future Value:</h3>
                      <InfoCircle className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xl font-bold">{formatCurrency(fvResult)}</p>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is how much your annuity payments will be worth in the future, including interest earned.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        <div className="col-span-1 border-gray-200 border rounded-md ">
          {showPvTimeline && (
            <div className="mt-6  ">
              <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
              <PaymentTimeline
                payment={pvPayment}
                periods={pvPeriods}
                calculationType="pv"
                result={pvResult}
                annuityType={pvAnnuityType}
              />
            </div>
          )}
          {fvResult !== null && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Value Breakdown</h3>
              <AnnuityPieChart
                principal={fvPrincipal * Math.pow(1 + fvRate / 100, fvPeriods)}
                payments={fvPayment * fvPeriods}
                interest={fvResult - fvPrincipal - fvPayment * fvPeriods}
                calculationType="fv"
              />
            </div>
          )}

          {showFvTimeline && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
              <PaymentTimeline
                payment={fvPayment}
                periods={fvPeriods}
                calculationType="fv"
                result={fvResult}
                annuityType={fvAnnuityType}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

