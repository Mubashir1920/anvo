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
import { useEffect, useState } from "react"
import FutureValueDashboard from "./future-value-dashboard"

const FV = () => {

    const [principalAmount, setPrinicpalValue] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [periodType, setPeriodType] = useState("");
    const [periods, setPeriods] = useState("");
    const [showChart, setShowChart] = useState(false)

    // const handleFormSubmit = (e) => {
    //     e.preventDefault();
    //     setShowChart(true)
    // };

    // Update the chart dynamically whenever input values change
    useEffect(() => {
        if (principalAmount > 0 && interestRate > 0 && periods > 0) {
            setShowChart(true);
        } else {
            setShowChart(false);
        }
    }, [principalAmount, interestRate, periods]);


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3  lg:gap-6 gap-y-5 w-full pt-20">
            <div className="w-full col-span-1 ">
                <div className="sticky border top-20 p-4 rounded-md shadow-md">
                    <h1 className="text-xl font-bold mb-5">Calculate Future Value</h1>
                    <form className=" space-y-4 flex items-center flex-wrap gap-x-7 w-full">

                        <div className="grid w-full max-w-full items-center gap-1.5">
                            <Label htmlFor="pv">Principal Amount :</Label>
                            <Input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                name="pv"
                                placeholder="Principal Amount"
                                value={principalAmount}
                                onChange={(e) => setPrinicpalValue(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w-full items-center gap-1.5">
                            <Label htmlFor="interestRate">Interest Rate :</Label>
                            <Input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                name="interestRate"
                                placeholder="Interest Rate %"
                                value={interestRate}
                                onChange={(e) => setInterestRate(e.target.value)}
                            />
                        </div>

                        <div className="grid w-full max-w-full items-center gap-1.5">
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

                        <div className="grid w-full max-w-full items-center gap-1.5">
                            <Label htmlFor="periods">Periods :</Label>
                            <Input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                name="periods"
                                placeholder="Periods"
                                value={periods}
                                onChange={(e) => setPeriods(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full col-span-2 ">
                {showChart && (
                    <FutureValueDashboard
                        principal={Number(principalAmount)}
                        rate={Number(interestRate / 100)}
                        periods={Number(periods)}
                    />
                )}
            </div>
        </div>
    );
}


export default FV
