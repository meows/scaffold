import Elysia from "elysia"

const chat = new Elysia({ prefix: "/chat" })
  .get("/:room", req => `Hello, ${req.params.room}!`)

export default chat
