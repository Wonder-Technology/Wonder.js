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

type registerWorkPluginUIState = {
  x: int,
  y: int,
  width: int,
  height: int,
  text: string,
}

type registerComponentUIState = {
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

// type getWorkPluginData

// type triggerRegisterWorkPluginSubmitData = {getData: getWorkPluginData}
type triggerRegisterWorkPluginSubmitData = {fileStr: string, libraryName: string, funcName: string}

type getComponentData

type triggerRegisterComponentSubmitData = {getData: getComponentData}

type eventHandlerData = {
  eventName: string,
  handlerFunc: handlerFunc,
}

type showAllEventHandlersUIState = {eventHandlerArr: array<eventHandlerData>}

type triggerTest1Data = {data1: string}

// type addExecFunc

// type removeExecFunc

// type setState

// type drawButton

// type useSelector

// type dispatch

// // type markRender

// type register

// type uiAPI = {
//   // addExecFunc: addExecFunc,
//   // removeExecFunc: removeExecFunc,
//   // setState: setState,
//   register: register,
//   drawButton: drawButton,
//   dispatch: dispatch,
//   useSelector: useSelector,
//   // markRender: markRender,
// }

// type trigger

// type onCustomEvent

// type eventManagerAPI = {trigger: trigger, onCustomEvent: onCustomEvent}

// type setRegisteredWorkPlugin

// type saveAllRegisteredWorkPugins

// type registerManagerAPI = {
//   setRegisteredWorkPlugin: setRegisteredWorkPlugin,
//   saveAllRegisteredWorkPugins: saveAllRegisteredWorkPugins,
// }

type commonlib

type most

type engineCore

type unsafeGetData = (
  MiddlewareManagerType.state,
  MiddlewareManagerType.middlewareName,
) => MiddlewareManagerType.middlewareData

type unsafeGetState = (
  MiddlewareManagerType.state,
  MiddlewareManagerType.middlewareName,
) => MiddlewareManagerType.middlewareState

type setState = (
  MiddlewareManagerType.state,
  MiddlewareManagerType.middlewareName,
  MiddlewareManagerType.middlewareState,
) => MiddlewareManagerType.state

type middlewareManagerAPI = {
  unsafeGetData: unsafeGetData,
  unsafeGetState: unsafeGetState,
  setState: setState,
}

type api = {
  commonlib: commonlib,
  most: most,
  engineCore: engineCore,
  middlewareManager: middlewareManagerAPI,
  // ui: uiAPI,
  // eventManager: eventManagerAPI,
  // registerManager: registerManagerAPI,
}

type states = {middlewareState: MiddlewareManagerType.state}
