import { PrismaClient } from '@prisma/client'
import { Transaction } from '../entity/transaction.entity'

export interface ITransactionRepository {
  // findById(id: string): Promise<Transaction | null>
  create(
    transaction: Transaction,
    tx?: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
    >,
  ): Promise<void>
}
