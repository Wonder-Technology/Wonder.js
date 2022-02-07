let buildAPI = (): Type.api => {
  let eventManager: EventManager.getData = MiddlewareManager.unsafeGet("EventManager")->Obj.magic
  let ui: UI.getData = MiddlewareManager.unsafeGet("UI")->Obj.magic

  {
    ui: (ui.buildAPI->Obj.magic)(),
    eventManager: (eventManager.buildAPI->Obj.magic)(),
  }
}
