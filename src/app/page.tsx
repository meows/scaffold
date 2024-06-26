"use client"

import { useQuery } from "@tanstack/react-query"

import client from "~/server/client"

// —————————————————————————————————————————————————————————————————————————————
// Environment

async function queryFn() {
  const query = await client.api.user.whoami.get()
}

// —————————————————————————————————————————————————————————————————————————————
// Page Root

export default function Home() {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => client.api.user.whoami.get(),
    retry: (failed, err) => failed < 3 && err.cause !== 500,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError || !data) return <div>{`There was an error: ${error}.`}</div>

  return (
    <main className="flex h-svh flex-col gap-2 bg-green-800 p-2">
      <h2>Success</h2>
      <p>{JSON.stringify(data)}</p>
    </main>
  )
}
