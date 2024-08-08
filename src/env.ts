import { pipe, parse, string, url, safeParse } from "valibot"

// —————————————————————————————————————————————————————————————————————————————
// Validation

const is_url = pipe(string("Oops, not a string."), url("Oops, not a URL."))

// —————————————————————————————————————————————————————————————————————————————
// Environment Variables

export const DATABASE_URL = parse(string(), process.env.DATABASE_URL)

export const STREAM_URL = parse(string(), process.env.STREAM_URL)

export const API_PORT = parse(string(), process.env.API_PORT)
export const API_HOSTNAME = parse(string(), process.env.API_HOSTNAME)
export const API_PATH = parse(string(), process.env.API_PATH)

export const NEXT_PORT = parse(string(), process.env.NEXT_PORT)
export const NEXT_HOSTNAME = parse(string(), process.env.NEXT_HOSTNAME)

export const GATEWAY_PORT = parse(string(), process.env.GATEWAY_PORT)
export const GATEWAY_HOSTNAME = parse(string(), process.env.GATEWAY_HOSTNAME)

export const env = new Proxy({
  DATABASE_URL: safeParse(string(), DATABASE_URL),
  STREAM_URL: safeParse(string(), STREAM_URL),
  API_PORT: safeParse(string(), API_PORT),
  API_HOSTNAME: safeParse(string(), API_HOSTNAME),
  API_PATH: safeParse(string(), API_PATH),
  NEXT_PORT: safeParse(string(), NEXT_PORT),
  NEXT_HOSTNAME: safeParse(string(), NEXT_HOSTNAME),
  GATEWAY_PORT: safeParse(string(), GATEWAY_PORT),
  GATEWAY_HOSTNAME: safeParse(string(), GATEWAY_HOSTNAME),
} as const, {
  get(target, key) {
    const { success, output } = target[key as keyof typeof target]
    return success ? output : undefined
  }
})