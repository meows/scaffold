import { pipe, parse, string, url } from "valibot"

// —————————————————————————————————————————————————————————————————————————————
// Validation

const is_url = pipe(string("Oops, not a string."), url("Oops, not a URL."))

// —————————————————————————————————————————————————————————————————————————————
// Environment Variables

/** Database endpoint. */
export const DATABASE_URL = parse(string(), process.env.DATABASE_URL)

/** Event stream endpoint. */
export const STREAM_URL = parse(is_url, process.env.STREAM_URL)

/** API server port. */
export const API_PORT = parse(string(), process.env.API_PORT)

/** API server endpoint. */
export const API_URL = parse(is_url, process.env.API_URL)

/** Next server endpoint. */
export const NEXT_URL = parse(is_url, process.env.NEXT_URL)