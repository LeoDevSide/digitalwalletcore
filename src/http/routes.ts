import { FastifyInstance } from 'fastify'
import { createClient } from './create-client.controller'
import { createAccount } from './create-account.controller'
export async function appRoutes(app: FastifyInstance) {
  app.post('/clients', createClient)
  app.post('/accounts', createAccount)
}
