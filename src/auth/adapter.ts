import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"

import { User, Session } from "~/db/schema"
import { db } from "~/db/client"

// —————————————————————————————————————————————————————————————————————————————
// Adapter

// https://lucia-auth.com/database/drizzle

export const adapter = new DrizzleSQLiteAdapter(db, Session, User)