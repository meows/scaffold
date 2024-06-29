import { sql } from "drizzle-orm"
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const time = (name:string) => integer(name, {mode:"timestamp"}).default(sql`CURRENT_TIMESTAMP`)

// —————————————————————————————————————————————————————————————————————————————
// Account

export const User = sqliteTable("user", {
  id:    text("id").primaryKey(),
  email: text("email").unique().notNull(),
  hash:  text("hash").notNull(),
})

export const Session = sqliteTable("session", {
  id:        text("id").primaryKey(),
  userId:    text("user_id").notNull().references(() => User.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at").notNull(),
})

// —————————————————————————————————————————————————————————————————————————————
// Chat

export const Chat = sqliteTable("room", {
  id:      integer("id").primaryKey(),
  author:  text("author").notNull().references(() => User.id),
  message: text("message").notNull(),
  posted:  time("posted").notNull(),
})

// https://lucia-auth.com/database/drizzle