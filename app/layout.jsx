import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Head from "next/head";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['200', '400', '600', '700', '800'],
  subsets: ["latin"],
});

export const metadata = {
  title: "Anvo - Financial Application",
  description: "Financial tools to help you make smarter decisions...",
  keywords: "financial calculator, AI finance tools, future value...",
  author: "Muhammad Mubashir",
  robots: "index, follow",
  openGraph: {
    title: "Anvo - Financial Application",
    description: "AI-powered financial tools...",
    type: "website",
    url: "https://anvo.vercel.app",
    image: "https://anvo.vercel.app/og-image.jpg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anvo - Financial Application",
    description: "Smart AI-driven financial calculators...",
    image: "https://anvo.vercel.app/twitter-image.jpg",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body
        className={`${poppins.variable} font-poppins dark:bg-black dark:text-foreground transition-colors duration-100 flex flex-col min-h-screen antialiased`}
      >
        <GoogleAnalytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
