import { AnnuityDueCalculator } from "@/components/annuity-due-calculator"
import { OrdinaryAnnuity } from "@/components/ordinary-annuity"

export default function Home() {
    return (
        <main className="container grid grid-cols-1 lg:grid-cols-2 gap-2 mx-auto py-20 px-4">
            <div className="max-w-2xl mx-auto">
                <OrdinaryAnnuity />
            </div>
            <div className="max-w-2xl mx-auto">
                <AnnuityDueCalculator />
            </div>
        </main>
    )
}