import { Kafka } from "kafkajs"
import { nanoid } from "nanoid"

const endpoint = process.env.KAFKA_ENDPOINT || "localhost:9092"

const panda = new Kafka({
  brokers: [endpoint],
})

const consumer = panda.consumer({ groupId: nanoid() })

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
