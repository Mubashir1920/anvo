
import PV from "@/components/PV";

export const metadata = {
    title: "Present Value Calculator - Anvo",
    description: "Easily calculate the present value of your future amount with our  financial calculator.",
    keywords: "Present Value Calculator, financial planning, investment discounting, time value of money, fintech tools",
    openGraph: {
        title: "Present Value Calculator - Anvo",
        description: "Easily calculate the present value of your future amount with our  financial calculator.",
        type: "website",
        url: "https://yourwebsite.com/present-value",
        images: [{ url: "https://yourwebsite.com/og-image.jpg", width: 1200, height: 630, alt: "Present Value Calculator" }]
    }
};

export default function Home() {
    return (
        <div className="container flex-grow   mx-auto flex items-start  pt-5">
            {/* Calulate the Present  Value of Future Amount */}
            <PV />
        </div>
    );
}
