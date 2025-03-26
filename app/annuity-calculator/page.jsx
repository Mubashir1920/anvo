import { AnnuityDueCalculator } from "@/components/annuity-due-calculator"
import { OrdinaryAnnuity } from "@/components/ordinary-annuity"


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
        <div>Hello</div>
    )
}