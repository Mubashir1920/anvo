'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"
import MobileNav from "./MobileNav"

const ThemeSwitchButton = ({ className }) => {
    const storageKey = "theme";

    const getUserPreference = () => {
        if (typeof window !== "undefined") {
            const storedTheme = window.localStorage.getItem(storageKey);
            if (storedTheme) return storedTheme;
            return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        }
        return "light";
    };

    const [mode, setMode] = useState(getUserPreference());


    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        window.localStorage.setItem(storageKey, mode);
    }, [mode]);

    return (
        <div className="flex items-center gap-5" >
            <Button
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
                variant="outline"
                size="icon"
                className={cn("cursor-pointer bg-transparent border-none text-xs font-bold", className)}
            >
                <SunIcon className="dark:hidden" />
                <Moon className="hidden dark:inline-block" />
            </Button>
            <MobileNav />
        </div>
    );
};

export default ThemeSwitchButton;
