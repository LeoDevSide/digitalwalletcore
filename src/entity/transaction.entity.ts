import { validateSync, Min } from 'class-validator'
import { randomUUID } from 'crypto'
import { Account } from './account.entity'

export interface TransactionProps {
  accountFrom: Account
  accountTo: Account
  amount: number
}

export class Transaction {
  private _accountFrom: Account
  private _accountTo: Account
  @Min(1)
  private _amount: number

  private _id: string
  private _createdAt: Date

  constructor(props: TransactionProps, id?: string, createdAt?: Date) {
    this._accountFrom = props.accountFrom
    this._accountTo = props.accountTo
    this._amount = props.amount
    this._id = id ?? randomUUID()
    this._createdAt = createdAt ?? new Date()
    this.validate()
    this.validateSufficientFunds(props)
    this.commit(props)
  }

  private validateSufficientFunds(transactionProps: TransactionProps): void {
    if (this._accountFrom.balance < transactionProps.amount)
      throw new Error('Insufficient funds')
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

  private commit(transactionProps: TransactionProps): void {
    transactionProps.accountFrom.debit(transactionProps.amount)
    transactionProps.accountTo.credit(transactionProps.amount)
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

  get amount() {
    return this._amount
  }

  get accountFrom() {
    return this._accountFrom
  }

  get accountTo() {
    return this._accountTo
  }
}
