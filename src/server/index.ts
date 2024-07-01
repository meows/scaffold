import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"
import { serverTiming } from "@elysiajs/server-timing"

// -----------------------------------------------------------------------------
// Internal

import { green } from "~/lib/console"
import { API_PORT } from "~/constant/config"

import hello     from "~/server/route/hello"
import user      from "~/server/route/user"
import websocket from "~/server/route/websocket"

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

const root = new Elysia()
  .use(cors())
  .use(serverTiming())
  .use(docs)
  .use(hello)
  .use(user)
  .use(websocket)
  .listen(API_PORT)

if (root.server) console.log(
  `${green("✓")} Server running on ${root.server.hostname}:${root.server.port}.`
)

// -----------------------------------------------------------------------------
// Export

/** Elysia type for root route. */
export type App = typeof root
// export default root
