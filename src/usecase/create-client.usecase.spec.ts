import { describe, expect, it, beforeEach } from 'vitest'
import { CreateClientUseCase } from './create-client.usecase'
import { InMemoryClientRepository } from '../../test/in-memory-repository/in-memory-client.repository'
import { Client } from '../entity/client.entity'

let inMemoryRepository: InMemoryClientRepository
let useCase: CreateClientUseCase
describe('Create client usecase unit test', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryClientRepository()
    useCase = new CreateClientUseCase(inMemoryRepository)
  })
  it('should be able to create a new client', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })

    await useCase.execute({ client })

    expect(inMemoryRepository.items.length).toEqual(1)
    expect(inMemoryRepository.items[0].name).toEqual('John doe')
    expect(inMemoryRepository.items[0].createdAt).toBeDefined()
    expect(inMemoryRepository.items[0].id).toBeDefined()

    // Verifica se o método create foi chamado com o cliente correto
    // expect(findByIdSpy).toHaveBeenCalled()
  })

  it('should NOT be able to create client with existent email', async () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })

    await useCase.execute({ client })
    await expect(async () => {
      await useCase.execute({ client })
    }).rejects.toThrowError()
  })
})
