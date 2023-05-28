import { ITransactionRepository } from '../transaction.repository'
import { Transaction } from '../../entity/transaction.entity'
import { prisma } from '../../lib/prisma'
// import { Client } from '../../entity/client.entity'
// import { Account } from '../../entity/account.entity'

export class PrismaTransactionRepository implements ITransactionRepository {
  // async findById(id: string): Promise<Transaction | null> {
  //   const transactionDb = await prisma.transaction.findUnique({
  //     where: { id },
  //     include: { accountFrom: true, accountTo: true },
  //   })
  //   if (!transactionDb) return null

  //   const accountFromEntity = new Account({client: transactionDb.accountFrom.})
  //   const transactionEntity = new Transaction(
  //     {
  //       accountFrom: transactionDb.accountFrom,
  //       accountTo: transactionDb.accountTo,
  //       amount: transaction.amount,
  //     },
  //     transaction.id,
  //     transaction.createdAt,
  //   )
  //   // if (transactionDb.balance > 0) transaction.credit(transactionDb.balance) // TODO refactor this

  //   return transactionDb
  // }

  async create(transaction: Transaction): Promise<void> {
    // const transactionEntity = new Transaction(
    //   {
    //     accountFrom: transaction.accountFrom,
    //     accountTo: transaction.accountTo,
    //     amount: transaction.amount,
    //   },
    //   transaction.id,
    //   transaction.createdAt,
    // )
    await prisma.transaction.create({
      data: {
        amount: transaction.amount,
        account_from_id: transaction.accountFrom.id,
        account_to_id: transaction.accountTo.id,
        id: transaction.id,
      },
    })
  }
}
