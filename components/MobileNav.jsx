import { AlignJustify, ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import FeedbackForm from "./FeedbackForm"


const menuItems = [
    { name: "Calculators", state: "isCalculators" },
    { name: "Annuities", state: "isAnnuity" },
    { name: "Feedback", state: "isFeedback" },
];

const calculators = [
    { route: "/future-value", name: "Future Value" },
    { route: "/present-value", name: "Present Value" },
    { route: "/irregular-calculator", name: "Irregular Payments" },
    { route: "/loan-calculator", name: "Loan Calculator" },
];

const annuities = [
    { route: "/annuity-calculator", name: "Ordinary Annuity" },
    { route: "/annuity-calculator", name: "Annuity Due" },
];


const MobileNav = () => {

    const [isShow, setIsShow] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const navRef = useRef()

    useEffect(() => {
        document.body.style.overflow = isShow ? "hidden" : "auto";
    }, [isShow]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (navRef.current && !navRef.current.contains(e.target)) {
                setIsShow(false);
                setActiveMenu(null);
            }
        };

        if (isShow) {
            document.addEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isShow])



    return (
        <div>
            <div className="flex flex-col   relative  md:hidden" >
                <AlignJustify
                    onClick={() => setIsShow(prev => true)}
                    className={` cursor-pointer  `}
                />
                <div className={`${isShow ? 'block' : 'hidden'}  fixed w-full h-[100dvh] top-0 right-0 z-[140] bg-black/30 `} ></div>
                <div ref={navRef}
                    className={`${isShow ? 'translate-x-0  ' : '  translate-x-full'} bg-white border p-15 fixed top-0 right-0  dark:bg-black  w-[70vw] h-[100dvh] z-[150]  transition-all duration-300 `}
                >
                    <X
                        onClick={() => setIsShow(prev => false)}
                        className={` absolute right-15 top-15 cursor-pointer `}
                        size={27}
                    />
                    <nav className=" flex flex-col gap-8 text-lg  mt-20" >
                        <Link
                            href='/'
                            onClick={() => { setIsShow(false); setActiveMenu(false) }}
                        >
                            Home
                        </Link>
                        {menuItems.map((item) => (
                            <p
                                key={item.name}
                                className="cursor-pointer r"
                                onClick={() => setActiveMenu(item.state)}
                            >
                                {item.name} <ChevronRight className="inline-block" size={18} />
                            </p>
                        ))}

                    </nav>
                </div>
            </div>
            {/* Submenus */}
            {["isCalculators", "isAnnuity", "isFeedback"].map((menu) => (
                <div
                    key={menu}
                    className={`fixed top-0 right-0 w-[70vw]  bg-white h-[100dvh] dark:bg-black p-10 border z-[160] transition-transform duration-300 ${activeMenu === menu ? "translate-x-0" : "translate-x-full"}`}
                >
                    <span className="absolute left-5 top-10 flex items-center gap-2 cursor-pointer" onClick={() => setActiveMenu(null)}>
                        <ChevronLeft /> <h3>{menu.replace("is", "")}</h3>
                    </span>
                    <div className="mt-16 flex flex-col gap-5 text-lg">
                        {menu === "isCalculators" && (
                            <>
                                <p className="text-sm text-gray-500 dark:text-gray-200">Calculate Present or Future Values of Principal Amount</p>
                                {calculators.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.route}
                                        className="border-b hover:border-white pb-4 duration-300"
                                        onClick={() => { setIsShow(false); setActiveMenu(false) }}
                                    >
                                        {item.name} <ArrowUpRight className="inline-block ml-3" />
                                    </Link>
                                ))}
                            </>
                        )}
                        {menu === "isAnnuity" && (
                            <>
                                <p className="text-sm text-gray-500 dark:text-gray-200">Calculate Present and Future Values of Your Annuities</p>
                                {annuities.map((item, idx) => (
                                    <Link
                                        key={idx}
                                        href={item.route}
                                        onClick={() => { setIsShow(false); setActiveMenu(false) }}
                                        className="border-b hover:border-white pb-4 duration-300"
                                    >
                                        {item.name} <ArrowUpRight className="inline-block ml-3" />
                                    </Link>
                                ))}
                            </>
                        )}
                        {menu === "isFeedback" && (
                            <>
                                <p className="text-sm text-gray-500 dark:text-gray-200">Share Your Valuable Feedback</p>
                                <FeedbackForm />
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MobileNav
