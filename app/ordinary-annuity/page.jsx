import { OrdinaryAnnuity } from "@/components/annuity"
export const metadata = {
    title: "Annuity Calculator - Anvo",
    description: "Calculate present and future values of your ordinary annuity or annuity due with our financial calculator.",
    keywords: "Annuity Calculator, Ordinary Annuity, Annuity Due, financial planning, investment, fintech tools",
    openGraph: {
        title: "Annuity Calculator - Anvo",
        description: "Calculate present and future values of your ordinary annuity or annuity due with our financial calculator.",
        type: "website",
        url: "https://yourwebsite.com/annuity-calculator",
        images: [{ url: "https://yourwebsite.com/og-image.jpg", width: 1200, height: 630, alt: "Annuity Calculator" }]
    }
};

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