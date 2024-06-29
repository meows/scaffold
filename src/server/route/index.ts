import swagger from "@elysiajs/swagger"
import { Elysia } from "elysia"
import { serverTiming } from "@elysiajs/server-timing"

// -----------------------------------------------------------------------------
// Internal

import { green } from "~/lib/console"
import user from "~/server/route/user"
import hello from "~/server/route/hello"

// —————————————————————————————————————————————————————————————————————————————
// OpenAPI

// https://elysiajs.com/plugins/swagger.html
const docs = swagger({
  documentation: {
    info: {
      title: "Meow Demo App",
      version: "0.0.1",
      description: "These are endpoints for my app.",
    },
  },
})

// —————————————————————————————————————————————————————————————————————————————
// Router

const root = new Elysia<"/api">({ prefix: "/api" })
  .use(serverTiming())
  .use(docs)
  .use(hello)
  .use(user)
  .ws("/ws", {
    message(ws, message) {
      ws.send(message)
    },
  })

if (root.server) console.log(
  `${green("✓")} Server running on ${root.server.hostname}:${root.server.port}.`
)

// -----------------------------------------------------------------------------
// Export

export type App = typeof root
export default root
