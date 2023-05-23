import { Client } from '../entity/client.entity'

export interface IClientRepository {
  findById(id: string): Promise<Client | null>
  findByEmail(email: string): Promise<Client | null>
  create(client: Client): Promise<void>
}
