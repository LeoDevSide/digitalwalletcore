import { IClientRepository } from '../client.repository'
import { Client } from '../../entity/client.entity'
import { prisma } from '../../lib/prisma'

export class PrismaClientRepository implements IClientRepository {
  async findById(id: string): Promise<Client | null> {
    const clientDb = await prisma.client.findUnique({
      where: {
        id,
      },
    })
    if (!clientDb) return null
    const client = new Client(
      { email: clientDb.email, name: clientDb.name },
      clientDb.id,
      clientDb.created_at,
    )
    return client
  }

  async findByEmail(email: string): Promise<Client | null> {
    const clientDb = await prisma.client.findUnique({
      where: {
        email,
      },
    })
    if (!clientDb) return null
    const client = new Client(
      { email: clientDb.email, name: clientDb.name },
      clientDb.id,
      clientDb.created_at,
    )
    return client
  }

  async create(client: Client): Promise<void> {
    await prisma.client.create({
      data: {
        // Mapeie os campos do objeto "client" para os campos correspondentes no modelo do Prisma
        email: client.email,
        name: client.name,
        created_at: client.createdAt,
        id: client.id,
      },
    })
  }
}
