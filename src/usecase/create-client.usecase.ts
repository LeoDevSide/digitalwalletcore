import { Client } from '../entity/client.entity'
import { IClientRepository } from '../repository/client.repository'

type CreateClientUseCaseInputDto = {
  client: Client
}

export class CreateClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async execute(input: CreateClientUseCaseInputDto): Promise<void> {
    const checkIfEmailAlreadyExists = await this.clientRepository.findByEmail(
      input.client.email,
    )
    if (checkIfEmailAlreadyExists) {
      throw new Error('Email already exists')
    }
    const client = new Client(input.client)
    await this.clientRepository.create(client)
  }
}
