import { ChartTooltip } from "@/components/ui/chart"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Calculate future value data
const calculateFutureValue = (principal, rate, years, periodType) => {
  let periodYears = 0;
  switch (periodType) {
    case 'monthly':
      periodYears = 12 * years;
      break;
    case 'quarterly':
      periodYears = 4 * years;
      break;
    case 'semiAnnually':
      periodYears = 2 * years;
      break;
    default:
      periodYears = years;
      break;
  }

  const data = []
  for (let i = 0; i <= periodYears; i++) {
    const futureValue = principal * Math.pow(1 + rate, i)
    data.push({
      period: i,
      futureValue: Number(futureValue.toPrecision(6)),
    })
  }
  return data
}


const ChartContainer = ({ children }) => {
  // Define colors for the chart
  const style = {
    "--color-futureValue": "hsl(0, 80%, 30%)",
  }
  return (
    <div style={style} className="w-full">
      {children}
    </div>
  )
}

const ChartTooltipContent = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full" style={{ background: "var(--color-futureValue)" }}></div>
          <span className="text-sm font-medium">Future Value:</span>
        </div>
        <div className="text-sm font-medium">${payload[0].value}</div>
      </div>
      <div className="mt-1 text-xs text-muted-foreground">Period: {payload[0].payload.period}</div>
    </div>
  )
}

const FutureValueChart = ({ principal, rate, years, periodType }) => {
  const chartData = calculateFutureValue(principal, rate, years, periodType)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Future Value Chart</CardTitle>
        <CardDescription> ${principal} initial investment at {rate * 100} % interest</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <div style={{ width: "100%", height: "400px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{
                  top: 30,
                  right: 30,
                  left: 30,
                  bottom: 30,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="period"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  label={{ value: "Number of years", position: "insideBottom", offset: -20 }}
                  className="text-sm"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}`}
                  label={{ value: "Amount", offset: -20, angle: -90, position: "insideLeft"  }}
                  className="text-sm"
                />
                <Line
                  dataKey="futureValue"
                  type="monotone"
                  stroke="var(--color-futureValue)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-futureValue)",
                    r: 4,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    dataKey="futureValue"
                    position="top"
                    offset={12}
                    fill="#888"
                    fontSize={12}
                    formatter={(value) => `$${value}`}
                  />
                </Line>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Growth of {rate * 100}% per period <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">Showing compound growth over {years} years</div>
      </CardFooter>
    </Card>
  )
}

export default FutureValueChart

