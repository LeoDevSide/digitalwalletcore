import { IAccountRepository } from '../account.repository'
import { Account } from '../../entity/account.entity'
import { prisma } from '../../lib/prisma'
import { Client } from '../../entity/client.entity'

export class PrismaAccountRepository implements IAccountRepository {
  async findById(id: string): Promise<Account | null> {
    const accountDb = await prisma.account.findUnique({
      where: {
        id,
      },
      include: {
        client: true,
      },
    })

    if (!accountDb) return null

    const client = new Client(
      {
        email: accountDb.client.email,
        name: accountDb.client.name,
      },
      accountDb.client.id,
      accountDb.client.created_at,
    )

    const account = new Account({ client }, accountDb.id, accountDb.created_at)
    if (accountDb.balance > 0) account.credit(accountDb.balance) // TODO refactor this

    return account
  }

  async create(account: Account): Promise<void> {
    await prisma.account.create({
      data: {
        balance: 0,
        id: account.id,
        created_at: account.createdAt,
        client_id: account.client.id,
      },
    })
  }

  async save(account: Account): Promise<void> {
    const isExistentAccount = await prisma.account.findUnique({
      where: { id: account.id },
    })
    if (!isExistentAccount) throw new Error('Account not found')

    await prisma.account.update({
      data: {
        updated_at: account.updatedAt,
        balance: account.balance,
        client_id: isExistentAccount.client_id,
        id: isExistentAccount.id,
        created_at: isExistentAccount.created_at,
      },
      where: { id: account.id },
    })
  }

  async updateBalance(account: Account): Promise<void> {
    const isExistentAccount = await prisma.account.findUnique({
      where: { id: account.id },
    })
    if (!isExistentAccount) throw new Error('Account not found')

    await prisma.account.update({
      data: {
        balance: account.balance,
      },
      where: { id: account.id },
    })
  }
}
