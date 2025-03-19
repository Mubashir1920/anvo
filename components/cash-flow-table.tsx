import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CashFlowTableProps {
  data: Array<{
    period: number
    originalAmount: number
    calculatedValue: number
  }>
  calculationType: "present-value" | "future-value"
  rate: number
}

export default function CashFlowTable({ data, calculationType, rate }: CashFlowTableProps) {
  // Sort data by period
  const sortedData = [...data].sort((a, b) => a.period - b.period)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Flow Breakdown</CardTitle>
        <CardDescription>
          Detailed view of each cash flow and its {calculationType === "present-value" ? "present" : "future"} value at{" "}
          {rate.toFixed(2)}% interest rate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Original Amount</TableHead>
                <TableHead>{calculationType === "present-value" ? "Present" : "Future"} Value</TableHead>
                <TableHead>Difference</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((item, index) => {
                const difference = item.calculatedValue - item.originalAmount
                return (
                  <TableRow key={index}>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>${item.originalAmount.toFixed(2)}</TableCell>
                    <TableCell>${item.calculatedValue.toFixed(2)}</TableCell>
                    <TableCell className={difference >= 0 ? "text-green-600" : "text-red-600"}>
                      {difference >= 0 ? "+" : ""}
                      {difference.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

