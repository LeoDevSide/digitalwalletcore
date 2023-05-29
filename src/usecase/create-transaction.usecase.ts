import { Transaction } from '../entity/transaction.entity'
import { prisma } from '../lib/prisma'
import { IAccountRepository } from '../repository/account.repository'
import { ITransactionRepository } from '../repository/transaction.repository'
import { IEvent, IEventDispatcher } from '../utils/events/interfaces'

type CreateTransactionUseCaseInputDto = {
  accountIdFrom: string
  accountIdTo: string
  amount: number
}

type CreateTransactionUseCaseOutputDto = {
  transactionId: string
}

export class CreateTransactionUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private transactionRepository: ITransactionRepository,
    private eventDispatcher: IEventDispatcher,
    private transactionCreated: IEvent,
  ) {}

  async execute(
    input: CreateTransactionUseCaseInputDto,
  ): Promise<CreateTransactionUseCaseOutputDto> {
    const from = await this.accountRepository.findById(input.accountIdFrom)
    const to = await this.accountRepository.findById(input.accountIdTo)
    if (!from || !to) throw new Error('Account not found')

    const transaction = new Transaction({
      accountFrom: from,
      accountTo: to,
      amount: input.amount,
    })
    await prisma.$transaction(async (tx) => {
      await this.accountRepository.updateBalance(from, tx)
      await this.accountRepository.updateBalance(to, tx)
      await this.transactionRepository.create(transaction, tx)
    })
    const transactionId = transaction.id

    this.transactionCreated.payload = transactionId
    this.eventDispatcher.dispatch(this.transactionCreated)
    return { transactionId }
  }
}
