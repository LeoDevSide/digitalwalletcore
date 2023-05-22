import { Account } from './account.entity'
import { describe, expect, it } from 'vitest'
import { Client } from './client.entity'
describe('Account Entity unit test', () => {
  it('should be able to create a new account entity', () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const account = new Account({ client })
    expect(account.client).toBe(client)
    expect(account.createdAt).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.balance).toEqual(0)
  })

  it('should be able to credit accounts', () => {
    // console.log(account)
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const account = new Account({ client })
    account.credit(100)
    expect(account.balance).toBe(100)
  })
  it('should be able to debit accounts', () => {
    // console.log(account)
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const account = new Account({ client })
    account.credit(400)
    account.debit(250)
    expect(account.balance).toBe(150)
  })
})
