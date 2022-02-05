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
    DefaultEventName.getRegisterEventHandlerSubmitEventName(),
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

  // UI.markNotRender()

  (EventManager.trigger->Obj.magic)(
    DefaultEventName.getAddMenuItemEventName(),
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
    DefaultEventName.getAddMenuItemEventName(),
    (
      {
        id: "showAllRegisteredEventHandlers",
        func: ShowAllRegisteredEventHandlers.execFunc->Obj.magic,
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
