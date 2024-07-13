import { Kafka } from "kafkajs"
import { endpoint } from "~/queue/config"

const redpanda = new Kafka({
  brokers: [endpoint],
})

const producer = redpanda.producer()

export async function getConnection(user: string) {
  try {
    await producer.connect()
    return async (message: string) => {
      await producer.send({
        topic: "chat",
        messages: [{ value: JSON.stringify({ message, user }) }],
      })
    }
  } 
  catch (err) {
    console.error("Error:", err)
  }
}

export async function disconnect() {
  try {
    await producer.disconnect()
  }

  catch (err) {
    console.error("Error:", err)
  }
}
