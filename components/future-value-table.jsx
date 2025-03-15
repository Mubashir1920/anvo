import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Calculate future value data (same function as in the chart component)
const calculateFutureValue = (principal, rate, periods) => {
  const data = []
  for (let i = 0; i <= periods; i++) {
    const futureValue = principal * Math.pow(1 + rate, i)
    data.push({
      period: i,
      futureValue: Math.round(futureValue),
    })
  }
  return data
}

const FutureValueTable = ({ principal = 1000, rate = 0.05, periods = 10 }) => {
  const tableData = calculateFutureValue(principal, rate, periods)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Future Value Table</CardTitle>
        <CardDescription>
          ${principal.toLocaleString()} initial investment at {rate * 100}% interest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Period</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Future Value</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Growth</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => {
                const previousValue = index > 0 ? tableData[index - 1].futureValue : principal
                const growth = index > 0 ? row.futureValue - previousValue : 0
                const growthPercentage = index > 0 ? (growth / previousValue) * 100 : 0

                return (
                  <tr key={row.period} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4">{row.period}</td>
                    <td className="py-3 px-4 text-right font-medium">${row.futureValue.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">
                      {index > 0 ? (
                        <span className="text-green-600">
                          +${growth.toLocaleString()} ({growthPercentage.toFixed(1)}%)
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default FutureValueTable

