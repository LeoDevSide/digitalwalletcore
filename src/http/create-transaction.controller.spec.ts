import { agent } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'
import { PrismaClientRepository } from '../repository/prisma/prisma-client.repository'
import { Client } from '../entity/client.entity'
import { Account } from '../entity/account.entity'
import { PrismaAccountRepository } from '../repository/prisma/prisma-account.repository'

describe('Create client controller e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a new transaction in db by post /transactions route', async () => {
    const clientRepository = new PrismaClientRepository()
    const accountRepository = new PrismaAccountRepository()

    const client1 = new Client({ email: 'test@example.com', name: 'test' })
    const client2 = new Client({ email: 'test2@example.com', name: 'test2' })
    const account1 = new Account({ client: client1 })
    const account2 = new Account({ client: client2 })
    account1.credit(200)
    await clientRepository.create(client1)
    await clientRepository.create(client2)
    await accountRepository.create(account1)
    await accountRepository.create(account2)
    await accountRepository.updateBalance(account1)

    const response = await agent(app.server)
      .post('/transactions')
      .send({
        accountIdFrom: account1.id,
        accountIdTo: account2.id,
        amount: 150,
      })
      .expect(201)
    expect(response.statusCode).toEqual(201)
    const response2 = await agent(app.server)
      .post('/transactions')
      .send({
        accountIdFrom: account1.id,
        accountIdTo: account2.id,
        amount: 150,
      })
      .expect(500) // TODO: FIX ME
    expect(response2.statusCode).toEqual(500)
  })
})
