/* ! not show and edit default ones for user! */

// TODO pass run!!!

let _initMiddlewares = () => {
  let middlewareState = MiddlewareManager.init()


  TODO rename middleware to extension
  TODO rewrite (user code should like user_design.ts!, so no need to register EventManager, UI, Init extension here!!! give it to user!)


  // TODO move onActive out of getData
  // (getData should implement extension type, while it not include onActive!)
  TODO remove onActive, use "Wonder-Active-Extension" event handler instead


  TODO api should only has extensionAPI(others are registered(e.g. most))


  TODO EventManager->trigger return promise





// let states = {
//   middlewareState,
//   editSceneEngineCoreState,
//   runSceneEngineCoreState
// }


/*! make engine-core to be extension! so only need extensionState, not editSceneEngineCoreState, runSceneEngineCoreState!!! */
let extensionState


let extensionState = extensionState -> register(Init Middleware)

when register, invoke onActive


  Init Middleware:
let getData = (): getData => {
  {
    onActive: (extensionState, api) => {

let extensionState = extensionState -> register("Wonder-Editor-EventManager")
let extensionState = extensionState -> register("Wonder-Editor-UI")


on(middlewareSubmit)


let handler = (extensionState, api: Type.api, e: Type.triggerRegisterMiddlewareSubmitData) => {
  let {middlewareName, getData} = e

  let {onCustomEvent} = api.eventManager

  MiddlewareManager.register(middlewareName, (getData->Obj.magic)()->Obj.magic)

  let middlewareTest1: MiddlewareTest1Type.getData =
    MiddlewareManager.unsafeGetData(middlewareName)->Obj.magic



  let extensionState = middlewareTest1.onActive(extensionState, api)


  let {dispatch}: UI.getData = unsafeGetData(middlewareState, "UI")->Obj.magic
  let uiState: UI.state = unsafeGetState(middlewareState, "UI")->Obj.magic

  //   TODO use reducer->action, reducer instead
  let uiState = uiState->(dispatch->Obj.magic)(("submit", eventName, handlerFunc))

}



register(middlewareManagerUI, stateValue)


let execFunc = (extensionState: Type.extensionState, api: Type.api): Type.extensionState => {
  let {useSelector} = api.ui

  let {middlewareArr}: Type.showAllEventHandlersUIState = (useSelector->Obj.magic)(
    JsObjTool.getObjValue(extensionState, "showAllRegisteredEventHandlers"),
  )

  Js.log(eventHandlerArr)

}

    },
  }
}


  // trigger(, )
  // register()
  init():


middlewareSubmit:
onActive:

getData





  /* ! register default middleware */

  let middlewareState =
    middlewareState
    ->MiddlewareManager.register("EventManager", EventManager.getData()->Obj.magic)
    ->MiddlewareManager.register("UI", UI.getData()->Obj.magic)

  let eventManager: EventManager.getData =
    MiddlewareManager.unsafeGetData(middlewareState, "EventManager")->Obj.magic

  let middlewareState =
    eventManager.init()->Obj.magic->MiddlewareManager.setState(middlewareState, "EventManager", _)

  let ui: UI.getData = MiddlewareManager.unsafeGetData(middlewareState, "UI")->Obj.magic

  let middlewareState = ui.init()->Obj.magic->MiddlewareManager.setState(middlewareState, "UI", _)

  middlewareState
}

