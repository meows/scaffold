import { generateId } from "lucia"
import { hash as argon2 } from "@node-rs/argon2"

import { throwError } from "~/lib/lambda"
import { randomNat } from "~/lib/random"
import { green } from "~/lib/console"
import { db } from "~/db/client"
import { Chat, User } from "~/db/schema"

// —————————————————————————————————————————————————————————————————————————————
// Mock Data

const usersᐟ = [
  { email: "joe@gmail.com", password: "secret password" },
  { email: "bob@gmail.com", password: "secret password" },
]

const messagesᐟ = [
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

const messages = messagesᐟ.map((message, id) => ({
  id,
  author: users[randomNat(users.length)].id,
  message,
  posted: new Date(),
}))

// —————————————————————————————————————————————————————————————————————————————
// Insert Data

await db.insert(User)
  .values(users)
  .onConflictDoNothing()
  .execute()
  .catch(throwError)

await db.insert(Chat)
  .values(messages)
  .onConflictDoNothing()
  .execute()
  .catch(throwError)

console.log(`${green("✓")} Inserted ${users.length} users.`)
console.log(`${green("✓")} Inserted ${messages.length} messages.`)