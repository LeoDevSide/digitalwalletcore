import { Transaction } from '../entity/transaction.entity'

export interface ITransactionRepository {
  // findById(id: string): Promise<Transaction | null>
  create(transaction: Transaction): Promise<void>
}
