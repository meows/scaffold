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
  } catch (error) {
    console.error("Error:", error)
  }
}

export async function disconnect() {
  try {
    await producer.disconnect()
  } catch (error) {
    console.error("Error:", error)
  }
}
