import { pipe, parse, string, url } from "valibot"

// —————————————————————————————————————————————————————————————————————————————
// Validation

const is_url = pipe(string("Oops, not a string."), url("Oops, not a URL."))

export const DATABASE_URL = parse(is_url, process.env.DATABASE_URL)