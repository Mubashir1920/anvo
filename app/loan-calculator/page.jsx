import LoanCalculator from '@/components/loan-calculator'


export const metadata = {
    title: "Loan Calculator - Anvo",
    description: "Calculate Loan with Ammortization Scheduler and our dynamic graphs with our financial calculator.",
    keywords: "loan Calculator, financial planning, investment, fintech tools",
    openGraph: {
        title: "Annuity Calculator - Anvo",
        description: "Calculate Loan with Ammortization Scheduler and our dynamic graphs with our financial calculator.",
        type: "website",
        url: "https://anvo.vercel.app/annuity-calculator",
        images: [{ url: "https://anvo.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Loan Calculator" }]
    }
};

const page = () => {
    return (
        <main className="container flex-grow   mx-auto flex items-start  pt-5">
            <LoanCalculator />
        </main>
    )
}

export default page
