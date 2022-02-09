let handler = (
  states: Type.states,
  api: Type.api,
  e: Type.triggerRegisterEventHandlerSubmitData,
) => {
  let {middlewareState} = states

  let {unsafeGetData, unsafeGetState, setState} = api.middlewareManager

  let {onCustomEvent}: EventManager.getData =
    unsafeGetData(middlewareState, "EventManager")->Obj.magic
  let eventManagerState: EventManager.state =
    unsafeGetState(middlewareState, "EventManager")->Obj.magic

  let {eventName, handlerFunc} = e

  // TODO handle order
  let eventManagerState = eventManagerState->(onCustomEvent->Obj.magic)(eventName, handlerFunc)

  let {dispatch}: UI.getData = unsafeGetData(middlewareState, "UI")->Obj.magic
  let uiState: UI.state = unsafeGetState(middlewareState, "UI")->Obj.magic

  /* ! should update states.showAllRegisteredEventHandlers.eventHandlerArr */

  //   TODO use reducer->action, reducer instead
  let uiState = uiState->(dispatch->Obj.magic)(("submit", eventName, handlerFunc))

  let middlewareState =
    middlewareState->setState("EventManager", eventManagerState)->setState("UI", uiState)

  {
    ...states,
    middlewareState: middlewareState,
  }
}
