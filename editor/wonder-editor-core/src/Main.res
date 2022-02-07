// TODO be interface(e.g. eventManager, UI, ...)

/* ! not show and edit default ones for user! */

let _initMiddlewares = (): unit => {
  MiddlewareManager.init()

  /* ! register default middleware */

  MiddlewareManager.register("EventManager", EventManager.getData()->Obj.magic)

  MiddlewareManager.register("UI", UI.getData()->Obj.magic)

  let eventManager: EventManager.getData = MiddlewareManager.unsafeGet("EventManager")->Obj.magic

  eventManager.init()

  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  ui.init()
}

let _initEngine = () => {
  WonderEngineCore.Main.prepare()

  /* ! register default work plugin */

  WonderEngineCore.Main.registerWorkPlugin(~data=RootMain.getData()->Obj.magic, ())

  /* ! register default gameObject */

  WonderEngineCore.Main.setGameObjectData(WonderGameobjectDataoriented.Main.getData()->Obj.magic)
  WonderEngineCore.Main.createAndSetGameObjectState()

  /* ! register default component(no one) */

  WonderEngineCore.Main.init()
  WonderEngineCore.Main.runPipeline("init")->WonderBsMost.Most.drain
}

let _initEditor = (): unit => {
  /* ! on default event */

  let eventManager: EventManager.getData = MiddlewareManager.unsafeGet("EventManager")->Obj.magic

  (eventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    AddMenuItem.handler(Utils.buildAPI()),
  )

  (eventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getRegisterEventHandlerSubmitEventName(),
    RegisterEventHandlerSubmit.handler(Utils.buildAPI()),
  )

  (eventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getRegisterMiddlewareSubmitEventName(),
    RegisterMiddlewareSubmit.handler(Utils.buildAPI()),
  )

  (eventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getRegisterWorkPluginSubmitEventName(),
    RegisterWorkPluginSubmit.handler(Utils.buildAPI()),
  )

  (eventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getRegisterComponentSubmitEventName(),
    RegisterComponentSubmit.handler(Utils.buildAPI()),
  )

  /* ! add default ui */

  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  (ui.register->Obj.magic)(
    (
      {
        id: "registerEventHandler",
        func: RegisterEventHandler.execFunc(Utils.buildAPI())->Obj.magic,
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

  (ui.register->Obj.magic)(
    (
      {
        id: "showAllRegisteredEventHandlers",
        func: ShowAllRegisteredEventHandlers.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: ({eventHandlerArr: []}: Type.showAllEventHandlersUIState)->Obj.magic,
      }: UI.registerData
    ),
  )

  (ui.register->Obj.magic)(
    (
      {
        id: "registerUI",
        func: RegisterUI.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: (
          {
            x: 0,
            y: 240,
            width: 60,
            height: 20,
            text: "registerUI",
          }: Type.registerUIUIState
        )->Obj.magic,
      }: UI.registerData
    ),
  )

  (ui.register->Obj.magic)(
    (
      {
        id: "registerMiddleware",
        func: RegisterMiddleware.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: (
          {
            x: 300,
            y: 140,
            width: 20,
            height: 10,
            text: "registerMiddleware",
          }: Type.registerMiddlewareUIState
        )->Obj.magic,
      }: UI.registerData
    ),
  )

  (ui.register->Obj.magic)(
    (
      {
        id: "registerWorkPlugin",
        func: RegisterWorkPlugin.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: (
          {
            x: 600,
            y: 140,
            width: 20,
            height: 10,
            text: "registerWorkPlugin",
          }: Type.registerWorkPluginUIState
        )->Obj.magic,
      }: UI.registerData
    ),
  )

  (ui.register->Obj.magic)(
    (
      {
        id: "registerComponent",
        func: RegisterComponent.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: (
          {
            x: 0,
            y: 10,
            width: 20,
            height: 10,
            text: "registerComponent",
          }: Type.registerComponentUIState
        )->Obj.magic,
      }: UI.registerData
    ),
  )
}

let init = () => {
  _initMiddlewares()
  _initEditor()
  _initEngine()
}

let _render = %raw(`
function(renderUIFunc) {
renderUIFunc()

requestAnimationFrame(
  () =>{
_render(renderUIFunc)
  }
)
}
`)

init()->Js.Promise.then_(() => {
  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  _render(ui.render->Obj.magic)
}, _)->ignore
