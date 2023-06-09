import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaAccountRepository } from '../repository/prisma/prisma-account.repository'
import { CreateTransactionUseCase } from '../usecase/create-transaction.usecase'
import { TransactionCreatedEvent } from '../event/transaction-created.event'
import { EventDispatcher } from '../utils/events/event-dispatcher'
import { PrismaTransactionRepository } from '../repository/prisma/prisma-transaction.repository'
import { TransactionCreatedKafkaHandler } from '../event/handler/transaction-created-kafka.handler'
import { kafkaProducer } from '../lib/kafka'
import { BalanceUpdatedEvent } from '../event/balance-updated.event'
import { UpdateBalanceKafkaHandler } from '../event/handler/balance-updated-kafka.handler'

type bodySchema = {
  accountIdFrom: string
  accountIdTo: string
  amount: number
}
export async function createTransaction(
  request: FastifyRequest<{ Body: bodySchema }>,
  reply: FastifyReply,
) {
  const { accountIdFrom, accountIdTo, amount }: bodySchema = request.body

  const accountRepository = new PrismaAccountRepository()
  const transactionRepository = new PrismaTransactionRepository()
  const transactionCreatedEvent = new TransactionCreatedEvent()
  const balanceUpdatedEvent = new BalanceUpdatedEvent()
  const balanceUpdatedHandler = new UpdateBalanceKafkaHandler(kafkaProducer)
  const eventDispatcher = new EventDispatcher()
  const transactionCreatedHandler = new TransactionCreatedKafkaHandler(
    kafkaProducer,
  )
  eventDispatcher.register('TransactionCreated', transactionCreatedHandler)
  eventDispatcher.register('BalanceUpdated', balanceUpdatedHandler)

  const createTransactionUsecase = new CreateTransactionUseCase(
    accountRepository,
    transactionRepository,
    eventDispatcher,
    transactionCreatedEvent,
    balanceUpdatedEvent,
  )

  const output = await createTransactionUsecase.execute({
    accountIdFrom,
    accountIdTo,
    amount,
  })

  return reply.status(201).send(output)
}
