import { agent } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'
import { PrismaClientRepository } from '../repository/prisma/prisma-client.repository'
import { Client } from '../entity/client.entity'

describe('Create client controller e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a new client in db by post /account route', async () => {
    const repository = new PrismaClientRepository()
    const client = new Client({ email: 'test@example.com', name: 'test' })
    await repository.create(client)
    const response = await agent(app.server)
      .post('/accounts')
      .send({
        clientId: client.id,
      })
      .expect(201)
    expect(response.statusCode).toEqual(201)
  })
})
