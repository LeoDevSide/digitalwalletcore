import { Account } from './account.entity'
import { describe, expect, it } from 'vitest'
import { Client } from './client.entity'
import { Transaction } from './transaction.entity'
describe('Account Entity unit test', () => {
  it('should be able to create a new transaction', () => {
    const clientFrom = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const clientTo = new Client({
      name: 'Junior Doe',
      email: 'johnexamplee@gmail.com',
    })
    const account1 = new Account({ client: clientFrom })
    account1.credit(300)
    const account2 = new Account({ client: clientTo })

    const transaction = new Transaction({
      accountFrom: account1,
      accountTo: account2,
      amount: 120,
    })
    expect(transaction.id).toBeTruthy()
    expect(transaction.createdAt).toBeTruthy()
    expect(account1.balance).toEqual(180)
    expect(account2.balance).toEqual(120)
  })

  it('should NOT be able to create transaction with insuficient funds', () => {
    const clientFrom = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const clientTo = new Client({
      name: 'Junior Doe',
      email: 'johnexamplee@gmail.com',
    })
    const account1 = new Account({ client: clientFrom })
    account1.credit(100)
    const account2 = new Account({ client: clientTo })

    expect(
      () =>
        new Transaction({
          accountFrom: account1,
          accountTo: account2,
          amount: 120,
        }),
    ).toThrowError()
  })

  it('should NOT be able to create transaction with invalid amount', () => {
    const clientFrom = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const clientTo = new Client({
      name: 'Junior Doe',
      email: 'johnexamplee@gmail.com',
    })
    const account1 = new Account({ client: clientFrom })
    account1.credit(100)
    const account2 = new Account({ client: clientTo })

    expect(
      () =>
        new Transaction({
          accountFrom: account1,
          accountTo: account2,
          amount: 0,
        }),
    ).toThrowError()
  })
})
