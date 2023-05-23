import { describe, expect, it, beforeEach } from 'vitest'
import { CreateAccountUseCase } from './create-account.usecase'
import { InMemoryAccountRepository } from '../../test/in-memory-repository/in-memory-account.repository'
import { Client } from '../entity/client.entity'
import { InMemoryClientRepository } from '../../test/in-memory-repository/in-memory-client.repository'

let inMemoryAccountRepository: InMemoryAccountRepository
let inMemmoryClientRepository: InMemoryClientRepository
let useCase: CreateAccountUseCase
describe('Create account usecase unit test', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    inMemmoryClientRepository = new InMemoryClientRepository()
    useCase = new CreateAccountUseCase(
      inMemmoryClientRepository,
      inMemoryAccountRepository,
    )
  })
  it('should be able to create a new account', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    inMemmoryClientRepository.create(client)

    await useCase.execute({ clientId: client.id })

    expect(inMemoryAccountRepository.items.length).toEqual(1)
    expect(inMemoryAccountRepository.items[0].client).toEqual(client)
    expect(inMemoryAccountRepository.items[0].createdAt).toBeDefined()
    expect(inMemoryAccountRepository.items[0].id).toBeDefined()
  })

  it('should NOT be able to create account with inexistent client', async () => {
    await expect(async () => {
      await useCase.execute({ clientId: '1' })
    }).rejects.toThrowError()
  })
})
