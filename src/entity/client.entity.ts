import { validateSync, IsEmail, MinLength } from 'class-validator'
import { randomUUID } from 'crypto'

export interface ClientProps {
  name: string
  email: string
}

export class Client {
  @MinLength(2)
  private _name: string

  @IsEmail()
  private _email: string

  private _id: string
  private _createdAt: Date
  private _updatedAt?: Date

  constructor(props: ClientProps, id?: string, createdAt?: Date) {
    this._id = id ?? randomUUID()
    this._name = props.name
    this._email = props.email
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

  public updateName(nameProp: { name: string }): void {
    const updatedName = nameProp.name

    this._name = updatedName
    this._updatedAt = new Date()

    this.validate()
  }

  get name() {
    return this._name
  }

  get email() {
    return this._email
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
}
