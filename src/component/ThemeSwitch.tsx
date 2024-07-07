"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "#/ui/button"
import { toast } from "sonner"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "#/ui/dropdown-menu"

// —————————————————————————————————————————————————————————————————————————————
// Environment

type P = React.ComponentProps<typeof DropdownMenu>

// —————————————————————————————————————————————————————————————————————————————
// Component

/** A small sun or moon icon to trigger color theme. */
export default function ThemeSwitch(props: P) {
  const { setTheme, resolvedTheme, theme } = useTheme()

  const toLight = () => {
    if (theme === "light") return
    setTheme("light")
    toast.success("Theme changed to light.", {
      action: {
        label: "Undo",
        onClick: () => {
          setTheme("dark")
          toast.info("Theme changed to dark.")
        },
      },
    })
  }

  const toDark = () => {
    if (theme === "dark") return
    setTheme("dark")
    toast.success("Theme changed to dark.", {
      action: {
        label: "Undo",
        onClick: () => {
          setTheme("light")
          toast.info("Theme changed to light.")
        },
      },
    })
  }

  const toSystem = () => {
    if (theme === "system") return
    setTheme("system")
    toast.success("Theme changed to system.", {
      action: {
        label: "Undo",
        onClick: () => {
          setTheme("light")
          toast.info("Theme changed to light.")
        },
      },
    })
  }

  return (
    <DropdownMenu {...props}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="dark:-rotate-90 h-5 w-5 rotate-0 scale-100 transition-all dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={toLight}
          disabled={theme === "light"}
          className="flex cursor-pointer items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          light
          <Sun className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={toDark}
          disabled={theme === "dark"}
          className="flex cursor-pointer items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          dark
          <Moon className="size-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={toSystem}
          disabled={theme === "system"}
          className="flex cursor-pointer items-center justify-between disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          system
          <Monitor className="size-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
