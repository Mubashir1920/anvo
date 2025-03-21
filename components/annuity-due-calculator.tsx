"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { InfoIcon as InfoCircle } from "lucide-react"
import { PaymentTimeline } from "./payment-timeline"

export function AnnuityDueCalculator() {
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

    // Calculate Present Value of Annuity Due
    const calculatePV = () => {
        if (pvRate === 0) {
            setPvResult(pvPayment * pvPeriods)
        } else {
            const r = pvRate / 100
            const n = pvPeriods
            const pmt = pvPayment

            // PV of Annuity Due = PV of Ordinary Annuity × (1 + r)
            // PV of Ordinary Annuity = PMT × [(1 - (1 + r)^-n) / r]
            const pvOrdinary = pmt * ((1 - Math.pow(1 + r, -n)) / r)
            const pvDue = pvOrdinary * (1 + r)
            setPvResult(pvDue)
        }

        setShowPvTimeline(true)
    }

    // Calculate Future Value of Annuity Due
    const calculateFV = () => {
        if (fvRate === 0) {
            setFvResult(fvPayment * fvPeriods)
        } else {
            const r = fvRate / 100
            const n = fvPeriods
            const pmt = fvPayment

            // FV of Annuity Due = FV of Ordinary Annuity × (1 + r)
            // FV of Ordinary Annuity = PMT × [(1 + r)^n - 1) / r]
            const fvOrdinary = pmt * ((Math.pow(1 + r, n) - 1) / r)
            const fvDue = fvOrdinary * (1 + r)
            setFvResult(fvDue)
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
            <h1 className="text-center my-2 text-xl font-semibold" >Annuity Due Calculator </h1>

            <Tabs defaultValue="pv" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="pv">Present Value</TabsTrigger>
                    <TabsTrigger value="fv">Future Value</TabsTrigger>
                </TabsList>

                <TabsContent value="pv">
                    <Card>
                        <CardHeader>
                            <CardTitle>Present Value of Annuity Due</CardTitle>
                            <CardDescription>
                                Calculate the current value of a series of equal payments made at the beginning of each period.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="pv-due-payment">Payment Amount ($)</Label>
                                <Input
                                    id="pv-due-payment"
                                    type="number"
                                    value={pvPayment}
                                    onChange={(e) => setPvPayment(Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pv-due-rate">Interest Rate (% per period)</Label>
                                <Input
                                    id="pv-due-rate"
                                    type="number"
                                    value={pvRate}
                                    onChange={(e) => setPvRate(Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="pv-due-periods">Number of Periods</Label>
                                <Input
                                    id="pv-due-periods"
                                    type="number"
                                    value={pvPeriods}
                                    onChange={(e) => setPvPeriods(Number.parseInt(e.target.value) || 0)}
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
                                    This is how much money you would need today to achieve the same future value as the annuity due
                                    payments.
                                </p>
                            </div>

                            {showPvTimeline && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
                                    <PaymentTimeline
                                        payment={pvPayment}
                                        periods={pvPeriods}
                                        calculationType="pv"
                                        result={pvResult}
                                        annuityType="due"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="fv">
                    <Card>
                        <CardHeader>
                            <CardTitle>Future Value of Annuity Due</CardTitle>
                            <CardDescription>
                                Calculate the future value of a series of equal payments made at the beginning of each period.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fv-due-payment">Payment Amount ($)</Label>
                                <Input
                                    id="fv-due-payment"
                                    type="number"
                                    value={fvPayment}
                                    onChange={(e) => setFvPayment(Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fv-due-rate">Interest Rate (% per period)</Label>
                                <Input
                                    id="fv-due-rate"
                                    type="number"
                                    value={fvRate}
                                    onChange={(e) => setFvRate(Number.parseFloat(e.target.value) || 0)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="fv-due-periods">Number of Periods</Label>
                                <Input
                                    id="fv-due-periods"
                                    type="number"
                                    value={fvPeriods}
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
                                    This is how much your annuity due payments will be worth in the future, including interest earned.
                                </p>
                            </div>

                            {showFvTimeline && (
                                <div className="mt-6">
                                    <h3 className="text-lg font-medium mb-4">Payment Timeline</h3>
                                    <PaymentTimeline
                                        payment={fvPayment}
                                        periods={fvPeriods}
                                        calculationType="fv"
                                        result={fvResult}
                                        annuityType="due"
                                    />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

