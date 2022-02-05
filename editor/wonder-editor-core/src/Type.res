type func

type states

type registerEventHandlerUIState = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}

type id = string

type triggerAddMenuItemData<'uiState> = {
  id: id,
  func: func,
  stateValue: 'uiState,
}

type handlerFunc

type triggerRegisterEventHandlerSubmitData = {
  eventName: string,
  // content
  handlerFunc: handlerFunc,
}

type eventHandlerData = {
  eventName: string,
  handlerFunc: handlerFunc,
}

type showAllEventHandlersUIState = {eventHandlerArr: array<eventHandlerData>}

type triggerTest1Data = {data1: string}

type addExecFunc

type removeExecFunc

type setState

type drawButton

type useSelector

type dispatch

type uiAPI = {
  addExecFunc: addExecFunc,
  removeExecFunc: removeExecFunc,
  setState: setState,
  drawButton: drawButton,
  dispatch: dispatch,
  useSelector: useSelector,
}

type trigger

type onCustomEvent

type eventManagerAPI = {trigger: trigger, onCustomEvent: onCustomEvent}

type api = {
  ui: uiAPI,
  eventManager: eventManagerAPI,
}

// type 
