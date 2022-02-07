type eventName = string

type eventHandler

type buildAPI

type init = unit => unit

type trigger

type onCustomEvent

type getData = {
  buildAPI: buildAPI,
  init: init,
  trigger: trigger,
  onCustomEvent: onCustomEvent,
}

type data

type state = {eventHandlerMap: WonderCommonlib.ImmutableHashMap.t<eventName, eventHandler>}
type stateContainer = {mutable state: option<state>}

let _createStateContainer = (): stateContainer => {state: None}

let stateContainer = _createStateContainer()

let setState = (state: state) => {
  stateContainer.state = state->Some

  ()
}

let unsafeGetState = () => {
  stateContainer.state->Belt.Option.getUnsafe
}

let onCustomEvent = (eventName: eventName, eventHandler: eventHandler) => {
  {
    ...unsafeGetState(),
    eventHandlerMap: unsafeGetState().eventHandlerMap->WonderCommonlib.ImmutableHashMap.set(
      eventName,
      eventHandler,
    ),
  }->setState
}

let trigger = (eventName: eventName, data: data) => {
  let eventHandler =
    unsafeGetState().eventHandlerMap->WonderCommonlib.ImmutableHashMap.unsafeGet(eventName)

  (eventHandler->Obj.magic)(data)
}

let buildAPI = (): Type.eventManagerAPI => {
  trigger: trigger->Obj.magic,
  onCustomEvent: onCustomEvent->Obj.magic,
}

let init = () => {
  setState({eventHandlerMap: WonderCommonlib.ImmutableHashMap.createEmpty()})
}

let getData = (): getData => {
  {
    buildAPI: buildAPI->Obj.magic,
    init: init->Obj.magic,
    trigger: trigger->Obj.magic,
    onCustomEvent: onCustomEvent->Obj.magic,
  }
}
