import { Lucia } from "lucia"
import { adapter } from "~/auth/adapter"

// —————————————————————————————————————————————————————————————————————————————
// Lucia

// https://lucia-auth.com/getting-started/nextjs-app

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    }
  },

  // https://lucia-auth.com/tutorials/username-and-password/nextjs-app
  getUserAttributes: (attributes) => ({
    username: attributes.username,
  })
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: DatabaseUserAttributes
  }
}

interface DatabaseUserAttributes {
  username: string
}

export default lucia
