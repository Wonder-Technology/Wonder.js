//TODO should from webpack

let handler = (api: Type.api, e: Type.triggerRegisterEventHandlerSubmitData) => {
  let {eventName, handlerFunc} = e

  let {onCustomEvent} = api.eventManager

  // TODO handle order
  (onCustomEvent->Obj.magic)(eventName, handlerFunc)

  let {dispatch} = api.ui

  /* ! should update state.showAllEventHandlers */

  //   TODO use reducer->action
  (dispatch->Obj.magic)(("submit", eventName, handlerFunc))
}
