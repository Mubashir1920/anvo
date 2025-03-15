import FutureValueChart from "./future-value-chart"
import FutureValueTable from "./future-value-table"

const FutureValueDashboard = ({ principal = 1000, rate = 0.05, periods = 10 }) => {
  return (
    <div className="space-y-8">
      <FutureValueChart principal={principal} rate={rate} periods={periods} />
      <FutureValueTable principal={principal} rate={rate} periods={periods} />
    </div>
  )
}

export default FutureValueDashboard

