import { pipe, string, email, minLength, maxLength } from "valibot"

export const schema_email = pipe(string(), email("Invalid email address."))
export const schema_password = pipe(
  string(),
  minLength(8, "Must be at least 8 characters long."),
  maxLength(64, "Password must not exceed 64 characters.")
)