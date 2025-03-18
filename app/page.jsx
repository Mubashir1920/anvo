import { ArrowUpRight } from "lucide-react";
import Link from "next/link";



export default function Home() {
  return (
    <div className="container flex-grow    mx-auto flex justify-center items-start  pt-20">
      <div className="py-8 text-center ">

        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Take Decisions Smartly
          <br />
          With Financial Calulators
        </h1>
        <p className="mb-8 text-lg  text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          Tools That Help to Calculate and take decision rationally and smartly.
        </p>
        <div className="grid grid-cols-1 grid-flow-row lg:grid-cols-3 gap-5 lg:gap-10">
          {/* Future Value Calculator Box */}
          <Link href='/future-value'>
            <div className="border relative cursor-pointer shadow-sm group dark:hover:bg-green-950/70  duration-200   hover:border-green-300 hover:bg-green-50 dark:hover:border-green-800   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Future Value Finder
              </h3>
              <p className="text-gray-500 text-sm" >Easily Calculate the Future Value of Your Principal Amount </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:scale-105 duration-300 " />
            </div>
          </Link>
          {/* Present Value Calculator Box */}
          <Link href='/present-value'>
            <div className="border relative group cursor-pointer shadow-sm  group  duration-200   hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 dark:hover:border-purple-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Present Value Finder
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >Easily Calculate the Present Value of Your Future Amount </p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:scale-105 duration-300 " />
            </div>
          </Link>
          {/* Irregular Payment Stream Calculator */}
          <Link href='/irregular-calculator'>
            <div className="border relative group cursor-pointer shadow-sm  group  duration-200   hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/50 dark:hover:border-purple-950   rounded-sm p-5 text-left" >
              <h3 className="font-semibold " >
                Irregular Payment Stream
              </h3>
              <p className="text-gray-500 dark:group-hover:text-gray-400  text-sm" >Easily Calculate Value of Your Irregular Payment Streams</p>
              <ArrowUpRight size={22} className="absolute right-3 top-3 group-hover:scale-105 duration-300 " />
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
}
