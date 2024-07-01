import { generateId } from "lucia"
import { hash as argon2 } from "@node-rs/argon2"

import { throwError } from "~/lib/lambda"
import { randomNat } from "~/lib/random"
import { green } from "~/lib/console"
import { db } from "~/db/client"
import { Chat, Room, User } from "~/db/schema"

// —————————————————————————————————————————————————————————————————————————————
// Mock Data

const usersᐟ = [
  { email: "joe@gmail.com", password: "secret password" },
  { email: "bob@gmail.com", password: "secret password" },
]

const chatsᐟ = [
  "Hello, world!",
  "How are you?",
  "What's up?",
  "Good morning!",
  "Good night!",
]

const users = await Promise.all(usersᐟ.map(async ({ email, password }) => ({
  email,
  hash: await argon2(password),
  id: generateId(15),
})))

const rooms = [
  { name: "General", owner: users[0].id },
  { name: "Random", owner: users[1].id },
]

const chats = chatsᐟ.map((message, id) => ({
  id,
  author: users[randomNat(users.length)].id,
  message,
  posted: new Date(),
}))

// export const Room = sqliteTable("room", {
//   id:   integer("id").primaryKey(),
//   name: text("name").notNull(),
// })

// export const Chat = sqliteTable("chat", {
//   id:      integer("id").primaryKey(),
//   room:    integer("room").notNull().references(() => Room.id, { onDelete: "cascade" }),
//   author:  text("author").references(() => User.id, { onDelete: "set null" }),
//   message: text("message").notNull(),
//   posted:  time("posted").notNull(),
// })

// —————————————————————————————————————————————————————————————————————————————
// Insert Data

await db.transaction(async (t) => {
  await t.insert(User)
    .values(users)
    .onConflictDoNothing()
    .execute()
    .catch(throwError)

  await t.insert(Room)
    .values(rooms)
    .onConflictDoNothing()
    .execute()
    .catch(throwError)

  await t.insert(Chat)
    .values(chats)
    .onConflictDoNothing()
    .execute()
    .catch(throwError)
})

console.log(`${green("✓")} Inserted ${users.length} users.`)
console.log(`${green("✓")} Inserted ${chats.length} messages.`)