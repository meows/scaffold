import { Elysia, t } from "elysia"
import { hour } from "~/constant/time"

const config = {
  websocket: {
    idleTimeout: hour,
  },
}

const websocket = new Elysia(config)
  .ws("/ws", {
    message(ws, message) {
      console.log("Received:", message)
      ws.send(message)
    },
    body: t.String(),
    response: t.String(),
  })

export default websocket