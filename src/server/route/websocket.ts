import Elysia from "elysia"

const websocket = new Elysia()
  .ws("/ws", {
    message(ws, message) {
      console.log("Received:", message)
      ws.send(message)
    },
  })

export default websocket