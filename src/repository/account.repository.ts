import { Account } from '../entity/account.entity'

export interface IAccountRepository {
  findById(id: string): Promise<Account | null>
  create(account: Account): Promise<void>
  save(account: Account): Promise<void>
  updateBalance(account: Account): Promise<void>
}