let _initEditor = middlewareState => {
  /* ! on default event */

  let eventManager: EventManager.getData =
    MiddlewareManager.unsafeGetData(middlewareState, "EventManager")->Obj.magic

  let eventManagerState: EventManager.state =
    MiddlewareManager.unsafeGetState(middlewareState, "EventManager")->Obj.magic

  // (eventManager.onCustomEvent->Obj.magic)(
  //   DefaultEventName.getAddMenuItemEventName(),
  //   AddMenuItem.handler(Utils.buildAPI()),
  // )

  let eventManagerState =
    eventManagerState->(eventManager.onCustomEvent->Obj.magic)(
      DefaultEventName.getRegisterEventHandlerSubmitEventName(),
      RegisterEventHandlerSubmit.handler,
    )

  // (eventManager.onCustomEvent->Obj.magic)(
  //   DefaultEventName.getRegisterMiddlewareSubmitEventName(),
  //   RegisterMiddlewareSubmit.handler(Utils.buildAPI()),
  // )

  // (eventManager.onCustomEvent->Obj.magic)(
  //   DefaultEventName.getRegisterWorkPluginSubmitEventName(),
  //   RegisterWorkPluginSubmit.handler(Utils.buildAPI()),
  // )

  // (eventManager.onCustomEvent->Obj.magic)(
  //   DefaultEventName.getRegisterComponentSubmitEventName(),
  //   RegisterComponentSubmit.handler(Utils.buildAPI()),
  // )

  /* ! add default ui */

  let ui: UI.getData = MiddlewareManager.unsafeGetData(middlewareState, "UI")->Obj.magic
  let uiState: UI.state = MiddlewareManager.unsafeGetState(middlewareState, "UI")->Obj.magic

  let uiState = uiState->(ui.register->Obj.magic)(
    (
      {
        id: "registerEventHandler",
        func: RegisterEventHandler.execFunc->Obj.magic,
        stateValue: (
          {
            x: 0,
            y: 140,
            width: 20,
            height: 10,
            text: "registerEventHandler",
          }: Type.registerEventHandlerUIState
        )->Obj.magic,
      }: UI.registerData
    ),
  )

  // (ui.register->Obj.magic)(
  //   (
  //     {
  //       id: "showAllRegisteredEventHandlers",
  //       func: ShowAllRegisteredEventHandlers.execFunc(Utils.buildAPI())->Obj.magic,
  //       stateValue: ({eventHandlerArr: []}: Type.showAllEventHandlersUIState)->Obj.magic,
  //     }: UI.registerData
  //   ),
  // )

  // (ui.register->Obj.magic)(
  //   (
  //     {
  //       id: "registerUI",
  //       func: RegisterUI.execFunc(Utils.buildAPI())->Obj.magic,
  //       stateValue: (
  //         {
  //           x: 0,
  //           y: 240,
  //           width: 60,
  //           height: 20,
  //           text: "registerUI",
  //         }: Type.registerUIUIState
  //       )->Obj.magic,
  //     }: UI.registerData
  //   ),
  // )

  // (ui.register->Obj.magic)(
  //   (
  //     {
  //       id: "registerMiddleware",
  //       func: RegisterMiddleware.execFunc(Utils.buildAPI())->Obj.magic,
  //       stateValue: (
  //         {
  //           x: 300,
  //           y: 140,
  //           width: 20,
  //           height: 10,
  //           text: "registerMiddleware",
  //         }: Type.registerMiddlewareUIState
  //       )->Obj.magic,
  //     }: UI.registerData
  //   ),
  // )

  // (ui.register->Obj.magic)(
  //   (
  //     {
  //       id: "registerWorkPlugin",
  //       func: RegisterWorkPlugin.execFunc(Utils.buildAPI())->Obj.magic,
  //       stateValue: (
  //         {
  //           x: 600,
  //           y: 140,
  //           width: 20,
  //           height: 10,
  //           text: "registerWorkPlugin",
  //         }: Type.registerWorkPluginUIState
  //       )->Obj.magic,
  //     }: UI.registerData
  //   ),
  // )

  // (ui.register->Obj.magic)(
  //   (
  //     {
  //       id: "registerComponent",
  //       func: RegisterComponent.execFunc(Utils.buildAPI())->Obj.magic,
  //       stateValue: (
  //         {
  //           x: 0,
  //           y: 10,
  //           width: 20,
  //           height: 10,
  //           text: "registerComponent",
  //         }: Type.registerComponentUIState
  //       )->Obj.magic,
  //     }: UI.registerData
  //   ),
  // )

  let middlewareState =
    middlewareState
    ->MiddlewareManager.setState("EventManager", eventManagerState)
    ->MiddlewareManager.setState("UI", uiState)

  middlewareState
}

let init = () => {
  _initMiddlewares()->_initEditor
}

let _render = %raw(`
function(states, renderUIFunc) {
states = renderUIFunc(states)

requestAnimationFrame(
  () =>{
_render(states, renderUIFunc)
  }
)
}
`)

let middlewareState = init()

let ui: UI.getData = MiddlewareManager.unsafeGetData(middlewareState, "UI")->Obj.magic

let states = {
  middlewareState
}

_render(states, ui.render->Obj.magic)
