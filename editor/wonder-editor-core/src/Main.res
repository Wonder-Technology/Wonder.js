// TODO be interface(e.g. EventManager, UI, ...)

let _initMiddlewares = (): unit => {
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
    DefaultEventType.AddMenuItem,
    AddMenuItem.handler(
      (
        {
          ui: UI.buildAPI(),
          eventManager: EventManager.buildAPI(),
        }: Type.api
      ),
    ),
  )

  (EventManager.onCustomEvent->Obj.magic)(
    DefaultEventType.RegisterEventHandler_Submit,
    RegisterEventHandlerSubmit.handler(
      (
        {
          ui: UI.buildAPI(),
          eventManager: EventManager.buildAPI(),
        }: Type.api
      ),
    ),
  )

  /* ! add default ui */

  UI.markNotRender()

  (EventManager.trigger->Obj.magic)(
    DefaultEventType.AddMenuItem,
    (
      {
        id: "registerEventHandler",
        func: RegisterEventHandler.execFunc->Obj.magic,
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
    DefaultEventType.AddMenuItem,
    (
      {
        id: "showAllEventHandlers",
        func: ShowAllRegisteredEventHandlers.execFunc->Obj.magic,
        stateValue: {
          eventHandlerArr: [],
        },
      }: Type.triggerAddMenuItemData<Type.showAllEventHandlersUIState>
    ),
  )

  (EventManager.trigger->Obj.magic)(
    DefaultEventType.AddMenuItem,
    (
      {
        id: "triggerTest1",
        func: TriggerTest1.execFunc->Obj.magic,
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

UI.render()
