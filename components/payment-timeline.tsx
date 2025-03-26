"use client"

import { Card, CardContent } from "@/components/ui/card"

interface PaymentTimelineProps {
  payment: number
  periods: number
  calculationType: "pv" | "fv"
  result: number | null
  annuityType?: "ordinary" | "due"
}

export function PaymentTimeline({
  payment,
  periods,
  calculationType,
  result,
  annuityType = "ordinary",
}: PaymentTimelineProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Generate timeline points - simplified for visualization
  const timelinePoints = Array.from({ length: Math.min(periods, 10) }, (_, i) => {
    const period = i + 1
    return {
      period,
      payment,
      // For annuity due, the payment is at the beginning of the period
      // For ordinary annuity, the payment is at the end of the period
      paymentPosition: annuityType === "due" ? "beginning" : "end",
    }
  })

  // Add the result point
  if (calculationType === "pv") {
    timelinePoints.unshift({
      period: 0,
      payment: result || 0,
      paymentPosition: "present",
    })
  } else {
    timelinePoints.push({
      period: periods + 1,
      payment: result || 0,
      paymentPosition: "future",
    })
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline points */}
          <div className="space-y-8">
            {timelinePoints.map((point, index) => (
              <div key={index} className="relative flex items-center">
                <div className="absolute left-4 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                <div className="ml-8">
                  <p className="font-medium">
                    {point.paymentPosition === "present"
                      ? "Present Value"
                      : point.paymentPosition === "future"
                        ? "Future Value"
                        : `Period ${point.period} (${point.paymentPosition === "beginning" ? "Beginning" : "End"})`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {point.paymentPosition === "present" || point.paymentPosition === "future"
                      ? formatCurrency(point.payment)
                      : `Payment: ${formatCurrency(point.payment)}`}
                  </p>
                </div>
              </div>
            ))}

            {periods > 10 && (
              <div className="relative flex items-center">
                <div className="absolute left-4 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2" />
                <div className="ml-8">
                  <p className="font-medium text-muted-foreground">...</p>
                  <p className="text-sm text-muted-foreground">{periods - 10} more periods</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

