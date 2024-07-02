import { eq } from "drizzle-orm"
import { Elysia, t } from "elysia"

import { throwError } from "~/lib/lambda"
import { db } from "~/db/client"
import { Chat, Room } from "~/db/schema"

// —————————————————————————————————————————————————————————————————————————————
// Route :: Chat

const chat = new Elysia({ prefix: "/chat" })
  .get("/:room", async (req) => {
    const room = db
      .$with("room")
      .as(db.select()
        .from(Room)
        .where(eq(Room.name, req.params.room))
      )
    // const chats = await db
    //   .select()
    //   .from(Chat)
    //   .where(eq(Chat.room.name, req.params.room))
    //   .orderBy(Chat.posted)
    //   .execute()
    //   .catch(throwError)
    const chats = await db
      .with(room)
      .select({ name: room.name })
      .from(Chat)
      .where(eq(Chat.room, room.name))
      .orderBy(Chat.posted)
      .execute()
      .catch(throwError)

    return chats
  })

export default chat
