import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Financial Calculators | Smart Decision Making",
  description: "Use  financial calculators to make smart and rational decisions. Calculate future value, present value, annuities, and irregular payment streams.",
  keywords: "financial calculator, future value, present value, annuity calculator, irregular payments, smart finance",
  openGraph: {
    title: "Financial Calculators | Smart Decision Making",
    description: " financial tools to help you calculate and make informed financial decisions.",
    url: "https://anvo.vercel.app",
    type: "website",
  },
};



export default function Home() {
  return (
    <div className="container flex-grow    mx-auto flex justify-center items-start  pt-20">
      <div className="py-8 text-center ">

        <div className="overflow-hidden" >
          <h1 className="mb-4 text-4xl  font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Know Before You Act
            <br />
            Use Smart Calculators
          </h1>
        </div>
        <p className="mb-8 text-lg  text-gray-500 dark:text-primary lg:text-xl sm:px-16 xl:px-48">
          One small calculation today could save you thousands tomorrow!
        </p>
        <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-3 gap-5 lg:gap-2">
          {/* Future Value Calculator Box */}
          <Link href='/future-value'>
            <div className="border relative  cursor-pointer shadow-sm group dark:hover:bg-green-950/70  duration-200   hover:border-green-300 hover:bg-green-50 dark:hover:border-green-800   rounded-sm p-5 text-left  " >
              <h3 className="font-semibold " >
                Future Value Calculator
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400 text-sm" >
                Effortlessly calculate the future value of your principal amount!
              </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:right-2 group-hover:top-2 duration-300 " />
            </div>
          </Link>
          {/* Present Value Calculator Box */}
          <Link href='/present-value'>
            <div className="border relative  group cursor-pointer shadow-sm duration-200    hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 dark:hover:border-purple-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Present Value Calculator
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >
                Quickly find out the present value of your future amount with ease!
              </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:right-2 group-hover:top-2 duration-300 " />
            </div>
          </Link>
          {/* Irregular Payment Stream Calculator */}
          <Link href='/irregular-calculator'>
            <div className="border relative  group cursor-pointer  shadow-sm duration-200   hover:border-red-300 hover:bg-red-50 dark:hover:bg-red-950/50 dark:hover:border-red-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Irregular Payment Stream Calculator
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >
                Quickly calculate the value of your irregular payment streams with ease!
              </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:right-2 group-hover:top-2 duration-300 " />
            </div>
          </Link>
          {/*  Annuity Calculator */}
          <Link href='/annuity-calculator'>
            <div className="border relative  group cursor-pointer  shadow-sm duration-200   hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/50 dark:hover:border-blue-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Annuity Value Calculator
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >
                Easily calculate the present and future values of your ordinary annuity or annuity due!
              </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:right-2 group-hover:top-2 duration-300 " />
            </div>
          </Link>
          <Link href='/loan-calculator'>
            <div className="border relative  group cursor-pointer  shadow-sm duration-200   hover:border-pink-300 hover:bg-pink-50 dark:hover:bg-pink-950/50 dark:hover:border-pink-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Loan Amount & Interest Calculator
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >
                Analyze loan amounts and interest effortlessly with interactive graphs and tables!
              </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3  group-hover:right-2 group-hover:top-2 duration-300 " />
              {/* <span className="absolute top-3 right-3 py-1 px-2 bg-red-200 dark:text-black text-[10px]" >New!</span> */}
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
