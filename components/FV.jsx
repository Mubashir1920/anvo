'use client'


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { FutureValueChart } from "./future-value-chart"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]






const FV = () => {

    const [presentValue, setPresentValue] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [periodType, setPeriodType] = useState("");
    const [periods, setPeriods] = useState("");
    const [showChart, setShowChart] = useState(true)

    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log({ presentValue, interestRate, periodType, periods });




        setPresentValue('');
        setInterestRate('')
        setPeriodType('')
        setPeriods('')
        setShowChart(true)
    };

    return (
        <div className="flex w-full justify-between " >
            <form onSubmit={handleFormSubmit} className="border space-y-4 rounded-md p-4">
                <h1 className="text-xl font-bold">Calculate Future Value</h1>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="pv">Present Value :</Label>
                    <Input type="number" name="pv" placeholder="Present Value" value={presentValue} onChange={(e) => setPresentValue(e.target.value)} />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="interestRate">Interest Rate :</Label>
                    <Input type="number" name="interestRate" placeholder="Interest Rate %" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="periodType">Period Type</Label>
                    <Select value={periodType} onValueChange={setPeriodType}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Frequency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="semiAnnually">Semi-Annually</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="periods">Periods :</Label>
                    <Input type="number" name="periods" placeholder="Periods" value={periods} onChange={(e) => setPeriods(e.target.value)} />
                </div>

                <Button type="submit" variant="default">Calculate</Button>
            </form>
            {showChart &&
                <FutureValueChart />
            }
        </div>
    );
}

export default FV
