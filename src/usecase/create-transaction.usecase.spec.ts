import { describe, expect, it, beforeEach } from 'vitest'
import { CreateTransactionUseCase } from './create-transaction.usecase'
import { Client } from '../entity/client.entity'
import { InMemoryAccountRepository } from '../../test/in-memory-repository/in-memory-account.repository'
import { InMemoryTransactionRepository } from '../../test/in-memory-repository/in-memory-transaction.repository'
import { Account } from '../entity/account.entity'
import { EventDispatcher } from '../utils/events/event-dispatcher'
import { TransactionCreatedEvent } from '../event/transaction-created.event'

let inMemoryTransactionRepository: InMemoryTransactionRepository
let inMemoryAccountRepository: InMemoryAccountRepository
let useCase: CreateTransactionUseCase
let eventDispatcher: EventDispatcher
let event: TransactionCreatedEvent
describe('Create transaction usecase unit test', () => {
  beforeEach(() => {
    inMemoryTransactionRepository = new InMemoryTransactionRepository()
    inMemoryAccountRepository = new InMemoryAccountRepository()
    eventDispatcher = new EventDispatcher()
    event = new TransactionCreatedEvent()
    useCase = new CreateTransactionUseCase(
      inMemoryAccountRepository,
      inMemoryTransactionRepository,
      eventDispatcher,
      event,
    )
  })
  it('should be able to create a new transaction', async () => {
    const client1 = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const client2 = new Client({
      name: 'John doe',
      email: 'aaaa@gmail.com',
    })
    const account1 = new Account({ client: client1 })
    const account2 = new Account({ client: client2 })
    account1.credit(1000)
    account2.credit(200)
    await inMemoryAccountRepository.create(account1)
    await inMemoryAccountRepository.create(account2)

    await useCase.execute({
      accountIdFrom: account1.id,
      accountIdTo: account2.id,
      amount: 300,
    })

    expect(inMemoryTransactionRepository.items.length).toEqual(1)
    expect(inMemoryTransactionRepository.items[0].createdAt).toBeDefined()
    expect(inMemoryTransactionRepository.items[0].id).toBeDefined()
    expect(account1.balance).toEqual(700)
    expect(account2.balance).toEqual(500)
  })
})
