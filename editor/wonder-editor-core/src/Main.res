// TODO be interface(e.g. eventManager, UI, ...)

let _initMiddlewares = (): unit => {
  MiddlewareManager.init()

  /* ! on default middleware */

  MiddlewareManager.register("EventManager", EventManager.getData()->Obj.magic)

  MiddlewareManager.register("UI", UI.getData()->Obj.magic)

  let eventManager: EventManager.getData = MiddlewareManager.unsafeGet("EventManager")->Obj.magic

  eventManager.init()

  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  ui.init()
}

let _initEngine = (): unit => {
  //TODO implement
  Obj.magic(1)
}

let _initEditor = (): unit => {
  //   /* ! not show and edit default ones for user! */

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

  /* ! add default ui */

  // UI.markNotRender()

  (eventManager.trigger->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    (
      {
        id: "registerEventHandler",
        func: RegisterEventHandler.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: {
          x: 0,
          y: 140,
          width: 20,
          height: 10,
          text: "submit",
        },
      }: Type.triggerAddMenuItemData<Type.registerEventHandlerUIState>
    ),
  )

  (eventManager.trigger->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    (
      {
        id: "showAllRegisteredEventHandlers",
        func: ShowAllRegisteredEventHandlers.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: {
          eventHandlerArr: [],
        },
      }: Type.triggerAddMenuItemData<Type.showAllEventHandlersUIState>
    ),
  )

  (eventManager.trigger->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    (
      {
        id: "triggerTest1",
        func: TriggerTest1.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: {
          x: 0,
          y: 240,
          width: 20,
          height: 10,
          text: "trigger_test1",
        },
      }: Type.triggerAddMenuItemData<Type.registerEventHandlerUIState>
    ),
  )

  (eventManager.trigger->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    (
      {
        id: "registerMiddleware",
        func: RegisterMiddleware.execFunc(Utils.buildAPI())->Obj.magic,
        stateValue: {
          x: 200,
          y: 140,
          width: 20,
          height: 10,
          text: "registerMiddleware",
        },
      }: Type.triggerAddMenuItemData<Type.registerMiddlewareUIState>
    ),
  )
}

let init = () => {
  _initMiddlewares()
  _initEngine()
  _initEditor()
}

init()

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

let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

_render(ui.render->Obj.magic)
