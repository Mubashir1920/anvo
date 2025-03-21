"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from "lucide-react"
import { PaymentTimeline } from "./payment-timeline"

export function OrdinaryAnnuity() {
  const [pvPayment, setPvPayment] = useState<number>(1000)
  const [pvRate, setPvRate] = useState<number>(5)
  const [pvPeriods, setPvPeriods] = useState<number>(10)
  const [pvResult, setPvResult] = useState<number | null>(null)
  const [showPvTimeline, setShowPvTimeline] = useState<boolean>(false)

  const [fvPayment, setFvPayment] = useState<number>(1000)
  const [fvRate, setFvRate] = useState<number>(5)
  const [fvPeriods, setFvPeriods] = useState<number>(10)
  const [fvResult, setFvResult] = useState<number | null>(null)
  const [showFvTimeline, setShowFvTimeline] = useState<boolean>(false)

  // Calculate Present Value of Ordinary Annuity
  const calculatePV = () => {

    if (pvRate === 0) {
      setPvResult(pvPayment * pvPeriods)
    } else {
      const r = pvRate / 100
      const n = pvPeriods
      const pmt = pvPayment

      // PV = PMT × [(1 - (1 + r)^-n) / r]
      const pv = pmt * ((1 - Math.pow(1 + r, -n)) / r)
      setPvResult(pv)
    }

    setShowPvTimeline(true)
  }

  // Calculate Future Value of Ordinary Annuity
  const calculateFV = () => {
    if (fvRate === 0) {
      setFvResult(fvPayment * fvPeriods)
    } else {
      const r = fvRate / 100
      const n = fvPeriods
      const pmt = fvPayment

      // FV = PMT × [(1 + r)^n - 1) / r]
      const fv = pmt * ((Math.pow(1 + r, n) - 1) / r)
      setFvResult(fv)
    }

    setShowFvTimeline(true)
  }

  const formatCurrency = (value: number | null) => {
    if (value === null) return "-"
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div>
      <h1 className="text-center my-2 text-xl font-semibold" > Ordinary Annuity Calculator </h1>
      <Tabs defaultValue="pv" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pv">Present Value</TabsTrigger>
          <TabsTrigger value="fv">Future Value</TabsTrigger>
        </TabsList>

        <TabsContent value="pv">
          <Card>
            <CardHeader>
              <CardTitle>Present Value of Ordinary Annuity</CardTitle>
              <CardDescription>
                Calculate the current value of a series of equal payments made at the end of each period.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <Button onClick={calculatePV} className="w-full">
                Calculate Present Value
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
                  This is how much money you would need today to achieve the same future value as the annuity payments.
                </p>
              </div>

              {showPvTimeline && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
                  <PaymentTimeline payment={pvPayment} periods={pvPeriods} calculationType="pv" result={pvResult} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fv">
          <Card>
            <CardHeader>
              <CardTitle>Future Value of Ordinary Annuity</CardTitle>
              <CardDescription>
                Calculate the future value of a series of equal payments made at the end of each period.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <Button onClick={calculateFV} className="w-full">
                Calculate Future Value
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

              {showFvTimeline && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
                  <PaymentTimeline payment={fvPayment} periods={fvPeriods} calculationType="fv" result={fvResult} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

  )
}

