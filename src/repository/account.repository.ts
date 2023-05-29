import { PrismaClient } from '@prisma/client'
import { Account } from '../entity/account.entity'

export interface IAccountRepository {
  findById(id: string, tx?: PrismaClient): Promise<Account | null>
  create(account: Account): Promise<void>
  save(account: Account): Promise<void>
  updateBalance(
    account: Account,
    tx?: Omit<
      PrismaClient,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
    >,
  ): Promise<void>
}
