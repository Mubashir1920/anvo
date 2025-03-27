"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function AnnuityPieChart({ principal = 0, payments = 0, interest = 0, calculationType = "standard" }) {
  // Ensure all values are positive for the chart
  const principalValue = Math.max(0, principal)
  const paymentsValue = Math.max(0, payments)
  const interestValue = Math.max(0, interest)

  // Format currency for display
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Calculate percentages
  const total = principalValue + paymentsValue + interestValue
  const principalPercent = total > 0 ? Math.round((principalValue / total) * 100) : 0
  const paymentsPercent = total > 0 ? Math.round((paymentsValue / total) * 100) : 0
  const interestPercent = total > 0 ? Math.round((interestValue / total) * 100) : 0

  // Prepare data for the chart
  const data = [
    { name: "Principal", value: principalValue, percent: principalPercent },
    { name: "Payments", value: paymentsValue, percent: paymentsPercent },
    { name: "Interest", value: interestValue, percent: interestPercent },
  ].filter((item) => item.value > 0) // Only include non-zero values

  // If there's no data, show a message
  if (data.length === 0) {
    return <p className="text-center text-muted-foreground">No data to display</p>
  }

  // Define chart colors directly
  const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"]

  return (
    <Card>
      <CardContent className="pt-6">
        <ChartContainer
          config={{
            principal: {
              label: "Principal",
              color: CHART_COLORS[0],
            },
            payments: {
              label: "Payments",
              color: CHART_COLORS[1],
            },
            interest: {
              label: "Interest",
              color: CHART_COLORS[2],
            },
          }}
          className="h-80"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${percent}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent formatter={(value) => formatCurrency(Number(value))} />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-lg font-bold">{formatCurrency(item.value)}</span>
              <span className="text-sm text-muted-foreground">{item.percent}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

