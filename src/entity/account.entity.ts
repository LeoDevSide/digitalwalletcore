import { validateSync, IsDefined, IsNotEmptyObject } from 'class-validator'
import { randomUUID } from 'crypto'
import { Client } from './client.entity'

export interface AccountProps {
  client: Client
}

export class Account {
  @IsDefined()
  @IsNotEmptyObject()
  private _client: Client

  private _balance = 0
  private _id: string
  private _createdAt: Date
  private _updatedAt?: Date

  constructor(props: AccountProps, id?: string, createdAt?: Date) {
    this._client = props.client
    this._id = id ?? randomUUID()
    this._createdAt = createdAt ?? new Date()
    this.validate()
  }

  private validate(): void {
    const errors = validateSync(this)
    const invalidProperties: string[] = []
    if (errors.length > 0) {
      for (const error of errors) {
        invalidProperties.push(`Invalid property: '${error.property}'`)
      }

      throw new Error(invalidProperties.join(', '))
    }
  }

  public credit(amount: number): void {
    this._balance += amount
    this._updatedAt = new Date()

    this.validate()
  }

  public debit(amount: number): void {
    const amountValue = amount
    this._balance -= amountValue
    this._updatedAt = new Date()

    this.validate()
  }

  get client(): Client {
    return this._client
  }

  get id() {
    return this._id
  }

  get createdAt() {
    return this._createdAt
  }

  get updatedAt() {
    return this._createdAt
  }

  get balance() {
    return this._balance
  }
}
