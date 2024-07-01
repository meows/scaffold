import { Elysia, t } from "elysia"

const websocket = new Elysia()
  .ws("/ws", {
    message(ws, message) {
      console.log("Received:", message)
      ws.send(message)
    },
    body: t.String(),
    response: t.String(),
  })

export default websocket