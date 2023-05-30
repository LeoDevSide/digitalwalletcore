import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaAccountRepository } from '../repository/prisma/prisma-account.repository'
import { CreateAccountUseCase } from '../usecase/create-account.usecase'
import { PrismaClientRepository } from '../repository/prisma/prisma-client.repository'
type bodySchema = {
  clientId: string
}
export async function createAccount(
  request: FastifyRequest<{ Body: bodySchema }>,
  reply: FastifyReply,
) {
  const { clientId }: bodySchema = request.body
  const accountRepository = new PrismaAccountRepository()
  const clientRepository = new PrismaClientRepository()
  const authUseCase = new CreateAccountUseCase(
    clientRepository,
    accountRepository,
  )
  await authUseCase.execute({ clientId })
  return reply.status(201).send()
}
