import FV from "@/components/FV";


export const metadata = {
    title: "Future Value Calculator - Anvo",
    description: "Easily calculate the future value of your principal amount with our financial calculator.",
    keywords: "Future Value Calculator, financial planning, investment growth, compound interest, fintech tools",
    openGraph: {
        title: "Future Value Calculator - Anvo",
        description: "Easily calculate the future value of your principal amount with  financial calculator.",
        type: "website",
        url: "https://anvo.vercel.app/future-value",
        images: [{ url: "https://anvo.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Future Value Calculator" }]
    }
};

export default function Home() {
    return (
        <main className="container flex-grow   mx-auto flex items-start  pt-5">
            {/* Calulate the Future Value of Principal Amount */}
            <FV />
        </main>
    );
}
