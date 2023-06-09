import { Message, Producer } from 'kafkajs'
import { IEvent, IEventHandler } from '../../utils/events/interfaces'

export class TransactionCreatedKafkaHandler implements IEventHandler {
  constructor(private kafkaProducer: Producer) {}

  public async handle(event: IEvent): Promise<void> {
    const objectToSend = {
      name: event.name,
      payload: event.payload,
    }
    const objectToJson = JSON.stringify(objectToSend)
    const message: Message = { value: objectToJson }

    await this.kafkaProducer.connect()

    await this.kafkaProducer.send({
      topic: 'transactions',
      messages: [message],
    })
    console.log('TransactionCreated: ' + message)
  }
}
