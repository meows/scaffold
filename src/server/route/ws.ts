import Elysia from "elysia"

export const websocket = new Elysia()
  .ws("/ws", {
    message(ws, message) {
      console.log("Received:", message)
      ws.send(message)
    },
  })