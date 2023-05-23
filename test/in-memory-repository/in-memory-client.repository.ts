import { Client } from '../../src/entity/client.entity'
import { IClientRepository } from '../../src/repository/client.repository'

export class InMemoryClientRepository implements IClientRepository {
  public items: Client[] = []

  async findById(id: string): Promise<Client | null> {
    const foundClient = this.items.find((client) => client.id === id)

    if (!foundClient) return null

    return foundClient
  }

  async findByEmail(email: string): Promise<Client | null> {
    const foundClient = this.items.find((client) => client.email === email)

    if (!foundClient) return null

    return foundClient
  }

  async create(client: Client): Promise<void> {
    this.items.push(client)
  }

  async save(client: Client): Promise<void> {
    const index = this.items.findIndex((item) => item.id === client.id)

    if (index !== -1) {
      this.items[index] = client
    } else {
      throw new Error('O cliente não existe.')
    }
  }
}
