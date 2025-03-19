import IrregularCashFlowCalculator from "@/components/irregular-cash-flow-calculator"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Irregular Cash Flow Calculator</h1>
      <IrregularCashFlowCalculator />
    </main>
  )
}

