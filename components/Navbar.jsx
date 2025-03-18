
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

const components = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

export function Navbar() {
    return (
        <div className="w-full z-[100] p-4 fixed top-0 dark:border-b dark:border-white/10 shadow-sm bg-white/60 dark:bg-black/60 backdrop-blur-lg " >
            <div>
                <h2 className=" font-playfair  fixed top-6 left-16  font-extrabold tracking-tight " >FINTECHIE</h2>
            </div>
            <NavigationMenu className='mx-auto flex items-center justify-between' >
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
                            <ul className="grid gap-3 p-2 md:w-[300px] lg:w-[300px] lg:grid-cols-1">
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
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className='bg-transparent' >Components</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {components.map((component) => (
                                    <ListItem
                                        key={component.title}
                                        title={component.title}
                                        href={component.href}
                                    >
                                        {component.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className='bg-transparent'>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
            <ThemeSwitchButton className='absolute right-5 top-5'  />

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
