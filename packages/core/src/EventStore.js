import { toDomHandlerProp } from './utils/events'

export function EventStore(ctrl) {
  this.ctrl = ctrl
  this._listeners = []
}

EventStore.prototype.add = function (element, device, action, handler) {
  const type = toDomHandlerProp(device, action)
  const eventOptions = this.ctrl._config.shared.eventOptions

  element.addEventListener(type, handler, eventOptions)
  this._listeners.push(() => element.removeEventListener(type, handler, eventOptions))
}

EventStore.prototype.clean = function () {
  this._listeners.forEach((remove) => remove())
  this._listeners = []
}
