import { Account } from '../../src/entity/account.entity'
import { IAccountRepository } from '../../src/repository/account.repository'

export class InMemoryAccountRepository implements IAccountRepository {
  public items: Account[] = []

  async findById(id: string): Promise<Account | null> {
    const foundAccount = this.items.find((account) => account.id === id)

    if (!foundAccount) return null

    return foundAccount
  }

  async create(account: Account): Promise<void> {
    this.items.push(account)
  }

  async save(account: Account): Promise<void> {
    const index = this.items.findIndex((item) => item.id === account.id)

    if (index !== -1) {
      this.items[index] = account
    } else {
      throw new Error('O accounte não existe.')
    }
  }
}
