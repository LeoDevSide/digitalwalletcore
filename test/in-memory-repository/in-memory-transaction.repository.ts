import { Transaction } from '../../src/entity/transaction.entity'
import { ITransactionRepository } from '../../src/repository/transaction.repository'

export class InMemoryTransactionRepository implements ITransactionRepository {
  public items: Transaction[] = []

  async findById(id: string): Promise<Transaction | null> {
    const foundTransaction = this.items.find(
      (transaction) => transaction.id === id,
    )

    if (!foundTransaction) return null

    return foundTransaction
  }

  async create(transaction: Transaction): Promise<void> {
    this.items.push(transaction)
  }

  async save(transaction: Transaction): Promise<void> {
    const index = this.items.findIndex((item) => item.id === transaction.id)

    if (index !== -1) {
      this.items[index] = transaction
    } else {
      throw new Error('O transactione não existe.')
    }
  }
}
