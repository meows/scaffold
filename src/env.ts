import { pipe, parse, string, url } from "valibot"

// —————————————————————————————————————————————————————————————————————————————
// Validation

const is_url = pipe(string("Oops, not a string."), url("Oops, not a URL."))

// —————————————————————————————————————————————————————————————————————————————
// Environment Variables

export const DATABASE_URL = parse(is_url, process.env.DATABASE_URL)
export const STREAM_URL   = parse(is_url, process.env.STREAM_URL)
export const SERVER_URL   = parse(is_url, process.env.SERVER_URL)