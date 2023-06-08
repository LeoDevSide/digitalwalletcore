import { Message, Producer } from 'kafkajs'
import { IEvent, IEventHandler } from '../../utils/events/interfaces'

export class TransactionCreatedKafkaEvent implements IEventHandler {
  constructor(private kafkaProducer: Producer) {}

  public async handle(event: IEvent): Promise<void> {
    const payload = JSON.stringify(event.payload)
    const message: Message = { value: payload }

    await this.kafkaProducer.connect()

    await this.kafkaProducer.send({
      topic: 'transactions',
      messages: [message],
    })
    console.log('TransactioncreatedKafkaHandler: ' + message)
  }
}
