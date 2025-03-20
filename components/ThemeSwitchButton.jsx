'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, SunIcon } from "lucide-react"
import { useEffect, useState } from "react"

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
        <Button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            variant="outline"
            size="icon"
            className={cn("cursor-pointer text-xs font-bold", className)}
        >
            <SunIcon className="dark:hidden" />
            <Moon className="hidden dark:inline-block" />
        </Button>
    );
};

export default ThemeSwitchButton;
