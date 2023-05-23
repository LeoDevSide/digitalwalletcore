import { Account } from '../entity/account.entity'
import { IAccountRepository } from '../repository/account.repository'
import { IClientRepository } from '../repository/client.repository'

type CreateAccountUseCaseInputDto = {
  clientId: string
}

export class CreateAccountUseCase {
  constructor(
    private clientRepository: IClientRepository,
    private accountRepository: IAccountRepository,
  ) {}

  async execute(input: CreateAccountUseCaseInputDto): Promise<void> {
    const client = await this.clientRepository.findById(input.clientId)
    if (!client) throw new Error('Client not found')
    const account = new Account({ client })
    await this.accountRepository.create(account)
  }
}
