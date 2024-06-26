"use client"

import type { ReactNode } from "react"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

// —————————————————————————————————————————————————————————————————————————————
// Provider :: React Query

type P = { children: ReactNode }

export default function ReactQueryProvider({ children }: P) {
  const [queryClient] = useState(new QueryClient())
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
