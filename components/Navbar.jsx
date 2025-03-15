import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./ui/navigation-menu"

import Link from "next/link";

const Navbar = () => {
    return (
        <div className="fixed top-5 left-1/2 bg-white/20 z-[100] transform flex items-center justify-between -translate-x-1/2 w-[50%] border rounded-3xl px-10 border-black backdrop-blur-lg text-black">
            <Link href='/' className="font-extrabold text-xl" >FINTECHIE</Link>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink>Documentation</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>

    )
}

export default Navbar
