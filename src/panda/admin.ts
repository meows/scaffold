import { Kafka } from "kafkajs"
import { STREAM_URL } from "~/env"

// —————————————————————————————————————————————————————————————————————————————
// Environment

const redpanda = new Kafka({
  brokers: [STREAM_URL],
})

const admin = redpanda.admin()

// —————————————————————————————————————————————————————————————————————————————
// Configuration

export async function createTopic(topic:string, partitions?:number, replicas?:number) {
  await admin.connect()
  const existingTopics = await admin.listTopics()
  if (!existingTopics.includes(topic)) {
    await admin.createTopics({
      topics: [
        {
          topic: topic,
          numPartitions: partitions ? partitions : 1,
          replicationFactor: replicas ? replicas : 1,
        },
      ],
    })
  }
  await admin.disconnect()
}
