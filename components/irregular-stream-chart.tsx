import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"

interface CashFlow {
  period: number
  amount: number
}

interface IrregularStreamChartProps {
  streams: CashFlow[]
  rate: number
}

const calculatePresentValue = (streams: CashFlow[], rate: number) => {
  if (!streams || streams.length === 0) return [] // Handle empty streams

  return streams.map(({ period, amount }) => ({
    period,
    presentValue: Number((amount / Math.pow(1 + rate, period)).toFixed(2)),
    originalAmount: amount,
  }))
}

const ChartTooltipContent = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  const presentValue = payload[0].value
  const originalAmount = payload[0].payload.originalAmount
  const difference = presentValue - originalAmount
  const percentChange = (presentValue / originalAmount - 1) * 100

  return (
    <div className="rounded-lg border bg-background p-3 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-red-600"></div>
          <span className="text-sm font-medium">Present Value:</span>
        </div>
        <div className="text-sm font-medium">${presentValue}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
          <span className="text-sm font-medium">Original Amount:</span>
        </div>
        <div className="text-sm font-medium">${originalAmount}</div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Difference:</span>
        </div>
        <div className={`text-sm font-medium ${difference >= 0 ? "text-green-600" : "text-red-600"}`}>
          {difference >= 0 ? "+" : ""}
          {difference.toFixed(2)} ({percentChange.toFixed(2)}%)
        </div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">Period: {payload[0].payload.period}</div>
    </div>
  )
}

const IrregularStreamChart = ({ streams, rate }: IrregularStreamChartProps) => {
  const chartData = calculatePresentValue(streams, rate)
  if (chartData.length === 0) return <p className="text-center text-gray-500">No data available</p>

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Irregular Stream Present Value Chart</CardTitle>
        <CardDescription>Present value of irregular payments discounted at {(rate * 100).toFixed(2)}%</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{ value: "Periods", position: "insideBottom", offset: -20 }}
                className="text-sm"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `$${value}`}
                label={{ value: "Present Value", angle: -90, position: "insideLeft" }}
                className="text-sm"
              />
              <Line
                dataKey="presentValue"
                type="monotone"
                stroke="#dc2626"
                strokeWidth={2}
                dot={{ fill: "#dc2626", r: 4 }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey="presentValue"
                  position="top"
                  offset={12}
                  fill="#888"
                  fontSize={12}
                  formatter={(value: number) => `$${value}`}
                />
              </Line>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Discounted at {(rate * 100).toFixed(2)}% per period <TrendingDown className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing present value decline over given periods</div>
      </CardFooter>
    </Card>
  )
}

export default IrregularStreamChart

