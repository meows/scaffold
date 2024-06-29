import { generateId } from "lucia"
import { hash as argon2 } from "@node-rs/argon2"

import { throwError } from "~/lib/lambda"
import { randomNat } from "~/lib/random"
import { green } from "~/lib/console"
import { db } from "~/db/client"
import { Chat, User } from "~/db/schema"

// —————————————————————————————————————————————————————————————————————————————
// Mock Data

const raw_users = [
  {
    email: "joe@gmail.com",
    password: "secret password",
  },
  {
    email: "bob@gmail.com",
    password: "secret password",
  },
]

const users = await Promise.all(raw_users.map(async ({ email, password }) => ({
  email,
  hash: await argon2(password),
  id: generateId(15),
})))

const raw_messages = [
  "Hello, world!",
  "How are you?",
  "What's up?",
  "Good morning!",
  "Good night!",
]

const messages = raw_messages.map((message, id) => ({
  id,
  author: users[randomNat(users.length)].id,
  message,
  posted: new Date(),
}))

// —————————————————————————————————————————————————————————————————————————————
// Insert Data

await db.insert(User)
  .values(users)
  .execute()
  .catch(throwError)

await db.insert(Chat)
  .values(messages)
  .execute()
  .catch(throwError)

console.log(`${green("✓")} Inserted ${users.length} users.`)
console.log(`${green("✓")} Inserted ${messages.length} messages.`)