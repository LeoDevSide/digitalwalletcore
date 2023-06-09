import { IEvent, IEventDispatcher, IEventHandler } from './interfaces'

export class Event implements IEvent {
  name: string
  date: Date
  payload: any
  constructor(name: string, payload: any) {
    this.name = name
    this.date = new Date()
    this.payload = payload
  }
}

export class EventDispatcher implements IEventDispatcher {
  handlers: { [eventName: string]: IEventHandler[] } = {}

  register(eventName: string, handler: IEventHandler): void {
    if (!this.handlers[eventName]) {
      this.handlers[eventName] = []
    }
    if (this.handlers[eventName].includes(handler)) {
      throw new Error('Handler already exists for the event.')
    }
    this.handlers[eventName].push(handler)
  }

  dispatch(event: IEvent): void {
    const eventHandlers = this.handlers[event.name]
    if (eventHandlers) {
      eventHandlers.forEach(async (handler) => await handler.handle(event))
    }
  }

  remove(eventName: string, handler: IEventHandler): void {
    const eventHandlers = this.handlers[eventName]
    if (eventHandlers) {
      const index = eventHandlers.indexOf(handler)
      if (index !== -1) {
        eventHandlers.splice(index, 1)
      }
    }
  }

  has(eventName: string, handler: IEventHandler): boolean {
    const eventHandlers = this.handlers[eventName]
    return eventHandlers && eventHandlers.includes(handler)
  }

  clear(): void {
    this.handlers = {}
  }
}

export class EventHandler implements IEventHandler {
  constructor() {}

  async handle(event: IEvent): Promise<void> {}
}
