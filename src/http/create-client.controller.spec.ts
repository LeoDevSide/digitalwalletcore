import { agent } from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'

describe('Create client controller e2e test', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to create a new client in db by post /clients route', async () => {
    const response = await agent(app.server)
      .post('/clients')
      .send({
        email: 'test2021@example.com',
        name: 'test',
      })
      .expect(201)
    expect(response.statusCode).toEqual(201)
  })
})
