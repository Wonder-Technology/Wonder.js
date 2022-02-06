// TODO be interface(e.g. EventManager, UI, ...)

let _initMiddlewares = (): unit => {
  EventManager.init()
  UI.init()
}

let _initEngine = (): unit => {
  //TODO implement
  Obj.magic(1)
}

let _initEditor = (): unit => {
  //   /* ! not show and edit default ones for user! */

  /* ! on default event */

  (EventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
    AddMenuItem.handler(Utils.buildAPI()),
  )

  (EventManager.onCustomEvent->Obj.magic)(
    DefaultEventName.getRegisterEventHandlerSubmitEventName(),
    RegisterEventHandlerSubmit.handler(Utils.buildAPI()),
  )

  /* ! add default ui */

  // UI.markNotRender()

  (EventManager.trigger->Obj.magic)(
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

  (EventManager.trigger->Obj.magic)(
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

  (EventManager.trigger->Obj.magic)(
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

_render(UI.render)
