type func

type registerEventHandlerUIState = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}

type registerUIUIState = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}


type registerMiddlewareUIState = {
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

type getData

type triggerRegisterMiddlewareSubmitData = {
  middlewareName: string,
  getData: getData,
}

type getWorkPluginData

type triggerRegisterWorkPluginSubmitData = {
  getData: getWorkPluginData,
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

type markRender

type uiAPI = {
  addExecFunc: addExecFunc,
  removeExecFunc: removeExecFunc,
  setState: setState,
  drawButton: drawButton,
  dispatch: dispatch,
  useSelector: useSelector,
  markRender: markRender,
}

type trigger

type onCustomEvent

type eventManagerAPI = {trigger: trigger, onCustomEvent: onCustomEvent}

type api = {
  ui: uiAPI,
  eventManager: eventManagerAPI,
}

// type 
