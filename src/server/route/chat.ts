import Elysia from "elysia"
import { db } from "~/db/client"
import { Chat } from "~/db/schema"

const chat = new Elysia({ prefix: "/chat" })
  .get("/:room", req => {
    db.select().from(Chat).where({ room: req.params.room })
  })

export default chat
