import { describe, expect, it } from 'vitest'
import { PrismaClientRepository } from './prisma-client.repository'
import { Client } from '../../entity/client.entity'
describe('Prisma Client Repository Integration test', () => {
  it('should be able to create a new client in db', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    expect(client.name).toBe('John doe')
    expect(client.createdAt).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.email).toEqual('johnexample@gmail.com')

    const repository = new PrismaClientRepository()
    await repository.create(client)
    const clientDb = await repository.findById(client.id)
    expect(clientDb?.id).toEqual(client.id)
    expect(clientDb?.email).toEqual(client.email)
    expect(clientDb?.name).toEqual(client.name)
    expect(clientDb?.createdAt).toBeDefined()
    expect(clientDb?.accounts.length).toEqual(0)
  })

  it('should be able to find a existent client', async () => {
    const repository = new PrismaClientRepository()

    const client = new Client({
      email: 'test@example.com',
      name: 'test',
    })

    await repository.create(client)
    const clientFromDb = await repository.findById(client.id)
    expect(clientFromDb?.id).toBe(client.id)
    expect(clientFromDb?.email).toEqual(client.email)
    expect(clientFromDb?.name).toEqual(client.name)
    expect(clientFromDb?.createdAt).toEqual(client.createdAt)
  })

  it('should be able to find a existent client by email', async () => {
    const repository = new PrismaClientRepository()

    const client = new Client({
      email: 'test2@example.com',
      name: 'test',
    })

    await repository.create(client)
    const clientFromDb = await repository.findByEmail('test2@example.com')
    expect(clientFromDb?.id).toBe(client.id)
    expect(clientFromDb?.email).toEqual(client.email)
    expect(clientFromDb?.name).toEqual(client.name)
    expect(clientFromDb?.createdAt).toEqual(client.createdAt)
  })

  it('should return null if findByEmail an inexistent client', async () => {
    const repository = new PrismaClientRepository()
    const client = await repository.findByEmail('inexistent@example.com')
    expect(client).toBeFalsy()
  })

  it('should return null if findById an inexistent client', async () => {
    const repository = new PrismaClientRepository()
    const client = await repository.findById('0')
    expect(client).toBeFalsy()
  })

  it('should NOT be able to create clients with same email', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexamplee@gmail.com',
    })
    const repository = new PrismaClientRepository()

    await repository.create(client)
    await expect(() => repository.create(client)).rejects.toThrowError()
  })
})
