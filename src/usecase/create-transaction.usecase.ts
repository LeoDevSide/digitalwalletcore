import { Transaction } from '../entity/transaction.entity'
import { IAccountRepository } from '../repository/account.repository'
import { ITransactionRepository } from '../repository/transaction.repository'

type CreateTransactionUseCaseInputDto = {
  accountIdFrom: string
  accountIdTo: string
  amount: number
}

export class CreateTransactionUseCase {
  constructor(
    private accountRepository: IAccountRepository,
    private transactionRepository: ITransactionRepository,
  ) {}

  async execute(input: CreateTransactionUseCaseInputDto): Promise<void> {
    const from = await this.accountRepository.findById(input.accountIdFrom)
    const to = await this.accountRepository.findById(input.accountIdTo)

    if (!from || !to) throw new Error('Account not found')

    const transaction = new Transaction({
      accountFrom: from,
      accountTo: to,
      amount: input.amount,
    })
    await this.transactionRepository.create(transaction)
  }
}
