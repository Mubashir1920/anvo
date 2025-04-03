import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculatePresentValue = (futureValue, rate, years, periodType) => {
    let periods = 0;
    switch (periodType) {
        case 'daily':
            periods = 360 * years;
            break;
        case 'monthly':
            periods = 12 * years;
            break;
        case 'quarterly':
            periods = 4 * years;
            break;
        case 'semiAnnually':
            periods = 2 * years;
            break;
        default:
            periods = years;
            break;
    }
    const data = [];
    for (let i = 0; i <= periods; i++) {
        const presentValue = futureValue / Math.pow(1 + rate, i);
        data.push({
            period: periods - i,
            presentValue: Number(presentValue.toFixed(2)),
        });
    }
    return data; // Display in descending order
};

const PresentValueTable = ({ futureValue, rate, years, periodType }) => {
    const tableData = calculatePresentValue(futureValue, rate, years, periodType);

    return (
        <Card className="w-full h-[600px] ">
            <CardHeader>
                <CardTitle>Present Value Table</CardTitle>
                <CardDescription>
                    ${futureValue.toLocaleString()} future value discounted at {(rate * 100).toFixed(2)}% interest
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="overflow-y-scroll h-[500px]  ">
                    <table className="w-full border-collapse">
                        <thead className="sticky top-0 bg-background">
                            <tr className="border-b">
                                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Period</th>
                                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Present Value</th>
                                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, index) => {
                                const previousValue = index > 0 ? tableData[index - 1].presentValue : row.presentValue;
                                const decline = previousValue - row.presentValue;
                                const declinePercentage = previousValue !== 0 ? (decline / previousValue) * 100 : 0;

                                return (
                                    <tr key={row.period} className="border-b hover:bg-muted/50 transition-colors">
                                        <td className="py-3 px-4">{row.period.toFixed(0) }</td>
                                        <td className="py-3 px-4 text-right font-medium">${row.presentValue.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-right">
                                            {index > 0 ? (
                                                <span className="text-red-600">
                                                    -${decline.toFixed(2)} ({declinePercentage.toFixed(2)}%)
                                                </span>
                                            ) : (
                                                <span className="text-muted-foreground">—</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
};

export default PresentValueTable;
