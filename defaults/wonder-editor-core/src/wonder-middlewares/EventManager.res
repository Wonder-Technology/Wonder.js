type eventName = string

type eventHandler

type state = {eventHandlerMap: WonderCommonlib.ImmutableHashMap.t<eventName, eventHandler>}

// type buildAPI

type init = unit => state

type trigger

type onCustomEvent

type getData = {
  // buildAPI: buildAPI,
  init: init,
  trigger: trigger,
  onCustomEvent: onCustomEvent,
}

type data

let onCustomEvent = (state, eventName: eventName, eventHandler: eventHandler) => {
  {
    ...state,
    eventHandlerMap: state.eventHandlerMap->WonderCommonlib.ImmutableHashMap.set(
      eventName,
      eventHandler,
    ),
  }
}

let trigger = (states, state, eventName: eventName, data: data) => {
  let eventHandler = state.eventHandlerMap->WonderCommonlib.ImmutableHashMap.unsafeGet(eventName)

  (eventHandler->Obj.magic)(states, Utils.buildAPI(), data)
}

// let buildAPI = (): Type.eventManagerAPI => {
//   trigger: trigger->Obj.magic,
//   onCustomEvent: onCustomEvent->Obj.magic,
// }

let init = () => {
  {eventHandlerMap: WonderCommonlib.ImmutableHashMap.createEmpty()}
}

let getData = (): getData => {
  {
    // buildAPI: buildAPI->Obj.magic,
    init: init->Obj.magic,
    trigger: trigger->Obj.magic,
    onCustomEvent: onCustomEvent->Obj.magic,
  }
}
