'use client'


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import FutureValueDashboard from "./future-value-dashboard"

const FV = () => {

    const [principalAmount, setPrinicpalValue] = useState(0);
    const [interestRate, setInterestRate] = useState(0);
    const [periodType, setPeriodType] = useState('yearly');
    const [years, setYears] = useState(0);



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
                            <Label htmlFor="years">Years :</Label>
                            <Input
                                type="number"
                                onWheel={(e) => e.target.blur()}
                                name="years"
                                placeholder="years"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full col-span-2 ">

                <FutureValueDashboard
                    principal={principalAmount}
                    rate={interestRate / 100}
                    periodType={periodType}
                    years={years}
                />

            </div>
        </div>
    );
}


export default FV
