import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

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
        className={`${poppins.variable} font-poppins  antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
