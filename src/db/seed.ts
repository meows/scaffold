import { generateId } from "lucia"
import { hash as argon2 } from "@node-rs/argon2"

import { db } from "~/db/client"
import { User } from "~/db/schema"
import { green } from "~/lib/console"
import randomChoice from "~/lib/random"

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
  {
    author: randomChoice(users).id,
    message: "Hello, World!",
  },
]

// —————————————————————————————————————————————————————————————————————————————
// Insert Data

db.insert(User)
  .values(users)
  .execute()
  .catch(console.error)

console.log(`${green("✓")} Inserted ${users.length} users.`)