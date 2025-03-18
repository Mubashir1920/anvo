import { ChartTooltip } from "@/components/ui/chart";
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Calculate Present Value data
const calculatePresentValue = (futureValue, rate, years, periodType, streams) => {
    if (streams.length > 0) return streams
    let periods = 0;
    switch (periodType) {
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
    for (let i = periods; i >= 0; i--) {
        const presentValue = futureValue / Math.pow(1 + rate, i);
        data.push({
            period: periods - i,
            presentValue: Number(presentValue.toFixed(2)),
        });
    }
    return data;
};

const ChartContainer = ({ children }) => {
    const style = {
        "--color-presentValue": "hsl(0, 80%, 30%)",
    };

    return <div style={style} className="w-full">{children}</div>;
};

const ChartTooltipContent = ({ active, payload }) => {
    if (!active || !payload || !payload.length) {
        return null;
    }

    return (
        <div className="rounded-lg border bg-background p-2 shadow-sm">
            <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center gap-1">
                    <div className="h-2 w-2 rounded-full" style={{ background: "var(--color-presentValue)" }}></div>
                    <span className="text-sm font-medium">Present Value:</span>
                </div>
                <div className="text-sm font-medium">${payload[0].value}</div>
            </div>
            <div className="mt-1 text-xs text-muted-foreground">Period: {payload[0].payload.period}</div>
        </div>
    );
};

const PresentValueChart = ({ futureValue, rate, years, periodType, streams }) => {
    const chartData = calculatePresentValue(futureValue, rate, years, periodType, streams);
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Present Value Chart</CardTitle>
                <CardDescription>
                    Present value of ${futureValue} in {years} years at {(rate * 100).toFixed(2)}% interest
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer>
                    <div style={{ width: "100%", height: "400px" }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 40,
                                    right: 40,
                                    left: 40,
                                    bottom: 40,
                                }}
                            >
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="period"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    label={{ value: "Number of years", position: "insideBottom", offset: -20 }}
                                    className="text-sm"
                                />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={8}
                                    tickFormatter={(value) => `$${value}`}
                                    label={{ value: "Present Value", offset: -20, angle: -90, position: "insideLeft" }}
                                    className="text-sm"
                                />
                                <Line
                                    dataKey="presentValue"
                                    type="monotone"
                                    stroke="var(--color-presentValue)"
                                    strokeWidth={2}
                                    dot={{
                                        fill: "var(--color-presentValue)",
                                        r: 4,
                                    }}
                                    activeDot={{
                                        r: 6,
                                    }}
                                >
                                    <LabelList
                                        dataKey="presentValue"
                                        position="top"
                                        offset={12}
                                        fill="#888"
                                        fontSize={12}
                                        formatter={(value) => `$${value}`}
                                    />
                                </Line>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Discounted at {(rate * 100).toFixed(2)}% per period <TrendingDown className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing present value decline over {years} years
                </div>
            </CardFooter>
        </Card >
    );
};

export default PresentValueChart;
