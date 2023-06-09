import { Kafka } from 'kafkajs'

export const kafka = new Kafka({
  brokers: ['localhost:9094'],
  clientId: 'wallet',
})

export const kafkaProducer = kafka.producer()
