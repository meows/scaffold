import type { Session, User } from "~/db/schema"

/** The type for a row of the Session table. */
export type Session = typeof Session["$inferSelect"]
/** The type for a row of the User table. */
export type User = typeof User["$inferSelect"]