"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import IrregularStreamChart from "./irregular-stream-chart"
// Import the new CashFlowTable component at the top of the file
import CashFlowTable from "./cash-flow-table"

export default function IrregularCashFlowCalculator() {
  const [calcType, setCalcType] = useState("present-value")
  const [streams, setStreams] = useState([{ amount: "", year: "" }])
  const [rate, setRate] = useState("")
  const [result, setResult] = useState<number | null>(null)

  const handleStreamsChange = (index: number, field: string, value: string) => {
    const updatedStreams = [...streams]
    updatedStreams[index][field as "amount" | "year"] = value
    setStreams(updatedStreams)
  }

  const addStream = () => {
    setStreams([...streams, { amount: "", year: "" }])
  }

  const removeStream = (index: number) => {
    if (streams.length > 1) {
      const updatedStreams = [...streams]
      updatedStreams.splice(index, 1)
      setStreams(updatedStreams)
    }
  }

  const calculateValue = () => {
    const r = Number.parseFloat(rate) / 100
    let total = 0

    if (calcType === "present-value") {
      total = streams.reduce((acc, stream) => {
        const amt = Number.parseFloat(stream.amount)
        const yr = Number.parseFloat(stream.year)
        if (!isNaN(amt) && !isNaN(yr)) {
          return acc + amt / Math.pow(1 + r, yr)
        }
        return acc
      }, 0)
    } else {
      total = streams.reduce((acc, stream) => {
        const amt = Number.parseFloat(stream.amount)
        const yr = Number.parseFloat(stream.year)
        if (!isNaN(amt) && !isNaN(yr)) {
          return acc + amt * Math.pow(1 + r, yr)
        }
        return acc
      }, 0)
    }

    setResult(total)
  }

  // Convert streams to the format expected by the chart component
  const chartData = streams
    .filter((stream) => stream.amount && stream.year)
    .map((stream) => ({
      period: Number.parseFloat(stream.year),
      amount: Number.parseFloat(stream.amount),
    }))
    .sort((a, b) => a.period - b.period)

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Irregular Cash Flow Calculator</CardTitle>
          <CardDescription>
            Calculate the {calcType === "present-value" ? "present" : "future"} value of irregular cash flows
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="calc-type">Calculation Type</Label>
            <Select value={calcType} onValueChange={(value) => setCalcType(value)}>
              <SelectTrigger id="calc-type">
                <SelectValue placeholder="Select calculation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="present-value">Present Value</SelectItem>
                <SelectItem value="future-value">Future Value</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.01"
              min='1'
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder="Enter interest rate"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Cash Flows</Label>
              <Button variant="outline" size="sm" onClick={addStream}>
                Add Cash Flow
              </Button>
            </div>

            {streams.map((stream, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex-1">
                  <Label htmlFor={`amount-${index}`} className="sr-only">
                    Amount
                  </Label>
                  <Input
                    id={`amount-${index}`}
                    type="number"
                    value={stream.amount}
                    onChange={(e) => handleStreamsChange(index, "amount", e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor={`year-${index}`} className="sr-only">
                    Period
                  </Label>
                  <Input
                    id={`year-${index}`}
                    type="number"
                    value={stream.year}
                    onChange={(e) => handleStreamsChange(index, "year", e.target.value)}
                    placeholder="Period"
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeStream(index)} disabled={streams.length <= 1}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={calculateValue} className="w-full">
            Calculate {calcType === "present-value" ? "Present" : "Future"} Value
          </Button>
        </CardFooter>
      </Card>

      {result !== null && (
        <Card>
          <CardHeader>
            <CardTitle>Result</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">${result.toFixed(2)}</p>
            <p className="text-muted-foreground">
              {calcType === "present-value" ? "Present value of all cash flows" : "Future value of all cash flows"}
            </p>
          </CardContent>
        </Card>
      )}

      {result !== null && chartData.length > 0 && (
        <CashFlowTable
          data={chartData.map((item) => {
            const calculatedValue =
              calcType === "present-value"
                ? item.amount / Math.pow(1 + Number.parseFloat(rate) / 100, item.period)
                : item.amount * Math.pow(1 + Number.parseFloat(rate) / 100, item.period)

            return {
              period: item.period,
              originalAmount: item.amount,
              calculatedValue: Number(calculatedValue.toFixed(2)),
            }
          })}
          calculationType={calcType as "present-value" | "future-value"}
          rate={Number.parseFloat(rate)}
        />
      )}

      {rate && chartData.length > 0 && (
        <IrregularStreamChart streams={chartData} rate={Number.parseFloat(rate) / 100} />
      )}
    </div>
  )
}

