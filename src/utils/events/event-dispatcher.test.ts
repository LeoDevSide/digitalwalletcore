import { describe, it, beforeEach, expect, vi } from 'vitest'
import { Event, EventDispatcher, EventHandler } from './event-dispatcher'

let event: Event
let event2: Event
let handler: EventHandler
let handler2: EventHandler
let handler3: EventHandler

let eventDispatcher: EventDispatcher

describe('Event-dispatcher unit tests', () => {
  beforeEach(() => {
    event = new Event('test', { data: 'batata' })
    event2 = new Event('test2', { data: 'batata2' })
    handler = new EventHandler()
    handler2 = new EventHandler()
    handler3 = new EventHandler()
    eventDispatcher = new EventDispatcher()
  })

  it('should be able to register a new event', () => {
    eventDispatcher.register('test', handler)
    expect(eventDispatcher.handlers[event.name].length).toEqual(1)
    eventDispatcher.register(event.name, handler2)
    expect(eventDispatcher.handlers[event.name].length).toEqual(2)
    expect(eventDispatcher.handlers[event.name][0]).toEqual(handler)
    expect(eventDispatcher.handlers[event.name][1]).toEqual(handler2)
  })

  it('should be able to clear handlers', () => {
    eventDispatcher.register(event.name, handler)
    eventDispatcher.register(event.name, handler2)
    expect(eventDispatcher.handlers[event.name].length).toEqual(2)
    eventDispatcher.clear()
    expect(eventDispatcher.handlers).toEqual({})
  })

  it('should be able to check if has specific handler registered', () => {
    eventDispatcher.register(event.name, handler)
    eventDispatcher.register(event.name, handler2)
    expect(eventDispatcher.has(event.name, handler)).toEqual(true)
    expect(eventDispatcher.has(event.name, handler2)).toEqual(true)
    expect(eventDispatcher.has(event.name, handler3)).toEqual(false)
  })

  it('should be to remove a handler', () => {
    eventDispatcher.register(event.name, handler)
    eventDispatcher.register(event2.name, handler2)

    expect(eventDispatcher.has(event.name, handler)).toEqual(true)
    expect(eventDispatcher.has(event2.name, handler2)).toEqual(true)

    eventDispatcher.remove(event.name, handler)
    eventDispatcher.remove(event2.name, handler2)

    expect(eventDispatcher.has(event.name, handler)).toEqual(false)
    expect(eventDispatcher.has(event2.name, handler2)).toEqual(false)
  })

  it('should be able to dipatch an event', () => {
    const handleSpy1 = vi.spyOn(handler, 'handle')
    const handleSpy2 = vi.spyOn(handler2, 'handle')

    eventDispatcher.register(event.name, handler)
    eventDispatcher.register(event.name, handler2)
    eventDispatcher.register(event2.name, handler2)

    eventDispatcher.dispatch(event)

    expect(handleSpy1).toHaveBeenCalledWith(event)
    expect(handleSpy2).toHaveBeenCalledWith(event)

    handleSpy1.mockRestore()
    handleSpy2.mockRestore()
    expect(eventDispatcher.handlers[event2.name].length).toEqual(1)
  })
  it('should NOT be able to register same handler multiple times', () => {
    eventDispatcher.register(event.name, handler)
    expect(() => eventDispatcher.register(event.name, handler)).toThrowError()
  })
})
