
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import ThemeSwitchButton from "./ThemeSwitchButton"
import FeedbackForm from "./FeedbackForm"


export function Navbar() {
    return (
        <div className="w-full z-[100] motion-translate-x-in-0 motion-translate-y-in-[-130%]  p-4 fixed top-0 dark:border-b dark:border-white/10 shadow-sm bg-transparent backdrop-blur-sm dark:bg-black/30 " >
            <div className='mx-auto  md:px-10 px-2 flex items-center  justify-between    ' >
                <div>
                    <Link href='/'>
                        <h2 className="select-none cursor-pointer font-playfair font-bold text-[20px] tracking-tight " >Anvo</h2>
                    </Link>
                </div>

                <NavigationMenu className='md:block hidden'  >
                    <NavigationMenuList>
                        <NavigationMenuItem >
                            <Link href="/" legacyBehavior passHref>
                                <NavigationMenuLink className='bg-transparent'>
                                    Home
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='bg-transparent' >Calculators</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className=" grid w-[300px]  gap-3 p-4   ">
                                    <Link href="/future-value" passHref legacyBehavior>
                                        <ListItem title="Future Value">
                                            Calculate Future Value of Principal
                                        </ListItem>
                                    </Link>
                                    <Link href="/present-value" passHref legacyBehavior>
                                        <ListItem title="Present Value">
                                            Calculate Present Value of Principal
                                        </ListItem>
                                    </Link>
                                    <Link href="/irregular-calculator" passHref legacyBehavior>
                                        <ListItem title="Irregular Payment Stream">
                                            Calculate Present/Future Value
                                        </ListItem>
                                    </Link>
                                    <Link href="/loan-calculator" passHref legacyBehavior>
                                        <ListItem title="Loan Calculator">
                                            Ammortization Scheduler with Charts
                                        </ListItem>
                                    </Link>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='bg-transparent' >Annuities</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className=" grid w-[300px] gap-3 p-4   ">
                                    <Link href="/annuity-calculator" passHref legacyBehavior>
                                        <ListItem title="Annuity Calculator">
                                            Calculate Present/Future Value of Annuities
                                        </ListItem>
                                    </Link>
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='bg-transparent' >Feedback</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <FeedbackForm />
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>
                <ThemeSwitchButton />

            </div>
        </div>
    )
}

const ListItem = (({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"
