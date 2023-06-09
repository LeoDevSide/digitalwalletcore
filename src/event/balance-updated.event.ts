import { Event } from '../utils/events/event-dispatcher'

export class BalanceUpdatedEvent implements Event {
  private _name = 'BalanceUpdated'
  private _payload: any
  private _date = new Date()

  get name() {
    return this._name
  }

  get payload() {
    return this._payload
  }

  get date() {
    return this._date
  }

  set payload(payload: any) {
    this._payload = payload
  }
}
