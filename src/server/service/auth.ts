import type { Session, User } from "lucia"

import { Elysia } from "elysia"
import { verifyRequestOrigin } from "lucia"

import { Cookie, GET, Host, Origin } from "~/constant/http"
import lucia from "~/auth/lucia"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const session_null = { user: null, session: null }

/** Addendum to Elysia context from `ServiceAuth`. */
export type LuciaContext = Promise<{
  user: User | null
  session: Session | null
}>

// —————————————————————————————————————————————————————————————————————————————
// Service :: Authentication

/** Augment Elysia context with `user` and `session` extracted from cookie. 
 * - If you want to automatically protect the route then use `.guard()` in 
 *   addition to this service.
 * - Also adds a convenience method `isGoodSession`.
 * @example
 * const root = new Elysia<"/api">({ prefix: "/api" })
 *   .use(ServiceAuth)
 *   .guard(...) // optional if you want to automatically protect the route
 * @see https://elysiajs.com/essential/scope.html#guard
 */
const ServiceAuth = new Elysia({ name: "auth" })
  .derive({ as: "scoped" }, async (ctx): LuciaContext => {
    // CRSF security check
    if (ctx.request.method !== GET) {
      const origin = ctx.request.headers.get(Origin)
      const header = ctx.request.headers.get(Host)
      if (!origin || !header || !verifyRequestOrigin(origin, [header]))
        return session_null
    }

    // cannot find session
    const cookie = ctx.request.headers.get(Cookie) ?? ""
    const sessionId = lucia.readSessionCookie(cookie)
    if (!sessionId) return session_null

    // verify session
    const { user, session } = await lucia.validateSession(sessionId)
    if (session && session.fresh) {
      const { name, value, attributes } = lucia.createSessionCookie(session.id)
      ctx.cookie[name].set({ value, ...attributes })
    }

    // clear cookie on bad session
    else if (!session) {
      const { name, value, attributes } = lucia.createBlankSessionCookie()
      ctx.cookie[name].set({ value, ...attributes })
    }

    return { user, session }
  })
  .macro(({ onBeforeHandle }) => ({
    isGoodSession(bit: boolean) {
      onBeforeHandle(({ session, error }) => {
        if (!session?.fresh && bit) return error(401)
      })
    }
  }))

export default ServiceAuth