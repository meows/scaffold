import { eq } from "drizzle-orm"
import Elysia, { t } from "elysia"
import { db } from "~/db/client"
import { Chat } from "~/db/schema"
import { throwError } from "~/lib/lambda"

const chat = new Elysia({ prefix: "/chat" })
  .get("/:room", async (req) => {
    const chats = await db
      .select()
      .from(Chat)
      .where(eq(Chat.room, Number(req.params.room)))
      .orderBy(Chat.posted)
      .run()
      .catch(throwError)

    return chats
  })

export default chat
