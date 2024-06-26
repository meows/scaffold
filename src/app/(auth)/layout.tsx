import ThemeSwitch from "#/ThemeSwitch"

type P = Readonly<{ children: React.ReactNode }>

// —————————————————————————————————————————————————————————————————————————————
// Layout :: Auth

export default function AuthLayout({ children }: P) {
  return (
    <div className="relative">
      <TopMenu />
      {children}
    </div>
  )
}

// -----------------------------------------------------------------------------
// Top Menu

function TopMenu() {
  return (
    <header className="absolute top-0 z-10 flex w-full items-center justify-between bg-secondary px-3">
      <span className="p-4 text-secondary-foreground">Top Menu</span>
      <ThemeSwitch />
    </header>
  )
}
