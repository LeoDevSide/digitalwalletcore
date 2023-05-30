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
  accountIdFrom: string
  accountIdTo: string
  aomunt: number
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
    // TODO: remove prisma dependency
    await prisma.$transaction(async (tx) => {
      await this.accountRepository.updateBalance(from, tx)
      await this.accountRepository.updateBalance(to, tx)
      await this.transactionRepository.create(transaction, tx)
    })
    const output = {
      transactionId: transaction.id,
      accountIdFrom: transaction.accountFrom.id,
      accountIdTo: transaction.accountTo.id,
      aomunt: transaction.amount,
    }
    this.transactionCreated.payload = output
    this.eventDispatcher.dispatch(this.transactionCreated)

    return output
  }
}
