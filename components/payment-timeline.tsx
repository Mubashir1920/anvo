import { DollarSign, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PaymentTimelineProps {
  payment: number
  periods: number
  calculationType: "pv" | "fv"
  result: number | null
}

export function PaymentTimeline({ payment, periods, calculationType, result }: PaymentTimelineProps) {
  // Limit to showing max 12 periods on timeline for UI clarity
  const displayPeriods = Math.min(periods, 10)
  const showingAllPeriods = displayPeriods === periods

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card >
      <CardContent className="pt-6">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute h-0.5 bg-muted top-10 left-0 right-0 z-0"></div>

          {/* Timeline markers */}
          <div className="flex justify-between relative z-10">
            {/* Starting point */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                  calculationType === "pv" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {calculationType === "pv" ? <DollarSign className="h-4 w-4" /> : <span>0</span>}
              </div>
              <span className="text-xs font-medium">{calculationType === "pv" ? "Present Value" : "Start"}</span>
              {calculationType === "pv" && result !== null && (
                <span className="text-xs font-bold mt-1">{formatCurrency(result)}</span>
              )}
            </div>

            {/* Period markers */}
            {Array.from({ length: displayPeriods }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-muted-foreground text-background flex items-center justify-center mb-2 text-xs">
                  {index + 1}
                </div>
                <span className="text-xs">Period {index + 1}</span>
                <span className="text-xs font-bold mt-1">{formatCurrency(payment)}</span>
              </div>
            ))}

            {/* Ending point */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center mb-2",
                  calculationType === "fv" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {calculationType === "fv" ? <DollarSign className="h-4 w-4" /> : <span>{periods}</span>}
              </div>
              <span className="text-xs font-medium">
                {calculationType === "fv" ? "Future Value" : `Period ${periods}`}
              </span>
              {calculationType === "fv" && result !== null && (
                <span className="text-xs font-bold mt-1">{formatCurrency(result)}</span>
              )}
            </div>
          </div>

          {/* Show ellipsis if not showing all periods */}
          {!showingAllPeriods && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <span>
                Showing {displayPeriods} of {periods} periods
              </span>
            </div>
          )}

          {/* Payment direction arrows */}
          <div className="mt-6 flex items-center justify-center text-sm text-muted-foreground">
            <span>Payments of {formatCurrency(payment)} made at the end of each period</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

