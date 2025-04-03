'use client'
import { useState } from "react";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import PresentValueChart from "./present-value-chart";
import PresentValueTable from "./present-value-table";


const PV = () => {

    const [futureAmount, setFutureAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [periodType, setPeriodType] = useState('yearly');
    const [years, setYears] = useState('');


    return (
        <div className="grid grid-cols-1 lg:grid-cols-3  lg:gap-6 gap-y-5 w-full pt-20">
            <div className="w-full col-span-1 ">
                <div className="sticky border top-20 p-4 rounded-md shadow-md">
                    <h1 className="text-xl font-bold mb-5">Calculate Present Value</h1>
                    <form className=" space-y-6 flex items-center flex-wrap gap-x-7  w-full">
                        <div className="w-full space-y-4 " >
                            <div className="grid w-full max-w-full items-center gap-1.5">
                                <Label htmlFor="fv">Future Amount :</Label>
                                <Input
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    name="fv"
                                    placeholder="Future Amount"
                                    value={futureAmount}
                                    onChange={(e) => setFutureAmount(e.target.value)}
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
                                <Label htmlFor="periodType">Compounding Frequency</Label>
                                <Select value={periodType} onValueChange={setPeriodType}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily (360 Days)</SelectItem>
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
                                    placeholder="Years"
                                    value={years}
                                    onChange={(e) => setYears(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="w-full col-span-2 space-y-4  ">
                <PresentValueChart futureValue={futureAmount} rate={interestRate / 100} years={years} periodType={periodType} />
                <PresentValueTable futureValue={futureAmount} rate={interestRate / 100} years={years} periodType={periodType} />

            </div>
        </div>
    )
}

export default PV
