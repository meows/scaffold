import ThemeSwitch from "#/ThemeSwitch"

type P = Readonly<{ children: React.ReactNode }>

// —————————————————————————————————————————————————————————————————————————————
// Layout :: Auth

export default function AuthLayout({ children }: P) {
  return (
    <div className="flex max-h-screen min-h-screen flex-col overflow-hidden bg-neutral-100 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-100">
      <TopMenu />
      <section className="p-4">
        {children}
      </section>
    </div>
  )
}

// -----------------------------------------------------------------------------
// Top Menu

function TopMenu() {
  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b-2 px-3">
      <span className="p-4 text-secondary-foreground">Meow App</span>
      <ThemeSwitch />
    </header>
  )
}
