import { describe, expect, it } from 'vitest'
import { PrismaClientRepository } from './prisma-client.repository'
import { Client } from '../../entity/client.entity'
import { Account } from '../../entity/account.entity'
import { PrismaAccountRepository } from './prisma-account.repository'

const clientRepository = new PrismaClientRepository()
const accountRepository = new PrismaAccountRepository()
describe('Prisma Client Repository Integration test', () => {
  it('should be able to create a new account in db', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const account = new Account({ client })

    await clientRepository.create(client)
    await accountRepository.create(account)
    const accountDb = await accountRepository.findById(account.id)
    expect(accountDb?.client).toEqual(client)
    expect(accountDb?.balance).toEqual(0)
    expect(accountDb?.createdAt).toBeTruthy()
  })

  it('should be able to findById an existent account', async () => {
    const client = new Client({
      name: 'John dooe',
      email: 'johnexample2@gmail.com',
    })
    const account = new Account({ client })
    await clientRepository.create(client)

    await accountRepository.create(account)
    const accountDb = await accountRepository.findById(account.id)
    expect(accountDb?.balance).toEqual(0)
    expect(accountDb?.client).toEqual(client)
    expect(accountDb?.id).toEqual(account.id)
    expect(accountDb?.createdAt).toBeTruthy()
  })

  it('should be able to save an existent account', async () => {
    const client = new Client({
      name: 'John dooe',
      email: 'johnexample22@gmail.com',
    })
    const account = new Account({ client })
    await clientRepository.create(client)
    await accountRepository.create(account)
    account.credit(1000)
    await accountRepository.save(account)
    const accountDb = await accountRepository.findById(account.id)
    expect(accountDb?.balance).toEqual(1000)
  })

  it('should be able to update balance', async () => {
    const client = new Client({
      name: 'John dooe',
      email: 'johnexample222@gmail.com',
    })
    const account = new Account({ client })
    await clientRepository.create(client)
    await accountRepository.create(account)
    account.credit(1000)
    await accountRepository.updateBalance(account)
    const accountDb = await accountRepository.findById(account.id)
    expect(accountDb?.balance).toEqual(1000)
  })

  it('should return null if findById an inexistent account', async () => {
    const accountDb = await accountRepository.findById('2')
    expect(accountDb).toEqual(null)
  })
})
