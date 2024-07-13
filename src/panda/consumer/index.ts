import { Kafka } from "kafkajs"
import { nanoid } from "nanoid"

import { STREAM_URL } from "~/env"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const endpoint = STREAM_URL

const panda = new Kafka({
  brokers: [endpoint],
})

const consumer = panda.consumer({ groupId: nanoid() })

// —————————————————————————————————————————————————————————————————————————————
// Consumer

export async function connect() {
  try {
    await consumer.connect()
    await consumer.subscribe({ topic: "chat" })
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const formattedValue = JSON.parse((message.value as Buffer).toString())
        console.log(`${formattedValue.user}: ${formattedValue.message}`)
      },
    })
  }

  catch (err) {
    console.error("Error:", err)
  }
}

export async function disconnect() {
  try {
    await consumer.disconnect()
  }

  catch (err) {
    console.error("Error:", err)
  }
}
