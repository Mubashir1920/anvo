import { AnnuityCalculator } from "@/components/annuity"


export const metadata = {
    title: "Annuity Calculator - Anvo",
    description: "Calculate present and future values of your ordinary annuity or annuity due with our financial calculator.",
    keywords: "Annuity Calculator, Ordinary Annuity, Annuity Due, financial planning, investment, fintech tools",
    openGraph: {
        title: "Annuity Calculator - Anvo",
        description: "Calculate present and future values of your ordinary annuity or annuity due with our financial calculator.",
        type: "website",
        url: "https://anvo.vercel.app/annuity-calculator",
        images: [{ url: "https://anvo.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Annuity Calculator" }]
    }
};

export default function Home() {
    return (
        <main className="container mx-auto py-20 px-4">
            <AnnuityCalculator />
        </main>
    )
}