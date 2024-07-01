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

type Inbound<T> = {
  type: "message" | "error" | "protocol"
  payload: T
  id: number
  clock: number
}

type Outbound<T> = {
  type: "message"
  payload: T
  id: number
  clock: number
}

const message = t.Object({
  type: t.Literal("message"),
  payload: t.String(),
  id: t.Number(),
  clock: t.Number(),
})

class Message {
  type = "message"
  payload: string
  id: number
  clock: number
  constructor(payload: string, id: number, clock: number) {
    this.payload = payload
    this.id = id
    this.clock = clock
  }
}

export default websocket