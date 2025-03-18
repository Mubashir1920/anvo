import PresentValueChart from "./present-value-chart"
import PresentValueTable from "./present-value-table"


const PresentValueDashboard = ({ futureValue, rate, years, periodType, streams }) => {
    return (
        <div className="space-y-8">
            <PresentValueChart streams={streams} futureValue={futureValue} rate={rate} years={years} periodType={periodType} />
            <PresentValueTable streams={streams} futureValue={futureValue} rate={rate} years={years} periodType={periodType} />
        </div>
    )
}

export default PresentValueDashboard

