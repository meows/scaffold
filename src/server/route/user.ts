import { eq } from "drizzle-orm"
import { Elysia, redirect, t } from "elysia"
import { generateId } from "lucia"
import { hash as argon2, verify } from "@node-rs/argon2"

import { throwErr } from "~/lib/lambda"
import { db } from "~/db/client"
import { User } from "~/db/schema"
import { config_hash } from "~/auth/config"
import lucia from "~/auth/lucia"
import ServiceAuth from "~/server/service/auth"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const type_email = t.String({
  format: "email",
  error: "Email string validation failed.",
})

const type_password = t.String({
  error: "Password string validation failed.",
  minLength: 8,
  maxLength: 64,
})

const schema_user = {
  body: t.Object({
    email: type_email,
    password: type_password,
  })
}

const schema_email = {
  params: t.Object({ email: type_email })
}

// —————————————————————————————————————————————————————————————————————————————
// Route :: User

/** Public routes for user authentication. */
const user = new Elysia<"/user">({ prefix: "/user" })
  .use(ServiceAuth)
  .get("/check/:email", async (req) => {
    const { email } = req.params
    const rows = await db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .limit(1)
      .execute()
    return !!rows.length
  }, schema_email)
  .get("/whoami", async (req) => {
    const { user, session } = await req
    return { user, session }
  })
  .post("/create", async (req) => {
    const { email, password } = req.body
    const hash = await argon2(password, config_hash)
    const id = generateId(15)
    const row = await db
      .insert(User)
      .values({ email, hash, id, username: email })
      .returning()
      .execute()
      .catch(throwErr)
    const session = await lucia.createSession(id, {})
    const { name, value, attributes } = lucia.createSessionCookie(session.id)
    req.cookie[name].set({ value, ...attributes })
    return row
  }, schema_user)
  .post("/login", async (req) => {
    const { email, password } = req.body
    const rows = await db
      .select()
      .from(User)
      .where(eq(User.email, email))
      .limit(1)
      .execute()
      .catch(throwErr)
    if (!rows.length) throw Error("User does not exist.")
    const user = rows.at(0)!
    const match = await verify(user.hash, password)
    if (!match) throw Error("Password is incorrect.")
    const session = await lucia.createSession(user.id, {})
    const { name, value, attributes } = lucia.createSessionCookie(session.id)
    req.cookie[name].set({ value, ...attributes })
    return redirect("https://youtube.com", 307)
  }, schema_user)

export default user

// const query = sql<{exists:boolean}>`select exists(${db.select({ n: sql`1` }).from(User).where(eq(User.email, email))}) as exists`

