'use client'
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Moon, SunIcon } from "lucide-react"

const ThemeSwitchButton = ({ className }) => {

    return (

        <Button
            onClick={(e) => {
                e.preventDefault()
                const body = document.querySelector('body')
                body.classList.toggle('dark')
            }}
            variant="outline"
            size="icon"
            className={cn("cursor-pointer text-xs font-bold ", className)}
        >
            <SunIcon className="inline-block dark:hidden  " />
            <Moon className="hidden dark:inline-block  " />
        </Button>
    )
}

export default ThemeSwitchButton


