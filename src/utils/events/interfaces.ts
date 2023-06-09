export interface IEvent {
  name: string
  date: Date
  payload: {}
}

export interface IEventHandler {
  handle(event: IEvent): Promise<void>
}

export interface IEventDispatcher {
  register(eventName: string, handler: IEventHandler): void
  dispatch(event: IEvent): void
  remove(eventName: string, handler: IEventHandler): void
  has(eventName: string, handler: IEventHandler): boolean
  clear(): void
}
