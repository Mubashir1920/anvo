import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";


const poppins = Poppins({
  variable: "--font-poppins",
  weight: ['200', '400', '600', '700', '800'],
  subsets: ["latin"],
});


export const metadata = {
  title: "FINTECHIE",
  description: "AI Powered Financial Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} font-poppins flex flex-col min-h-screen  antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
