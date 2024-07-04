"use client"
import "./globals.css"

import { ThemeProvider } from 'next-themes'
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

// -----------------------------------------------------------------------------
// Internal

import fonts from "~/app/font"
import QueryProvider from "~/state/react-query"

import { Toaster } from "#/ui/sonner"

// —————————————————————————————————————————————————————————————————————————————
// Layout Root

type P = Readonly<{ children: React.ReactNode }>

export default function RootLayout({ children }: P) {
  return (
    // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
    <html lang="en" suppressHydrationWarning>
      <body className={fonts}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
            {/* <ReactQueryDevtools initialIsOpen /> */}
            <Toaster duration={5000} richColors position="bottom-center" />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
