import type { App } from "~/server"

import { treaty } from "@elysiajs/eden"
import { API_URL } from "~/constant/config"

// —————————————————————————————————————————————————————————————————————————————
// Elysia API Client

/**
 * Promise-based API client for the frontend.
 * @example
 * const { data } = await client.api.hello({ name: "world" }).get()
 */
const client = treaty<App>("https://localhost:5555/eden")

// -----------------------------------------------------------------------------
// Export

export default client
