import FutureValueChart from "./future-value-chart"
import FutureValueTable from "./future-value-table"

const FutureValueDashboard = ({ principal , rate , years , periodType  }) => {
  return (
    <div className="space-y-8">
      <FutureValueChart periodType={periodType} principal={principal} rate={rate} years={years} />
      <FutureValueTable periodType={periodType} principal={principal} rate={rate} years={years} />
    </div>
  )
}

export default FutureValueDashboard

