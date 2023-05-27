import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaClientRepository } from '../repository/prisma/prisma-client.repository'
import { CreateClientUseCase } from '../usecase/create-client.usecase'
import { Client } from '../entity/client.entity'
type bodySchema = {
  email: string
  name: string
}
export async function createClient(
  request: FastifyRequest<{ Body: bodySchema }>,
  reply: FastifyReply,
) {
  const { name, email }: bodySchema = request.body
  const repository = new PrismaClientRepository()
  const authUseCase = new CreateClientUseCase(repository)
  await authUseCase.execute({
    client: new Client({ email, name }),
  })
  return reply.status(200).send()
}
