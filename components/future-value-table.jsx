import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Calculate future value data (same function as in the chart component)
const calculateFutureValue = (principal, rate, years, periodType) => {
  let periodYears = 0;
  switch (periodType) {
    case 'daily':
      periodYears = 360 * years;
      break;
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

const FutureValueTable = ({ principal, rate, years, periodType }) => {
  const tableData = calculateFutureValue(principal, rate, years, periodType)

  return (
    <Card className="w-full h-[600px]  ">
      <CardHeader>
        <CardTitle>Future Value Table</CardTitle>
        <CardDescription>
          ${principal.toLocaleString()} initial investment at {rate * 100}% interest
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-y-scroll h-[500px]">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-background">
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
                          +${growth.toLocaleString()} ({growthPercentage.toFixed(2)}%)
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

