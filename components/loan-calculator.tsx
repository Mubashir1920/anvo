'use client'
import { useState, useEffect } from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChartContainer } from "@/components/ui/chart"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface Payment {
  paymentNumber: number
  paymentAmount: number
  principalPaid: number
  interestPaid: number
  remainingBalance: number
}

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(5)
  const [payments, setPayments] = useState<Payment[]>([])
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)
  const [totalPayments, setTotalPayments] = useState(0)
  const [chartData, setChartData] = useState<any[]>([])
  const [visiblePayments, setVisiblePayments] = useState<Payment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [paymentFrequency, setPaymentFrequency] = useState<"monthly" | "quarterly" | "semiannually" | "annually">(
    "quarterly",
  )

  const getPaymentsPerPage = () => {
    switch (paymentFrequency) {
      case "monthly":
        return 12 // 1 year
      case "quarterly":
        return 8 // 2 years
      case "semiannually":
        return 10 // 5 years
      case "annually":
        return 10 // 10 years
      default:
        return 12
    }
  }

  const paymentsPerPage = getPaymentsPerPage()

  useEffect(() => {
    calculateLoan()
  }, [loanAmount, interestRate, loanTerm, paymentFrequency])

  useEffect(() => {
    const startIndex = (currentPage - 1) * paymentsPerPage
    const endIndex = startIndex + paymentsPerPage
    setVisiblePayments(payments.slice(startIndex, endIndex))
  }, [payments, currentPage])

  const calculateLoan = () => {
    // Determine payments per year based on frequency
    const paymentsPerYear = {
      monthly: 12,
      quarterly: 4,
      semiannually: 2,
      annually: 1,
    }[paymentFrequency]

    // Convert annual interest rate to per-period rate
    const periodInterestRate = interestRate / 100 / paymentsPerYear
    const numberOfPayments = loanTerm * paymentsPerYear

    // Calculate per-period payment
    const periodPayment = (loanAmount * periodInterestRate) / (1 - Math.pow(1 + periodInterestRate, -numberOfPayments))
    setMonthlyPayment(periodPayment)

    // Calculate amortization schedule
    let balance = loanAmount
    const newPayments: Payment[] = []
    let totalInterestPaid = 0

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPaid = balance * periodInterestRate
      const principalPaid = periodPayment - interestPaid
      balance -= principalPaid

      totalInterestPaid += interestPaid

      newPayments.push({
        paymentNumber: i,
        paymentAmount: periodPayment,
        principalPaid: principalPaid,
        interestPaid: interestPaid,
        remainingBalance: balance > 0 ? balance : 0,
      })
    }

    setPayments(newPayments)
    setTotalInterest(totalInterestPaid)
    setTotalPayments(loanAmount + totalInterestPaid)

    // Prepare chart data - show all individual payments
    const chartData = newPayments.map((payment) => ({
      name: `${paymentFrequency === "monthly"
        ? "Month"
        : paymentFrequency === "quarterly"
          ? "Quarter"
          : paymentFrequency === "semiannually"
            ? "Period"
            : "Year"
        } ${payment.paymentNumber}`,
      principal: payment.principalPaid,
      interest: payment.interestPaid,
    }))

    setChartData(chartData)
    setCurrentPage(1)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(payments.length / paymentsPerPage)) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className=" grid grid-cols-4  gap-5 pt-20 ">
      <div className="space-y-8 col-span-4 lg:col-span-2 " >

        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
            <CardDescription>Enter your loan information to calculate the amortization schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                <Input
                  id="loanAmount"
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input
                  id="interestRate"
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 sm:col-span-3">
                <Label>Payment Frequency</Label>
                <RadioGroup
                  value={paymentFrequency}
                  onValueChange={(value) =>
                    setPaymentFrequency(value as "monthly" | "quarterly" | "semiannually" | "annually")
                  }
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Monthly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="quarterly" id="quarterly" />
                    <Label htmlFor="quarterly">Quarterly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="semiannually" id="semiannually" />
                    <Label htmlFor="semiannually">Semi-annually</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annually" id="annually" />
                    <Label htmlFor="annually">Annually</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-2 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>
                {paymentFrequency === "monthly"
                  ? "Monthly"
                  : paymentFrequency === "quarterly"
                    ? "Quarterly"
                    : paymentFrequency === "semiannually"
                      ? "Semi-annual"
                      : "Annual"}{" "}
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(monthlyPayment)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Interest</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCurrency(totalPayments)}</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className=" col-span-4 lg:col-span-2"  >
        <Card>
          <CardHeader>
            <CardTitle>Payment Breakdown - All Periods</CardTitle>
            <CardDescription>Visualization of principal vs interest payments over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  principal: {
                    label: "Principal",
                    color: "var(--chart-2)",
                  },
                  interest: {
                    label: "Interest",
                    color: "var(--destructive)",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-90}
                      textAnchor="end"
                      height={80}
                      interval={Math.max(Math.floor(payments.length / 20), 0)} // Show fewer x-axis labels for readability
                      tick={{ fontSize: 10 }}
                    />
                    <YAxis tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                    <Bar dataKey="principal" stackId="a" fill="var(--color-principal)" name="Principal" />
                    <Bar dataKey="interest" stackId="a" fill="var(--color-interest)" name="Interest" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

      </div>
      <div className="col-span-4" >
        <Card>
          <CardHeader>
            <CardTitle>Amortization Schedule</CardTitle>
            <CardDescription>
              Showing payments {(currentPage - 1) * paymentsPerPage + 1} to{" "}
              {Math.min(currentPage * paymentsPerPage, payments.length)} of {payments.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment #</TableHead>
                    <TableHead>Payment Amount</TableHead>
                    <TableHead>Principal</TableHead>
                    <TableHead>Interest</TableHead>
                    <TableHead>Remaining Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visiblePayments.map((payment) => (
                    <TableRow key={payment.paymentNumber}>
                      <TableCell>{payment.paymentNumber}</TableCell>
                      <TableCell>{formatCurrency(payment.paymentAmount)}</TableCell>
                      <TableCell>{formatCurrency(payment.principalPaid)}</TableCell>
                      <TableCell>{formatCurrency(payment.interestPaid)}</TableCell>
                      <TableCell>{formatCurrency(payment.remainingBalance)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </Button>
              <div className="flex items-center space-x-2">
                <span>
                  Page {currentPage} of {Math.ceil(payments.length / paymentsPerPage)}
                </span>
              </div>
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage >= Math.ceil(payments.length / paymentsPerPage)}
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>


    </div>
  )
}

