import { Elysia } from "elysia"
import { cors } from "@elysiajs/cors"
import { swagger } from "@elysiajs/swagger"
import { serverTiming } from "@elysiajs/server-timing"

import { green } from "~/lib/console"
import { API_PORT } from "~/constant/config"

import hello     from "~/server/route/hello"
import user      from "~/server/route/user"
import chat      from "~/server/route/chat"
import websocket from "~/server/route/websocket"

import * as Admin    from "~/panda/admin"
import * as Producer from "~/panda/producer"
import * as Consumer from "~/panda/consumer"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const topic = "chat"

// async function start() {
//   console.log(`Creating topic: ${topic}`)
//   await Admin.createTopic(topic)
//   console.log("Connecting...")
//   await Consumer.connect()
//   rl.question("Enter user name: \n", async function (username) {
//     const sendMessage = await Producer.getConnection(username)
//     if (sendMessage) {
//       console.log("Connected, press Ctrl+C to exit")
//       rl.on("line", input => {
//         readline.moveCursor(process.stdout, 0, -1)
//         sendMessage(input)
//       })
//     }
//     else console.error("Failed to initialize sendMessage function")
//   })
// }

// -----------------------------------------------------------------------------
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

const root = new Elysia({ prefix: "/eden" })
  // .use(cors())
  .use(serverTiming())
  .use(docs)
  .use(hello)
  .use(user)
  .use(chat)
  .use(websocket)
  .listen(API_PORT)

if (root.server) console.log(
  `${green("✓")} Server running on ${root.server.hostname}:${root.server.port}.`
)

process.on("SIGINT", async () => {
  console.log("Closing app...")

  try {
    await Producer.disconnect()
    await Consumer.disconnect()
  }

  catch (err) {
    console.error("Error during cleanup:", err)
    process.exit(1)
  }

  finally {
    console.log("Cleanup finished. Exiting")
    process.exit(0)
  }
})

// -----------------------------------------------------------------------------
// Export

/** Elysia type for root route. */
export type App = typeof root

// export default root
