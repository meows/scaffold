import { pipe, parse, string, url } from "valibot"

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
