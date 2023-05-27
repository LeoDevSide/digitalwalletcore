import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaAccountRepository } from '../repository/prisma/prisma-account.repository'
import { CreateTransactionUseCase } from '../usecase/create-transaction.usecase'
import { InMemoryTransactionRepository } from '../../test/in-memory-repository/in-memory-transaction.repository'
import { TransactionCreatedEvent } from '../event/transaction-created.event'
import { EventDispatcher } from '../utils/events/event-dispatcher'
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
  const transactionRepository = new InMemoryTransactionRepository()
  const event = new TransactionCreatedEvent()
  const eventDispatcher = new EventDispatcher()

  const authUseCase = new CreateTransactionUseCase(
    accountRepository,
    transactionRepository,
    eventDispatcher,
    event,
  )

  const output = await authUseCase.execute({
    accountIdFrom,
    accountIdTo,
    amount,
  })

  return reply.status(200).send(output)
}
