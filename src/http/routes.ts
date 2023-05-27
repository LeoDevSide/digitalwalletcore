import { FastifyInstance } from 'fastify'
import { createClient } from './create-client.controller'
import { createAccount } from './create-account.controller'
import { createTransaction } from './create-transaction.controller'
export async function appRoutes(app: FastifyInstance) {
  app.post('/clients', createClient)
  app.post('/accounts', createAccount)
  app.post('/transactions', createTransaction)
}
