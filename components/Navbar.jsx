
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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "./ui/label"
import { Button } from "./ui/button"
import { submitFeedback } from "@/lib/submitFeedback"




export function Navbar() {
    return (
        <div className="w-full z-[100]  p-4 fixed top-0 dark:border-b dark:border-white/10 shadow-sm bg-white/60 dark:bg-black/60 backdrop-blur-lg " >
            <div className='mx-auto  px-10 flex items-center justify-between    ' >
                <div>
                    <h2 className=" font-playfair font-extrabold text-[18px] tracking-tight " >FINTECHIE</h2>
                </div>

                <NavigationMenu  >
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
                                <ul className=" grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger className='bg-transparent' >Feedback</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <form action={submitFeedback}>
                                    <ul className="grid w-[400px] p-4">
                                        <Label className="mb-2">Write Your Feedback Here</Label>
                                        <Textarea name="feedback" required />
                                        <Button className="mt-2" type="submit">
                                            Send Feedback
                                        </Button>
                                    </ul>

                                </form>
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
