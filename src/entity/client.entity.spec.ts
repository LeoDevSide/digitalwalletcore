import { Account } from './account.entity'
import { Client } from './client.entity'
import { describe, expect, it } from 'vitest'
describe('Client Entity unit test', () => {
  it('should be able to create a new client entity', () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    expect(client.name).toBe('John doe')
    expect(client.createdAt).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.email).toEqual('johnexample@gmail.com')
  })

  it('should be able to update clients', () => {
    // console.log(client)
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    expect(client.name).toBe('John doe')
    expect(client.createdAt).toBeTruthy()
    expect(client.id).toBeTruthy()
    expect(client.email).toEqual('johnexample@gmail.com')

    client.updateName({ name: 'test' })
    expect(client.name).toEqual('test')
  })

  it('should be able to add an client account', () => {
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })
    const account = new Account({ client })

    client.addAccount(account)
    expect(client.accounts[0]).toEqual(account)
  })
  it('should NOT be able to update clients with invalid args', () => {
    // console.log(client)
    const client = new Client({
      name: 'John doe',
      email: 'johnexample@gmail.com',
    })

    expect(() => client.updateName({ name: 'a' })).toThrowError()
    expect(client.name).toEqual('a')
  })

  it('should NOT create a new client with invalid args', () => {
    // console.log(client)
    expect(
      () =>
        new Client({
          email: 'asdasdmailcom',
          name: '',
        }),
    ).toThrowError()
  })
})
