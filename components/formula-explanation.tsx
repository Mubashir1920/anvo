import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FormulaExplanation() {
  return (
    <div className="space-y-6 mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Understanding Ordinary Annuity Formulas</CardTitle>
          <CardDescription>The mathematical formulas behind the calculations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Present Value of Ordinary Annuity</h3>
            <p className="text-sm mb-2">
              The present value (PV) of an ordinary annuity is the current value of a series of equal payments made at
              the end of each period.
            </p>
            <div className="bg-muted p-3 rounded-md">
              <p className="font-mono">PV = PMT × [(1 - (1 + r)^-n) / r]</p>
            </div>
            <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
              <li>PMT = Payment amount per period</li>
              <li>r = Interest rate per period (in decimal form)</li>
              <li>n = Number of periods</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-2">Future Value of Ordinary Annuity</h3>
            <p className="text-sm mb-2">
              The future value (FV) of an ordinary annuity is the value of a series of equal payments at a specified
              date in the future.
            </p>
            <div className="bg-muted p-3 rounded-md">
              <p className="font-mono">FV = PMT × [(1 + r)^n - 1) / r]</p>
            </div>
            <ul className="text-sm mt-2 space-y-1 list-disc pl-5">
              <li>PMT = Payment amount per period</li>
              <li>r = Interest rate per period (in decimal form)</li>
              <li>n = Number of periods</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

