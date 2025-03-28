import IrregularCashFlowCalculator from "@/components/irregular-cash-flow-calculator"

export const metadata = {
    title: "Irregular Cash Flow Calculator - Anvo",
    description: "Calculate the present and future value of an unequal stream of payments with our financial calculator.",
    keywords: "Irregular Cash Flow Calculator, Unequal Payments, Present Value, Future Value, financial planning, investment, fintech tools",
    openGraph: {
        title: "Irregular Cash Flow Calculator - Anvo",
        description: "Calculate the present and future value of an unequal stream of payments with our financial calculator.",
        type: "website",
        url: "https://anvo.vercel.app/irregular-cash-flow-calculator",
        images: [{ url: "https://anvo.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Irregular Cash Flow Calculator" }]
    }
};


export default function Home() {
    return (
        <main className="container flex-grow w-full   mx-auto    pt-20 px-4">
            <IrregularCashFlowCalculator />
        </main>
    )
}

