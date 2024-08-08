import type { App } from "~/server"

import { treaty } from "@elysiajs/eden"
import { parse, string } from "valibot"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const API_URL = parse(string(), process.env.NEXT_PUBLIC_GATEWAY_URL)

// —————————————————————————————————————————————————————————————————————————————
// Elysia API Client

/**
 * Promise-based API client for the frontend.
 * @example
 * const { data } = await client.api.hello({ name: "world" }).get()
 */
const client = treaty<App>(API_URL)

// -----------------------------------------------------------------------------
// Export

export default client
