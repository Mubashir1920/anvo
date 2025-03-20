import { OrdinaryAnnuity } from "@/components/ordinary-annuity"

export default function Home() {
    return (
        <main className="container mx-auto py-20 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Financial Calculator</h1>
            <div className="max-w-2xl mx-auto">
                <OrdinaryAnnuity />
            </div>
        </main>
    )
}