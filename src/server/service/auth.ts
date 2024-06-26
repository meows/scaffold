import type { Session, User } from "lucia"

import { Elysia } from "elysia"
import { verifyRequestOrigin } from "lucia"

import { Cookie, GET, Host, Origin } from "~/constant/http"
import lucia from "~/auth/lucia"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const session_null = { user: null, session: null }

type LuciaContext = Promise<{
  user: User | null
  session: Session | null
}>

// —————————————————————————————————————————————————————————————————————————————
// Service :: Authentication

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
    if (!session) {
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